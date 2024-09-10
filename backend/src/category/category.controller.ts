import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/admin/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { objectStorage } from 'src/utils/yandexS3';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() name: { name: string },
  ) {
    const link = await objectStorage(image, 'category');
    const dto = { name: name.name, image: link };
    return this.categoryService.create(dto);
  }

  @Put(':id')
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Body() name: { name: string },
    @Param('id') id: string,
  ) {
    const link = await objectStorage(image, 'category');
    const dto = { name: name.name, image: link };
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @Auth()
  async deleteCategory(@Param('id') categoryId: string) {
    return this.categoryService.delete(categoryId);
  }
}
