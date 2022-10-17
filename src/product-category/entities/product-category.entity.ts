import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from '../../user/user.enum';

@Entity()
@Unique('unique_constraint', ['categoryName'])
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  categoryName: string;

  @Column({
    nullable: false,
  })
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
