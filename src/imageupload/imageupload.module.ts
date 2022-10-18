import { Module } from '@nestjs/common';
import { ImageuploadService } from './imageupload.service';
import { ImageuploadController } from './imageupload.controller';

@Module({
  controllers: [ImageuploadController],
  providers: [ImageuploadService]
})
export class ImageuploadModule {}
