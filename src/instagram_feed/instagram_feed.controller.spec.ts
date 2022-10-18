import { Test, TestingModule } from '@nestjs/testing';
import { InstagramFeedController } from './instagram_feed.controller';
import { InstagramFeedService } from './instagram_feed.service';

describe('InstagramFeedController', () => {
  let controller: InstagramFeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstagramFeedController],
      providers: [InstagramFeedService],
    }).compile();

    controller = module.get<InstagramFeedController>(InstagramFeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
