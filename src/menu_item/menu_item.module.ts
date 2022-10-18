import { Module } from '@nestjs/common';
import { MenuItemService } from './menu_item.service';
import { MenuItemController } from './menu_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { MenuItem } from './entities/menu_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, MenuItem])],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
