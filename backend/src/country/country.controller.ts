import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { Auth } from 'src/admin/decorators/auth.decorator';
import { CreateCountryDto } from 'src/country/dto/country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @Auth()
  async create(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Put(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() dto: CreateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.countryService.delete(id);
  }

  @Get()
  @Auth()
  async getAll() {
    return this.countryService.getAll();
  }
}
