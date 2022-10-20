import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ReceiveUserDto } from '../dtos/receive-user.dto';

export class BcryptService {
  private static readonly saltRounds = 7;

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BcryptService.saltRounds);
  }

  async comparePassword(
    r_password: string,
    e_password: string,
  ): Promise<boolean> {
    return bcrypt.compare(e_password, r_password);
  }
}

export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string, password: string): Promise<User | undefined> {
    const userEmail = await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email: email,
      })

      .getOne();

    return userEmail;
  }
  async loginUser(email: string, password: string) {
    try {
      const user = await this.findOne(email, password);

      const result = await this.bcryptService.comparePassword(
        user.password,
        password,
      );

      if (user && result) {
        const returnedUser = ReceiveUserDto.receive(user);
        const jwt = this.jwtService.sign({ ...returnedUser });

        return {
          status: HttpStatus.OK,
          message: 'User Logged In Successfully',

          data: {
            ...returnedUser,

            token: jwt,
          },
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'email or Password Incorrect',

          data: {
            token: '',
          },
        };
      }
    } catch (e) {
      return {
        status: HttpStatus.NOT_FOUND,

        message: 'User Not Found',

        data: {
          token: '',
        },
      };
    }
  }
}
