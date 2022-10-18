import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';

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
        createProductCategoryDto.categoryName.toLowerCase() ===
        val.categoryName,
    );
    if (category_all_data.length <= 0) {
      try {
        const category_data = await this.productCategoryRepo.save({
          ...createProductCategoryDto,
        });

        return {
          status: HttpStatus.OK,
          message: 'Category Added  Successfully',
          data: {
            ...category_data,
          },
        };
      } catch (e) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: e,
          data: [],
        };
      }
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Category Already Exists',
        data: [],
      };
    }
  }

  async findAll() {
    try {
      const all_users = await this.productCategoryRepo
        .createQueryBuilder('ProductCategory')

        .getMany();
      return {
        status: HttpStatus.OK,
        message: 'Product Category Fetched Successfully',
        data: [...all_users],
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
