import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  name: string;
}
export class UpdateManufacturerDto extends PartialType(CreateManufacturerDto) {}
