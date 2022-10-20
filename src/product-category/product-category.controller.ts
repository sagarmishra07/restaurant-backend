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
import { HasRoles } from '../auth/has-role.decorator';
import { Role } from '../user/user.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post('add')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @Request() req,
  ) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get('all')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.productCategoryService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productCategoryService.findOne(+id);
  // }

  @Put('update/:id')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete('delete/:id')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
