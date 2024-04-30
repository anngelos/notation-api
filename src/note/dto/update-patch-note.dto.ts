import { PartialType } from '@nestjs/swagger';
import { CreateNoteDTO } from './create-note.dto';

export class UpdatePatchNoteDTO extends PartialType(CreateNoteDTO) {}
