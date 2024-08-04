import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  name: string;
}
export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
