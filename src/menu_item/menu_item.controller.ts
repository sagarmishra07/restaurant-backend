import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MenuItemService } from './menu_item.service';
import { CreateMenuItemDto } from './dto/create-menu_item.dto';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto';
import { HasRoles } from 'src/auth/has-role.decorator';
import { Role } from '../user/user.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post('create')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Get('all')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: number) {
    return this.menuItemService.findOne(+id);
  }

  @Put('update/:id')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.update(+id, updateMenuItemDto);
  }

  @Delete('delete/:id')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.menuItemService.remove(+id);
  }
}
