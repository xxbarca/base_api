import { PartialType, PickType } from '@nestjs/swagger';
import { DtoValidation } from '@/modules/Core/decorators';
import { IsDataExist, IsUnique } from '@/modules/Database/constraints';
import { SkuEntity, SpuEntity } from '@/modules/Mall/entities';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { OnlineStatus } from '@/modules/Mall/constants';
import { PaginateOptions } from '@/modules/Database/types';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';

export interface Spec {
  key: string;
  value: string;
  key_id: number;
  value_id: number;
}

class CommonSkuSto {
  @IsDataExist(SpuEntity, { always: true, message: 'spu不存在' })
  @IsUUID(undefined, { groups: ['create'], message: 'spu_id格式不正确' })
  @IsOptional({ groups: ['update'] })
  spu_id: string;

  @IsUnique(SkuEntity, { groups: ['create'], message: '该SKU已存在' })
  @IsString()
  @IsNotEmpty({ groups: ['create'], message: 'title不能为空' })
  @IsOptional({ groups: ['update'] })
  title: string;

  @IsNotEmpty({ groups: ['create'], message: 'price不能为空' })
  @IsString()
  @IsOptional({ groups: ['update'] })
  price: string;

  @IsString()
  @IsOptional({ always: true })
  discount_price: string;

  @IsEnum(OnlineStatus)
  @IsNotEmpty({ groups: ['create'] })
  @IsOptional({ groups: ['update'] })
  online: OnlineStatus;

  @IsString()
  @IsOptional({ always: true })
  img: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['create'], message: 'stock不能为空' })
  @IsOptional({ groups: ['update'] })
  stock: number;

  @IsNotEmpty({ groups: ['create'], message: 'spec不能为空' })
  @IsOptional({ groups: ['update'] })
  specs: Array<Spec>;
}

@DtoValidation({ groups: ['create'] })
export class CreateSkuDto extends PickType(CommonSkuSto, [
  'title',
  'price',
  'discount_price',
  'online',
  'img',
  'stock',
  'specs',
  'spu_id',
]) {}

@DtoValidation({ groups: ['update'] })
export class UpdateSkuDto extends PartialType(CommonSkuSto) {
  @IsDataExist(SkuEntity, { always: true, message: 'SKU不存在' })
  @IsUUID(undefined, { message: 'Sku id不正确' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}

@DtoValidation({ groups: ['paginate'] })
export class PaginateSkuDto
  extends PartialType(CommonSkuSto)
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
