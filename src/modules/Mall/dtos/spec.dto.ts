import { IsDataExist, IsUnique } from '@/modules/Database/constraints';
import { SpecKeyEntity, SpecValueEntity } from '@/modules/Mall/entities';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';
import { DtoValidation } from '@/modules/Core/decorators';
import { PaginateOptions } from '@/modules/Database/types';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';

class CommonSpecKeyDto {
  @IsUnique(SpecKeyEntity, { groups: ['create'], message: '该KEY已经存在' })
  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update', 'paginate'] })
  name: string;

  @IsString()
  @IsOptional({ always: true })
  unit: string;
}

class CommonSpecValueDto {
  @IsUnique(SpecValueEntity, { groups: ['create'], message: '该VALUE已经存在' })
  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['paginate', 'update'] })
  value: string;

  @IsDataExist(SpecKeyEntity, { always: true, message: '该spec_key_id不存在' })
  @IsUUID()
  @IsNotEmpty()
  @IsOptional({ groups: ['paginate', 'update'] })
  key: string;
}

@DtoValidation({ groups: ['create'] })
export class CreateSpecKeyDto extends PickType(CommonSpecKeyDto, [
  'name',
  'unit',
]) {}

@DtoValidation({ groups: ['update'] })
export class UpdateSpecKeyDto extends PartialType(CommonSpecKeyDto) {
  @IsDataExist(SpecKeyEntity, { always: true, message: '规格名不存在' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}

@DtoValidation({ groups: ['create'] })
export class CreateSpecValueDto extends PickType(CommonSpecValueDto, [
  'value',
  'key',
]) {}

@DtoValidation({ groups: ['paginate'] })
export class PaginateKeyDto
  extends PartialType(CommonSpecKeyDto)
  implements PaginateOptions
{
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNumber()
  @IsNotEmpty({ always: true })
  page?: number = 1;

  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于10' })
  @IsNumber()
  @IsNotEmpty({ always: true })
  limit?: number = 10;
}

@DtoValidation({ groups: ['paginate'] })
export class PaginateValueDto
  extends PartialType(CommonSpecValueDto)
  implements PaginateOptions
{
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNumber()
  @IsNotEmpty({ always: true })
  page?: number = 1;

  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于10' })
  @IsNumber()
  @IsNotEmpty({ always: true })
  limit?: number = 10;
}
