import { IsNumber, IsString, MaxLength } from 'class-validator';
import { ProductCategory } from '../../product-category/entities/product-category.entity';

export class CreateMenuItemDto {
  id: number;

  @IsString()
  @MaxLength(25)
  foodName: string;

  @IsNumber()
  foodPrice: number;

  @IsNumber()
  discountedPrice: number;

  @IsNumber()
  category: ProductCategory;

  @IsString()
  ingredients: string;

  @IsString()
  productImage: string;
}
