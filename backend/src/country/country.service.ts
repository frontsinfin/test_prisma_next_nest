import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCountryDto } from './dto/country.dto';

@Injectable()
export class CountryService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.country.findMany();
  }

  async getOne(dto: CreateCountryDto) {
    const name = dto.name.toLowerCase();
    return this.prismaService.country.findUnique({
      where: { name: name },
    });
  }

  async create(dto: CreateCountryDto) {
    const category = await this.getOne(dto);
    if (category) throw new NotFoundException('Такая страна уже существует');
    const data = { ...dto, name: dto.name.toLowerCase() };
    return this.prismaService.country.create({
      data: data,
    });
  }

  async update(id: string, dto: CreateCountryDto) {
    const country = { name: dto.name };
    return this.prismaService.country.update({ where: { id }, data: country });
  }

  async delete(id: string) {
    return this.prismaService.country.delete({ where: { id } });
  }
}
