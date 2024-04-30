import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateNoteDTO {
  @IsString()
  @ApiProperty({ description: 'O título da nota.' })
  title: string;

  @IsString()
  @ApiProperty({ description: 'O conteúdo ou o corpo da nota.' })
  content: string;
  
  @IsString()
  @ApiProperty({ description: 'O apelido do usuário que deverá ser vinculado a nota.' })
  authorNickname: string;
}
