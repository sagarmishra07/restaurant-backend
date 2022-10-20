import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptor/Response';
import { RegisterDto } from '../dtos/register.dto';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../dtos/user.dto';

@UseInterceptors(TransformInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllUsers(@Request() req) {
    return this.userService.getAllUsers(req.user);
  }

  @Post('create')
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }
}
