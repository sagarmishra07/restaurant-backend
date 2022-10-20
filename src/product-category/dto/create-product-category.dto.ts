import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductCategoryDto {
  id: number;

  @IsString()
  @MinLength(3)
  @MaxLength(25)
  categoryName: string;
}
