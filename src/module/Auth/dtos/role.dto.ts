import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { RoleStatus } from '@/module/Auth/enums';
import { PartialType, PickType } from '@nestjs/swagger';
import { PaginateOptions } from '@/module/Database/types';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';

class RoleCommDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(RoleStatus)
  @IsOptional()
  status: RoleStatus;
}

export class CreateRoleDto extends PickType(RoleCommDto, [
  'name',
  'value',
  'description',
  'status',
]) {}

export class UpdateRoleDto extends PartialType(RoleCommDto) {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PaginateRoleDto
  extends PartialType(CreateRoleDto)
  implements PaginateOptions
{
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNumber()
  page?: number = 1;

  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于10' })
  @IsNumber()
  limit?: number = 10;
}
