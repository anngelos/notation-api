import { CreateUserDTO } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {}
