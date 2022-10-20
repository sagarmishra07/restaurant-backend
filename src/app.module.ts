import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import * as dotenv from 'dotenv';
import { ImageuploadModule } from './imageupload/imageupload.module';
import { MenuItemModule } from './menu_item/menu_item.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductCategoryModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),

    ImageuploadModule,

    MenuItemModule,
  ],
})
export class AppModule {}
