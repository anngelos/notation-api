import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { NoteController } from "./note.controller";
import { NoteService } from "./note.service";

@Module({
  imports: [PrismaModule],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
