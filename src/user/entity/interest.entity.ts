import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserDetails } from './userDetail.entity';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  interest: string;

  @ManyToOne(() => UserDetails, (interest) => interest.interests)
  userDetail: UserDetails;
}
