import { IsOptional, IsString } from "class-validator";

export class FilterEventDto { 
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  date?: string;
}