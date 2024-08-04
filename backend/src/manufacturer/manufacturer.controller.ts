import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/admin/decorators/auth.decorator';
import { CreateManufacturerDto } from 'src/manufacturer/dto/manufacturer.dto';
import { ManufacturerService } from './manufacturer.service';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  @Auth()
  async create(@Body() dto: CreateManufacturerDto) {
    return this.manufacturerService.create(dto);
  }

  @Put(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() dto: CreateManufacturerDto) {
    return this.manufacturerService.update(id, dto);
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.manufacturerService.delete(id);
  }

  @Get()
  @Auth()
  async getAll() {
    return this.manufacturerService.getAll();
  }
}
