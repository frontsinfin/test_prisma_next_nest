import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  baseImage: string;

  @IsOptional()
  @IsArray()
  additionalImages: string[];

  @IsString()
  article: number;

  @IsNumber()
  count: number;

  @IsBoolean()
  isPublished: boolean;

  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
