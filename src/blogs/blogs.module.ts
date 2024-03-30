import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports:[MongooseModule.forFeature([{name:Blog.name,schema:BlogSchema}])]
})
export class BlogsModule {}
