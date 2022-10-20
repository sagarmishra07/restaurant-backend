import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role, Status } from '../user.enum';
import { GenericEntity } from '../../utils/generic.entity';
@Entity()
@Unique('unique_constraint', ['username', 'email'])
export class User extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
}
