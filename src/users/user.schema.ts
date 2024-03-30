import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

class socialNetwork{
  @Prop()
  type:string

  @Prop()
  url:string
}

@Schema({timestamps:true})


export class User {
  @Prop()
  name:string
  
  @Prop()
  surname:string

  @Prop({unique:true})
  email:string

  @Prop()
  password:string

  @Prop()
  profile_image:string

  @Prop()
  social_networks:socialNetwork[]
}

export type UserDocument = Document & User;
export const UserSchema = SchemaFactory.createForClass(User)