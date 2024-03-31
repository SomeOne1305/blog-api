import { IsNotEmpty, IsObject } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class CommentDto{
  @IsNotEmpty()
  @ApiProperty({
    type:"string",
    required:true,
    example:"John"
  })
  name:string;

  @ApiProperty({
    type:"string",
    required:true,
    example:"This is awesome :)"
  })
  @IsNotEmpty()
  comment:string
}

export class BlogDto{

  @ApiProperty({
    type:"string",
    required:true,
    example:"Your article's title that you wanna give"
  })
  @IsNotEmpty()
  title:string

  @ApiProperty()
  @IsNotEmpty()
  main_image:string

  @ApiProperty()
  @IsNotEmpty()
  texts:string[]

  @ApiProperty()
  @IsNotEmpty()
  related_categories:string[]
}