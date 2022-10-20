import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '../../auth/service/auth.service';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

import { UserDto } from '../dtos/user.dto';
import { ReceiveUserDto } from '../../auth/dtos/receive-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,

    private readonly bcryptService: BcryptService,
  ) {}

  async getAllUsers(currentUser) {
    // if (currentUser.role === 'ADMIN') {
    // const all_users = await this.userRepo
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.user', 'user')
    //   .where('user.status= :status', {
    //     status: 'ACTIVE',
    //   })
    //   .getMany();
    const all_users = await this.userRepo
      .createQueryBuilder('user')

      .getMany();

    const returnedUserData = all_users.map((val) =>
      ReceiveUserDto.receive(val),
    );
    const role_customer_only = returnedUserData.filter(
      (val) => val.role === 'CUSTOMER',
    );

    return {
      status: HttpStatus.FOUND,
      message: 'User Data Fetched Successfully',
      data: [...role_customer_only],
    };
    // } else {
    //   return {
    //     status: HttpStatus.UNAUTHORIZED,
    //     message: 'Unauthorized Access',
    //     data: [],
    //   };
    // }
  }

  async checkConflict(user) {
    const getUserName = await this.userRepo
      .createQueryBuilder('user')
      .where('username= :user_n', {
        user_n: user.username,
      })
      .getMany();
    const getUserEmail = await this.userRepo
      .createQueryBuilder('user')
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

  async createUser(register: UserDto) {
    try {
      const status = await this.checkConflict(register);
      if (status) {
        return {
          message: 'Email or Username already used',
          data: [],
        };
      } else {
        const hashPassword = await this.bcryptService.hashPassword(
          register.password,
        );
        const n_user = this.userRepo.create({
          ...register,
          password: hashPassword,
        });
        const r_user = await this.userRepo.save({
          ...n_user,
        });

        const returnedUser = ReceiveUserDto.receive(r_user);
        const { password, ...rest } = r_user;

        return {
          message: 'User registered Successfully',
          data: { ...returnedUser },
        };
      }
    } catch (e) {
      return {
        status: e.status,
        message: e.message,
      };
    }
  }
}
