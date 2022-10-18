import { Test, TestingModule } from '@nestjs/testing';
import { InstagramFeedService } from './instagram_feed.service';

describe('InstagramFeedService', () => {
  let service: InstagramFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstagramFeedService],
    }).compile();

    service = module.get<InstagramFeedService>(InstagramFeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
