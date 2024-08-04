import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateManufacturerDto } from './dto/manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateManufacturerDto) {
    return this.prismaService.manufacturer.create({ data: dto });
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
