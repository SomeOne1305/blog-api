import { IsNotEmpty } from "class-validator"

export class CommentDto{
  @IsNotEmpty()
  name:string;

  @IsNotEmpty()
  comment:string
}

export class BlogDto{

  @IsNotEmpty()
  title:string

  @IsNotEmpty()
  main_image:string

  @IsNotEmpty()
  texts:string[]

  @IsNotEmpty()
  related_categories:string
}