import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    OneToOne,
    Column,
    Unique,
} from 'typeorm';
import { Interest } from './interest.entity';
import { User } from './user.entity';

@Entity()
@Unique('unique_constraint', ['email'])
export class UserDetails {
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

    @OneToMany(() => Interest, (interest) => interest.interest)
    @JoinColumn()
    interests: Interest[];

    @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}
