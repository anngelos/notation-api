import { IsString } from "class-validator";

export class CreateNoteDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;
  
  @IsString()
  authorNickname: string;
}
