import { PartialType } from '@nestjs/mapped-types';
import { CreateImageuploadDto } from './create-imageupload.dto';

export class UpdateImageuploadDto extends PartialType(CreateImageuploadDto) {}
