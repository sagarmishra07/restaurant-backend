import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';
import { ReceiveCategoryDto } from './dto/receive-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepo: Repository<ProductCategory>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const val = await this.findAll();
    const category_all_data = val.data.filter(
      (val) =>
        createProductCategoryDto.categoryName?.toLowerCase() ===
        val?.categoryName?.toLowerCase(),
    );
    if (category_all_data.length <= 0) {
      try {
        await this.productCategoryRepo.save({
          ...createProductCategoryDto,
        });

        return {
          status: HttpStatus.OK,
          message: 'Category Added  Successfully',
        };
      } catch (e) {
        return {
          status: e.status,
          message: e.message,
        };
      }
    } else {
      throw new HttpException('Category Already Exists', HttpStatus.FOUND);
    }
  }

  async findAll() {
    try {
      const all_category = await this.productCategoryRepo
        .createQueryBuilder('ProductCategory')

        .getMany();
      const received_category = all_category.map((val) =>
        ReceiveCategoryDto.receive(val),
      );
      return {
        status: HttpStatus.OK,
        message: 'Product Category Fetched Successfully',
        data: received_category,
      };
    } catch (e) {
      return {
        message: e,
        data: [],
      };
    }
  }

  // findOne(id: number) {
  //   console.log(id);
  //   return `This action returns a #${id} productCategory`;
  // }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    const updated_data = await this.productCategoryRepo
      .createQueryBuilder()
      .update(ProductCategory)
      .set({
        categoryName: updateProductCategoryDto.categoryName,
      })
      .where('id = :id', { id: id })
      .execute();
    if (updated_data.affected > 0) {
      const category_data = await this.findAll();
      return {
        status: HttpStatus.OK,
        message: 'Updated Successfully',
        data: [category_data],
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Category Not Found',
      };
    }
  }

  async remove(id: number) {
    try {
      const data = await this.productCategoryRepo
        .createQueryBuilder()
        .delete()
        .from(ProductCategory)
        .where('id = :id', { id: id })
        .execute();

      if (data.affected > 0) {
        return {
          status: HttpStatus.OK,
          message: 'Category Deleted Successfully',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'CATEGORY NOT FOUND',
        };
      }
    } catch (e) {
      return {
        status: e.status,
        message: e.message,
      };
    }
  }
}
