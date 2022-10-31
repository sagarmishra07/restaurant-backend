import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '../../auth/service/auth.service';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

import { UserDto } from '../dtos/user.dto';
import {
  ReceiveUserDetailDto,
  ReceiveUserDto,
} from '../../auth/dtos/receive-user.dto';
import { UserDetailsDto } from '../dtos/userDetail.dto';
import { UserDetails } from '../entity/userDetail.entity';
import { UpdateMenuItemDto } from '../../menu_item/dto/update-menu_item.dto';
import { MenuItem } from '../../menu_item/entities/menu_item.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,

    private readonly bcryptService: BcryptService,
    @InjectRepository(UserDetails)
    private readonly userDetailRepository: Repository<UserDetails>,
  ) {}

  //userDetails
  async getAllUsers() {
    // const all_users = await this.userRepo
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.user', 'user')
    //   .where('user.status= :status', {
    //     status: 'ACTIVE',
    //   })
    //   .getMany();
    const all_users = await this.userDetailRepository
      .createQueryBuilder('userDetails')
      .leftJoinAndSelect('userDetails.user', 'id')
      .getMany();

    const returnedUserData = all_users.map((val) =>
      ReceiveUserDetailDto.receive(val),
    );
    const role_customer_only = returnedUserData.filter(
      (val) => val.role === 'CUSTOMER',
    );

    return {
      status: HttpStatus.FOUND,
      message: 'User Data Fetched Successfully',
      data: [...role_customer_only],
    };
  }

  async checkConflict(user, userDetails) {
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
    const getUserPhone = await this.userDetailRepository
      .createQueryBuilder('userDetails')
      .where('phone= :phone', {
        phone: userDetails.phone,
      })
      .getMany();
    if (
      getUserEmail.length > 0 ||
      getUserName.length > 0 ||
      getUserPhone.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  async createUser(register: UserDto, userDetails: UserDetailsDto) {
    try {
      const status = await this.checkConflict(register, userDetails);
      if (status) {
        return {
          message: 'Email, Username Or Phone already used',
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

        const registeredUserDetails = await this.createUserDetails(
          returnedUser.id,
          userDetails,
        );
        return {
          message: 'User registered Successfully',
          data: { ...returnedUser, userDetail: registeredUserDetails },
        };
      }
    } catch (e) {
      return {
        status: e.status,
        message: e.message,
      };
    }
  }
  //helper function
  async createUserDetails(userId, userDetails) {
    const n_user = this.userDetailRepository.create({
      ...userDetails,
      user: userId,
    });
    const r_user = await this.userDetailRepository.save({
      ...n_user,
    });
    return r_user;
  }
  async updateDetails(id: number, userDetails: UserDetailsDto) {
    try {
      const updated_data = await this.userDetailRepository
        .createQueryBuilder()
        .update(UserDetails)
        .set({
          phone: userDetails.phone,
        })
        .where('id = :id', { id: id })
        .execute();
      const returned_user_details = await this.getAllUsers();

      if (updated_data.affected > 0) {
        return {
          status: HttpStatus.OK,
          message: 'UserDetails Updated Successfully',
          data: returned_user_details,
        };
      } else {
        throw new HttpException('UserDetails not found', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      return {
        status: e.status,
        message: e.message,
      };
    }
  }
  async remove(id: number) {
    try {
      const data = await this.userRepo
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id: id })
        .execute();

      if (data.affected > 0) {
        return {
          status: HttpStatus.OK,
          message: 'User Deleted Successfully',
        };
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      return {
        status: e.status,
        message: e.message,
      };
    }
  }
}
