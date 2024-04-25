import { IsStrongPassword, IsJWT } from 'class-validator';

export class AuthResetDTO {

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;

  @IsJWT()
  token: string;

}
