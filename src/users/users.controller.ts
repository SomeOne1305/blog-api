import {
  Controller,
  Get,
  Res,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
  Body,
  UsePipes,
  HttpCode,
  ValidationPipe,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import {ApiBody,ApiResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger'

import { UsersService } from './users.service';
import { AuthGuard } from './user.guard';
import { EmailDto, UserDto } from './dto/user.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ICookie } from 'src/interfaces';

interface Req extends Express.Request{
  user:ICookie
}

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}


  @HttpCode(200)
  @Get('/all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiBearerAuth("token")
  @ApiResponse({status:200,description:"Return user data"})
  @ApiResponse({status:403,description:"Unauthorized access to data"})
  @HttpCode(200)
  @Get('user')
  @UseGuards(AuthGuard)
  async getSpecUser(@Req() req:Req) {
    const userId: string = req.user.userId;
    return this.userService.getUserById(userId);
  }

  @HttpCode(201)
  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() body: UserDto, @Res() res: Response) {
    try {
      const token = await this.userService.createUser(body);
      res.cookie('Auth', token, { httpOnly: true, maxAge: 43200000 });
      res.json({ token: token });
    } catch (error) {
      return error
    }
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const token = await this.userService.returnUser(body);
      res.cookie('Auth', token, { httpOnly: true, maxAge: 43200000 });
      res.json({ token: token });
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(202)
  @Put('edit')
  @UseGuards(AuthGuard)
  async updateUser(@Req() req:Req, @Body() body: UserDto) {
    const userId = req.user.userId;
    return this.userService.updateUserData(userId, body);
  }

  @HttpCode(201)
  @Post('/send-code')
  @UsePipes(ValidationPipe)
  async send_code(@Body() body:EmailDto){
    return this.userService.send_verification(body.email)
  }

  @HttpCode(203)
  @Delete('/delete-user')
  @UseGuards(AuthGuard)
  async deleteUser(@Req() req:Req){
    return this.userService.deleteUser(req.user.userId)
  }

  @HttpCode(201)
  @Post("upload")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async setProfileImage(@Req() req:Req, @UploadedFile() file:Express.Multer.File){
    
    return await this.userService.uploadImage(file,req.user.userId)
  }
}