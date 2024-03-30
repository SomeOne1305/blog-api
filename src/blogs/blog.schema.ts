import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

class Comment {
  @Prop()
  name:string;

  @Prop()
  comment:string

  @Prop({default:Date.now})
  created_at?:Date
}

@Schema({timestamps:true})
export class Blog{
  @Prop({required:true})
  owner:string;

  @Prop({required:true})
  title:string;

  @Prop({required:true})
  main_image:string;

  @Prop({required:true, type:[String]})
  texts:string[]

  @Prop({required:true})
  related_categories:string;

  @Prop({required:true})
  slug:string;

  @Prop({type:[Comment]})
  comments:Comment[]
}

export type BlogDocument = HydratedDocument<Blog>
export const BlogSchema = SchemaFactory.createForClass(Blog)