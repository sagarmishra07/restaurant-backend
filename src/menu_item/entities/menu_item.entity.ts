import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { Roles } from '../../user/user.enum';
import { ProductStatus } from '../product_status.enum';
import { GenericEntity } from '../../utils/generic.entity';

@Entity()
// @Unique('unique_constraint', ['email'])
export class MenuItem extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  foodName: String;

  @Column({
    nullable: false,
  })
  foodPrice: Number;

  @Column({
    nullable: false,
  })
  discountedPrice: Number;

  @ManyToOne(() => ProductCategory, (category) => category.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  category: ProductCategory;

  @Column({
    nullable: false,
    default: ProductStatus.ACTIVE,
  })
  status: string;

  @Column({
    nullable: false,
  })
  ingredients: String;

  @Column({
    nullable: false,
  })
  productImage: String;

  @Column({
    nullable: false,
    default: Roles.ADMIN,
  })
  createdBy: string;
}
