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
@Unique('unique_constraint', ['email'])
export class UserDetails extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  email: String;

  @Column({
    nullable: false,
  })
  city: String;

  @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
