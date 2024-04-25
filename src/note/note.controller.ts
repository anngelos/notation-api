import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  async createNote(@Body() data: CreateNoteDTO) {
    return this.noteService.createNote(data);
  }

  @Get(':nickname')
  async listAllUserNotes(@Param('nickname') nickname: string) {
    return this.noteService.listAllUserNotes(nickname);
  }

  @Patch(':id')
  async editNote() {}

  @Delete(':id')
  async deleteNote() {}
}
