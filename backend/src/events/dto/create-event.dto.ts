import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  datetime!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsNumber()
  price!: number;

  @IsString()
  @IsNotEmpty()
  photo!: string;  
}