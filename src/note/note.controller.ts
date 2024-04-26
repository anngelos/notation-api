import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

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
  async deleteNote(@Param('id', ParseIntPipe) id) {
    return this.noteService.deleteNote(id);
  }
}
