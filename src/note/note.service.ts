import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDTO } from './dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  async existsAuthor(nickname: string) {
    if (
      !(await this.prisma.user.count({
        where: { nickname },
      }))
    ) {
      throw new NotFoundException('Apelido informado não encontrado.');
    }
  }

  async existsNote(id: number) {
    if (!(await this.prisma.note.count({ where: { id } }))) {
      throw new NotFoundException(`A nota ${id} não existe.`);
    }
  }

  async createNote(@Body() data: CreateNoteDTO) {
    const { authorNickname } = data;

    await this.existsAuthor(authorNickname);

    const noteData: Prisma.NoteCreateInput = {
      author: {
        connect: {
          nickname: authorNickname,
        },
      },
      title: data.title,
      content: data.content,
    };

    return this.prisma.note.create({ data: noteData });
  }

  async listAllUserNotes(nickname: string) {
    await this.existsAuthor(nickname);

    return this.prisma.note.findMany({
      where: {
        authorNickname: nickname,
      },
    });
  }

  async editNote() {}

  async deleteNote(id: number) {
    await this.existsNote(id);
    return this.prisma.note.delete({
      where: { id }
    });
  }
}
