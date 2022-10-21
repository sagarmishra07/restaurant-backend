import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Request,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptor/Response';
import { UserService } from '../service/user.service';
import { UserDto } from '../dtos/user.dto';
import { HasRoles } from '../../auth/has-role.decorator';
import { Role } from '../user.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { UserDetailsDto } from '../dtos/userDetail.dto';
import { UpdateMenuItemDto } from '../../menu_item/dto/update-menu_item.dto';

@UseInterceptors(TransformInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async getAllUsers(@Request() req) {
    return this.userService.getAllUsers();
  }

  @Post('create')
  createUser(@Body() user: UserDto, @Body() userDetail: UserDetailsDto) {
    return this.userService.createUser(user, userDetail);
  }

  @Delete('delete/:id')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Put('update/user-details/:id')
  update(@Param('id') id: string, @Body() userDetails: UserDetailsDto) {
    return this.userService.updateDetails(+id, userDetails);
  }
}
