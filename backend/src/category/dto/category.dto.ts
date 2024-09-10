import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
