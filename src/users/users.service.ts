import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model} from 'mongoose';
import { ResetPassDto, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { generateCookie } from './cookie/cookie';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER,Cache } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';
import { renderTemplate } from './mail';
import {app,storage} from 'firebase-admin'

@Injectable()
export class UsersService {
  storage:storage.Storage
  constructor(
    @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
    private readonly jwt:JwtService,
    @Inject(CACHE_MANAGER) private readonly cache:Cache,
    private readonly mailer:MailerService,
    @Inject("FIREBASE_APP") private firebase:app.App
  ){
    this.storage = firebase.storage()
  }

  async getAllUsers(){
    const {} = this.storage
    return this.userModel.find({})
  }

  async getUserById(userId:string){
    const existingUser = await this.userModel.findById(userId)
    if(!existingUser){
      throw new NotFoundException(`User entry with ID ${userId}`)
    }
    return this.userModel.findById(userId)
  }

  async createUser(dto:UserDto){
    const {email,password,} = dto
    const userExist = await this.userModel.findOne({email:email})
    if(userExist){
      throw new BadRequestException('This user has already been registered.')
    }
    const hashedPassword = await bcrypt.hash(password,12)


    const savedUser = await this.userModel.create({...dto,password:hashedPassword})
    return this.jwt.sign(generateCookie(savedUser._id,"user"))
  }

  async returnUser(dto:{email:string, password:string}){
    const user = await this.userModel.findOne({email:dto.email})
    if(!user){
      throw new UnauthorizedException("Invalid credentials")
    }
    if(await bcrypt.compare(dto.password,user.password) && user){
      return this.jwt.sign(generateCookie(user._id,'user'))
    }else{
      throw new BadRequestException('Invalid credentials')
    }
  }

  async updateUserData(userId:string, dto:UserDto){
    return this.userModel.findByIdAndUpdate(userId,dto,{new:true})
  }

  async send_verification(email:string){
    const userExist = await this.userModel.findOne({email:email})
    if(!userExist){
      new UnauthorizedException('Invalid user credential')
    }
    const min = 10000;
    const max = 89999;
    const verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;
    await this.cache.set(email,verificationCode,600)
    await this.mailer.sendMail({
      from:"anonymousmrx55@mail.ru",
      to:email,
      subject:`Verification code to reset password: [${verificationCode}]`,
      html:renderTemplate(userExist.name,verificationCode)
    })
    return {
      status:200,
      verification_code:verificationCode
    }
  }

  async verify_code(email:string,code:number){
    const storedCode = await this.cache.get(email)
    if(code === storedCode){
      await this.cache.del(email)
      return true
    }else{
      return false
    }
  }

  async resetPassword(dto:ResetPassDto){
    const hashedPass = await bcrypt.hash(dto.password,12)
    return await this.userModel.findOneAndUpdate({email:dto.email},{password:hashedPass},{new:true})
  }

  async deleteUser(userId:string){
    await this.userModel.findByIdAndDelete(userId,{
      new:true
    })
    return {
      status:"ok",
      message:"User is deleted successfully !"
    }
  }

  
  async uploadImage(file:Express.Multer.File, userId:string){
    try {
      const bucket = this.storage.bucket("gs://blog-app-7568a.appspot.com")
      console.log(userId);
      const {filename, mimetype} = file
      const remoteFileName = `users/${userId}.${mimetype.split("/")[1]}`
      await bucket.file(remoteFileName).save(file.buffer)
      .then(data=>console.log(data)
      );

      // Generate signed URL with expiration date (e.g., 1 week from now)
      const fileUrl = await bucket.getFiles()
      
      // await this.userModel.findByIdAndUpdate(userId,{profile_image:fileUrl},{new:true})
      return fileUrl
    } catch (error) {
      throw error
    }
  }
}
// https://medium.com/@anikettikone9/authentication-authorization-using-nest-js-typescript-with-mongodb-2f4de48fafe0
// 