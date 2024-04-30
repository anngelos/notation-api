import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdatePatchNoteDTO } from './dto/update-patch-note.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiForbiddenResponse } from '@nestjs/swagger';

@Controller('notes')
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiForbiddenResponse({ description: 'Acesso negado. Apenas usuários autenticados.' })
  async createNote(@Body() data: CreateNoteDTO) {
    return this.noteService.createNote(data);
  }

  @Get(':nickname')
  @ApiForbiddenResponse({ description: 'Acesso negado. Apenas usuários autenticados.' })
  async listAllUserNotes(@Param('nickname') nickname: string) {
    return this.noteService.listAllUserNotes(nickname);
  }

  @Patch(':id')
  @ApiForbiddenResponse({ description: 'Acesso negado. Apenas usuários autenticados.' })
  async editNote(@Body() data: UpdatePatchNoteDTO, @Param('id', ParseIntPipe) id) {
    return this.noteService.editNote(id, data);
  }

  @Delete(':id')
  @ApiForbiddenResponse({ description: 'Acesso negado. Apenas usuários autenticados.' })
  async deleteNote(@Param('id', ParseIntPipe) id) {
    return this.noteService.deleteNote(id);
  }
}
