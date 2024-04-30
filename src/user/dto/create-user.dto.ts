import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({ description: 'Nome do usuário.' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Apelido do usuário. O apelido também serve para vincular as notas ao usuário.' })
  nickname: string;

  @IsEmail()
  @ApiProperty({ description: 'O email do usuário.' })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  @ApiProperty({ description: 'A senha do usuário. Mínimo de 6 caracteres.' })
  password: string;
}
