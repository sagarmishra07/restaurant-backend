import { Module } from '@nestjs/common';
import { InstagramFeedService } from './instagram_feed.service';
import { InstagramFeedController } from './instagram_feed.controller';

@Module({
  controllers: [InstagramFeedController],
  providers: [InstagramFeedService]
})
export class InstagramFeedModule {}
