import { LocalStrategy } from './../auth/local.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/auth/service/auth.service';
import { UserController } from './controllers/user.controller';
import { Interest } from './entity/interest.entity';
import { User } from './entity/user.entity';
import { UserDetails } from './entity/userDetail.entity';
import { UserService } from './service/user.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetails, Interest]),
    JwtStrategy,
  ],
  controllers: [UserController],

  providers: [UserService, BcryptService],
})
export class UserModule {}
