import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async get(categoryId: string) {
    return this.prismaService.product.findMany({ where: { id: categoryId } });
  }

  async create(image: Express.Multer.File, dto: CreateProductDto) {}
}
