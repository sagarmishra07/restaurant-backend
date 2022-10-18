import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  id: number;

  @IsNotEmpty()
  categoryName: string;

  @IsNotEmpty()
  createdBy: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
