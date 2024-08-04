import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/admin/decorators/auth.decorator';
import { CreateCategoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @Auth()
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }
  @Get()
  @Auth()
  async getCategory() {
    return this.categoryService.getCategory();
  }
  @Delete(':id')
  @Auth()
  async deleteCategory(@Param('id') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Get('/upload/:id')
  @Auth()
  async getCategoryImage(@Param('id') categoryId: string) {
    return this.categoryService.getCategoryImage(categoryId);
  }
}
