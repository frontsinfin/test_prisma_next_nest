import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'src/admin/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { objectStorage } from 'src/utils/yandexS3';
import { CreateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async get(categoryId: string) {
    return this.productService.get(categoryId);
  }

  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    const link = await objectStorage(image, 'category');
    const links = await objectStorage(image, 'category');
    const data: CreateProductDto = {
      ...dto,
      baseImage: link,
      additionalImages: links,
    };
    // return this.productService.create(image, data);
    console.log(data);
  }
}
