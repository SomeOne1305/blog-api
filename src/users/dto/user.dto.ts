import { IsBoolean, IsEmail, IsNotEmpty,IsNumber,MinLength } from "class-validator";

class socialProfile {
  @IsNotEmpty()
  type:string;
  
  @IsNotEmpty()
  url:string
}

export class UserDto {
  
  @IsNotEmpty()
  name:string;

  @IsNotEmpty()
  surname:string;

  @IsEmail()
  email:string;

  @IsNotEmpty()
  @MinLength(8,{message:"Password must be in minimum 8 characters."})
  password:string;

  @IsNotEmpty()
  profile_image:string;

  social_networks:socialProfile[]
}

export class EmailDto{
  @IsEmail()
  email:string;
}

export class VerificationDto{
  @IsEmail()
  email:string;

  @IsNumber({maxDecimalPlaces:5})
  code:number
}

export class ResetPassDto extends VerificationDto{
  @MinLength(8,{message:"Password must be in minimum 8 characters."})
  password:string
}