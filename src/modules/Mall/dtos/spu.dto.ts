import { IsDataExist, IsUnique } from '@/modules/Database/constraints';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { CategoryEntity, SpuEntity } from '@/modules/Mall/entities';
import { OnlineStatus } from '@/modules/Mall/constants';
import { DtoValidation } from '@/modules/Core/decorators';
import { PartialType, PickType } from '@nestjs/swagger';

class CommonSpuDto {
  @IsUnique(SpuEntity, { groups: ['create'], message: '该SPU已存在' })
  @IsString()
  @IsOptional({ groups: ['update'] })
  title: string;

  @IsString()
  @ValidateIf((value) => value.subtitle !== null && value.subtitle)
  @IsOptional({ always: true })
  subtitle: string;

  @IsDataExist(CategoryEntity, { always: true, message: 'category不存在' })
  @IsUUID(undefined, { always: true, message: 'category_id格式不正确' })
  @IsString()
  category_id: string;

  @IsDataExist(CategoryEntity, { always: true, message: 'root_category不存在' })
  @IsUUID(undefined, { always: true, message: 'root_category_id格式不正确' })
  @IsString()
  root_category_id: string;

  @IsEnum(OnlineStatus, {
    message: `是否在线的取值范围是 [${OnlineStatus.ONLINE}, ${OnlineStatus.OFFLINE}]`,
  })
  @IsOptional({ always: true })
  online: OnlineStatus;

  @IsString()
  @IsNotEmpty({ always: true })
  price: string;

  @IsOptional({ always: true })
  sketch_spec_id: string;

  @IsOptional({ always: true })
  default_sku_id: string;

  @IsOptional({ always: true })
  img: string;

  @IsString()
  @IsOptional({ always: true })
  discount_price: string;

  @IsString()
  @IsOptional({ always: true })
  description: string;

  @IsString()
  @IsOptional({ always: true })
  tags: string;
}

@DtoValidation({ groups: ['create'] })
export class CreateSpuDto extends PickType(CommonSpuDto, [
  'title',
  'subtitle',
  'category_id',
  'root_category_id',
  'online',
  'price',
  'sketch_spec_id',
  'default_sku_id',
  'img',
  'discount_price',
  'description',
  'tags',
]) {}

export class UpdateSpuDto extends PartialType(CommonSpuDto) {
  @IsDataExist(SpuEntity, { always: true, message: 'SPU不存在' })
  @IsUUID(undefined, { message: 'Spu id不正确' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}
