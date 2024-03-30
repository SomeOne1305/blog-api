import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

//Users
import { UsersModule } from './users/users.module';

//Blogs
import { BlogsModule } from './blogs/blogs.module';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://axmadxolmuminov2007:1Flu6pth4ODIaZuI@database.ucujp4d.mongodb.net/?retryWrites=true&w=majority`),
    UsersModule,
    BlogsModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
//1Flu6pth4ODIaZuI
//mongodb+srv://axmadxolmuminov2007:<password>@database.ucujp4d.mongodb.net/?retryWrites=true&w=majority
