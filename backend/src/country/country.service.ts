import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCountryDto } from './dto/country.dto';

@Injectable()
export class CountryService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateCountryDto) {
    return this.prismaService.country.create({ data: dto });
  }

  async update(id: string, dto: CreateCountryDto) {
    const country = { name: dto.name };
    return this.prismaService.country.update({ where: { id }, data: country });
  }

  async delete(id: string) {
    return this.prismaService.country.delete({ where: { id } });
  }

  async getAll() {
    return this.prismaService.country.findMany();
  }
}
