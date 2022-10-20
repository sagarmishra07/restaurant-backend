import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ImageuploadService } from './imageupload.service';

@Controller('upload')
export class ImageuploadController {
  constructor(private readonly imageuploadService: ImageuploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(@UploadedFile() file) {
    return await this.imageuploadService.upload(file);

    // console.log(file);
  }
}
