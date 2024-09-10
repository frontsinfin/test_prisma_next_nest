import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateManufacturerDto } from './dto/manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(private prismaService: PrismaService) {}

  async getOne(dto: CreateManufacturerDto) {
    const name = dto.name.toLowerCase();
    return this.prismaService.manufacturer.findUnique({
      where: { name: name },
    });
  }

  async create(dto: CreateManufacturerDto) {
    const category = await this.getOne(dto);
    if (category) throw new NotFoundException('Такая страна уже существует');
    const data = { ...dto, name: dto.name.toLowerCase() };
    return this.prismaService.manufacturer.create({
      data: data,
    });
  }

  async update(id: string, dto: CreateManufacturerDto) {
    const manufacturer = { name: dto.name };
    return this.prismaService.manufacturer.update({
      where: { id },
      data: manufacturer,
    });
  }

  async delete(id: string) {
    return this.prismaService.manufacturer.delete({ where: { id } });
  }

  async getAll() {
    return this.prismaService.manufacturer.findMany();
  }
}
