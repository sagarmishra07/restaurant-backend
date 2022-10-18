import { PartialType } from '@nestjs/mapped-types';
import { CreateInstagramFeedDto } from './create-instagram_feed.dto';

export class UpdateInstagramFeedDto extends PartialType(CreateInstagramFeedDto) {}
