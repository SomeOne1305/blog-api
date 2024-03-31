import { Controller, HttpCode, Get, Post, Delete, Patch,Param, Req,Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto, CommentDto } from './dto/blog.dto';
import { AuthGuard } from 'src/users/user.guard';
import { Request } from 'express';
import { ICookie } from 'src/interfaces';
import {ApiTags, ApiBearerAuth,ApiBody} from '@nestjs/swagger'
interface IReq extends Request{
  user:ICookie
}

@ApiTags("Blogs")
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService:BlogsService
  ){}

  @HttpCode(200)
  @Get('/all')
  async getAll(){
    
    return this.blogService.getAll()
  }

  @HttpCode(200)
  @Get('/latest')
  async returnLatest(){
    return this.blogService.getHotNews()
  }

  @HttpCode(200)
  @Get("/my-blogs")
  @UseGuards(AuthGuard)
  async getById(@Req() req:IReq){
    return this.blogService.getExactUserBlogs(req.user.userId)
  }

  @HttpCode(201)
  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async createBlog(@Body() dto:BlogDto,@Req() req:IReq){

    return this.blogService.createBlog(dto,req.user.userId)
  }

  @HttpCode(200)
  @Get('blog/:slug')
  async getBlogBySlug(@Param("slug") slug:string){
    return this.blogService.getBlogBySlug(slug)
  }

  @HttpCode(201)
  @Post('/add-comment/:blogId')
  @UsePipes(ValidationPipe)
  async writeComment(@Param("blogId") blogId:string,@Body() dto:CommentDto){
    console.log(dto);
    
    return this.blogService.createCommentInBlog(blogId,dto)
  }

  @HttpCode(201)
  @Patch('/update/:id')
  @UseGuards(AuthGuard)
  async (@Param("id") id:string, @Body() dto:BlogDto){
    return this.blogService.updateBlogData(id,dto)
  }

  @HttpCode(202)
  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async deleteUserData(@Param("id") id:string){
    return this.blogService.deleteBlogById(id)
  }
}
