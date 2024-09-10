import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.category.findMany();
  }
  async getOne(dto: CreateCategoryDto) {
    const name = dto.name.toLowerCase();
    return this.prismaService.category.findUnique({
      where: { name: name },
    });
  }
  async delete(id: string) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }

  async create(dto: CreateCategoryDto) {
    const category = await this.getOne(dto);
    if (category) throw new NotFoundException('Такая категория уже существует');
    const data = { ...dto, name: dto.name.toLowerCase() };
    return this.prismaService.category.create({
      data: data,
    });
  }
  async update(id: string, dto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: { id },
      data: { ...dto },
    });
  }
}
