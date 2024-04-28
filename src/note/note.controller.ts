import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdatePatchNoteDTO } from './dto/update-patch-note.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('notes')
@UseGuards(AuthGuard)
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
  async editNote(@Body() data: UpdatePatchNoteDTO, @Param('id', ParseIntPipe) id) {
    return this.noteService.editNote(id, data);
  }

  @Delete(':id')
  async deleteNote(@Param('id', ParseIntPipe) id) {
    return this.noteService.deleteNote(id);
  }
}
