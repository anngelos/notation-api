import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PrismaModule,
  ],
  controllers: [NoteController],
  providers: [NoteService, AuthService, UserService],
  exports: [NoteService],
})
export class NoteModule {}
