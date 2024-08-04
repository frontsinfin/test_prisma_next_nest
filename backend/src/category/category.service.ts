import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CategoryService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = { name: dto.name };
    return this.prismaService.category.create({ data: category });
  }
  async getCategory() {
    return this.prismaService.category.findMany({ include: { image: true } });
  }
  async deleteCategory(id: string) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }

  async getCategoryImage(id: string) {
    return this.prismaService.category.findUnique({
      where: { id },
      include: { image: true },
    });
  }
}
