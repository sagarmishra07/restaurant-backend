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
import { HasRoles } from '../../auth/has-role.decorator';
import { Role } from '../user.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';

@UseInterceptors(TransformInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async getAllUsers(@Request() req) {
    return this.userService.getAllUsers(req.user);
  }

  @Post('create')
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }
}
