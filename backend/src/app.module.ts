import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { CountryModule } from './country/country.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AdminModule,
    ConfigModule.forRoot(),
    CategoryModule,
    CountryModule,
    ManufacturerModule,
    ProductModule,
  ],
})
export class AppModule {}
