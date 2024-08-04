import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  article: number;

  @IsNumber()
  price: number;

  @IsNumber()
  count: number;

  @IsString()
  description: string;

  @IsString()
  baseImage: string;

  @IsArray()
  additionalImages: string[];

  @IsBoolean()
  isPublished: boolean;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
