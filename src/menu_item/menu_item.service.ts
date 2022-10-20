import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu_item.dto';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu_item.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { ReceiveMenuDto } from './dto/receive-menu-dto';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    try {
      const menuItemData = await this.menuItemRepository.save({
        ...createMenuItemDto,
      });

      return {
        status: HttpStatus.OK,
        message: 'MenuItem Added Successfully',
        data: {
          ...menuItemData,
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Something went wrong',
        data: [],
      };
    }
    return 'This action adds a new menuItem';
  }

  async findAll() {
    const all_menuItems = await this.menuItemRepository
      .createQueryBuilder('menuItem')
      .leftJoinAndSelect('menuItem.category', 'id')
      .getMany();

    const receivedMenu = all_menuItems.map((val) =>
      ReceiveMenuDto.receive(val),
    );

    return {
      status: HttpStatus.OK,
      message: 'MenuItem Fetched Successfully',
      data: receivedMenu,
    };
  }

  async findOne(id: number) {
    const all_menuItems = await this.menuItemRepository
      .createQueryBuilder('menuItem')
      .where('menuItem.id =:id', { id: id })
      .leftJoinAndSelect('menuItem.category', 'id')
      .getMany();

    const received_menu = ReceiveMenuDto.receive(all_menuItems[0]);

    if (received_menu) {
      return {
        status: HttpStatus.OK,
        message: 'MenuItem Fetched Successfully',
        data: received_menu,
      };
    } else {
      throw new HttpException('Menu Items Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    try {
      const updated_data = await this.menuItemRepository
        .createQueryBuilder()
        .update(MenuItem)
        .set({ ...updateMenuItemDto })
        .where('id = :id', { id: id })
        .execute();
      if (updated_data.affected > 0) {
        return {
          status: HttpStatus.OK,
          message: 'Updated Successfully',
        };
      } else {
        throw new HttpException('MenuItem not found', HttpStatus.NOT_FOUND);
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
      const data = await this.menuItemRepository
        .createQueryBuilder()
        .delete()
        .from(MenuItem)
        .where('id = :id', { id: id })
        .execute();

      if (data.affected > 0) {
        return {
          status: HttpStatus.OK,
          message: 'MenuItem Deleted Successfully',
        };
      } else {
        throw new HttpException('MenuItem not found', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      return {
        status: e.status,
        message: e.message,
      };
    }
  }
}
