import { IsStrongPassword, IsEmail } from 'class-validator';

export class AuthForgetDTO {
  @IsEmail()
  email: string;
}
