import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '../../auth/service/auth.service';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dtos/register.dto';
import { UserDetailsDto } from '../dtos/userDetail.dto';
import { Interest } from '../entity/interest.entity';
import { User } from '../entity/user.entity';
import { UserDetails } from '../entity/userDetail.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserDetails)
    private readonly userDetailsRepo: Repository<UserDetails>,
    @InjectRepository(Interest)
    private readonly interestRepo: Repository<Interest>,
    private readonly bcryptService: BcryptService,
  ) {}

  async getAllUsers(currentUser) {
    if (currentUser.role === 'ADMIN') {
      const all_users = await this.userDetailsRepo
        .createQueryBuilder('UserDetails')
        .leftJoinAndSelect('UserDetails.user', 'user')
        .where('user.status= :status', {
          status: 'ACTIVE',
        })
        .getMany();

      return {
        status: HttpStatus.FOUND,
        message: 'User Data Fetched Successfully',
        data: all_users.map((val) => ({
          id: val?.id,
          username: val?.user.username,

          email: val?.email,
          city_name: val?.city,
          role: val?.user.role,
          status: val?.user.status,
        })),
      };
    } else {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized Access',
        data: [],
      };
    }
  }

  async checkConflict(user: UserDetailsDto) {
    const getUserName = await this.userRepo
      .createQueryBuilder('user')
      .where('username= :user_n', {
        user_n: user.user.username,
      })
      .getMany();
    const getUserEmail = await this.userDetailsRepo
      .createQueryBuilder('userDetail')
      .where('email= :u_email', {
        u_email: user.email,
      })
      .getMany();
    if (getUserEmail.length > 0 || getUserName.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async createUser(register: RegisterDto) {
    const status = await this.checkConflict(register.userDetails);
    if (status) {
      return {
        message: 'Email or Username already used',
        data: [],
      };
    } else {
      const hashPassword = await this.bcryptService.hashPassword(
        register.userDetails.user.password,
      );
      const n_user = this.userDetailsRepo.create({
        ...register.userDetails,
        user: {
          ...register.userDetails.user,
          password: hashPassword,
        },
      });
      const r_user = await this.userDetailsRepo.save({
        ...n_user,
      });

      return {
        message: 'User registered Successfully',
      };
    }
  }
}
