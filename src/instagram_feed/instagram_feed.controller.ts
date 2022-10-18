import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstagramFeedService } from './instagram_feed.service';
import { CreateInstagramFeedDto } from './dto/create-instagram_feed.dto';
import { UpdateInstagramFeedDto } from './dto/update-instagram_feed.dto';

@Controller('instagram-feed')
export class InstagramFeedController {
  constructor(private readonly instagramFeedService: InstagramFeedService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instagramFeedService.findOne(+id);
  }
}
