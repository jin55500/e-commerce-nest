import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UserSearchDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  size?: number;
}