import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post('add')
  create(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @Request() req,
  ) {
    console.log(createProductCategoryDto);
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get('all')
  findAll() {
    return this.productCategoryService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productCategoryService.findOne(+id);
  // }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
