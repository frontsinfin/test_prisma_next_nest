import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, CategoryService, PrismaService],
})
export class ProductModule {}
