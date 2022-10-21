import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { GenericEntity } from '../../utils/generic.entity';

@Entity()
@Unique('unique_constraint', ['phone'])
export class UserDetails extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  phone: String;

  @OneToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
