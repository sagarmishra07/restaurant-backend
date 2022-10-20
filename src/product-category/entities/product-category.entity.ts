import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../../user/user.enum';
import { GenericEntity } from '../../utils/generic.entity';

@Entity()
@Unique('unique_constraint', ['categoryName'])
export class ProductCategory extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  categoryName: string;

  @Column({
    nullable: false,
    default: Role.ADMIN,
  })
  createdBy: string;
}
