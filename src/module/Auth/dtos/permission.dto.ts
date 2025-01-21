import { AccessStatus, AccessType } from '@/module/Auth/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';

class CommonPermissionDto {
  @IsString()
  component: string;

  @IsString()
  icon: string;

  @IsString()
  name: string;

  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  orderNo: number;

  @IsString()
  @IsOptional()
  path: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  parent: string;

  @IsEnum(AccessType)
  @IsOptional()
  status: AccessStatus;

  @IsEnum(AccessType)
  @IsOptional()
  type: AccessType;
}

export class CreatePermissionDto extends PickType(CommonPermissionDto, [
  'name',
  'component',
  'path',
  'type',
  'status',
  'parent',
]) {}

export class UpdatePermissionDto extends PartialType(CommonPermissionDto) {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}
