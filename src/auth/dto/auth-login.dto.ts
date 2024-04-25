import { IsString, IsStrongPassword } from "class-validator";

export class AuthLoginDTO {
  
  @IsString()
  nickname: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}
