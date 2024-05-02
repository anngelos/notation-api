import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }

  async create(data: CreateUserDTO) {
    if (!data.name || !data.nickname || !data.email || !data.password) {
      throw new BadRequestException(
        'Preencha todos os campos para criar um novo usuário.',
      );
    }

    const existingNickname = await this.prisma.user.count({
      where: { nickname: data.nickname },
    });

    if (existingNickname) {
      throw new BadRequestException('Apelido já existente.');
    }

    const existingEmail = await this.prisma.user.count({
      where: { email: data.email },
    });

    if (existingEmail) {
      throw new BadRequestException('E-mail já existente.');
    }

    data.password = data.password;
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.prisma.user.create({ data });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    await this.exists(id);
    
    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { notes: true }
    })

    if (user.notes.length > 0) {
      throw new BadRequestException('Este usuário possui notas vinculadas e não pode ser excluído até que suas notas sejam removidas do sistema.');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
