import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import * as admin from 'firebase-admin'
//Configs
import redisConfig from 'src/config/redis.config';
import mailerConfig from 'src/config/mailer.config';
import firebaseConfig from 'src/config/firebase.config';


const firebaseProvider = {
  provide:"FIREBASE_APP",
  useFactory:()=>{
    const config = firebaseConfig() as admin.ServiceAccount
    return admin.initializeApp({
      credential:admin.credential.cert(config),
      databaseURL:`https://${config.projectId}.firebaseio.com`,
      storageBucket: `${config.projectId}.appspot.com`,
      projectId:config.projectId,
      
    })
  },

}

@Module({
  controllers:[UsersController],
  providers: [UsersService,firebaseProvider],
  imports:[
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    JwtModule.register({
      secret:"my_secret_key@_@-21",
      global:true,
      signOptions:{
        expiresIn:"3d"
      }
    }),
    MailerModule.forRoot(mailerConfig()),
    CacheModule.register<RedisClientOptions>(redisConfig()),
  ],
  exports:[]
})
export class UsersModule {}