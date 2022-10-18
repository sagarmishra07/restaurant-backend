import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ProductCategory } from '../../product-category/entities/product-category.entity';

export class CreateMenuItemDto {
  id: number;

  @IsNotEmpty()
  foodName: string;

  @IsNotEmpty()
  foodPrice: string;

  @IsNotEmpty()
  discountedPrice: string;

  @IsNotEmpty()
  @ValidateNested()
  category: ProductCategory;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  ingredients: string;

  @IsNotEmpty()
  productImage: string;

  @IsNotEmpty()
  createdBy: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
