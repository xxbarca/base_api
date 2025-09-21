import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';
import { DtoValidation } from '@/modules/Core/decorators';
import { Transform } from 'class-transformer';
import { OnlineStatus } from '@/modules/Mall/constants';
import { toNumber } from 'lodash';
import { IsDataExist, IsUnique } from '@/modules/Database/constraints';
import { CategoryEntity } from '@/modules/Mall/entities';
import { PaginateOptions } from '@/modules/Database/types';

export class CommonCategoryDto {
  @IsUnique(CategoryEntity, {
    groups: ['create'],
    message: '分类名已存在',
  })
  @IsString({ always: true })
  @IsNotEmpty({ groups: ['create'] })
  @IsOptional({ groups: ['update', 'paginate'] })
  name: string;

  @IsString({ always: true })
  @IsOptional({ always: true })
  description: string;

  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  @IsOptional({ always: true })
  index: number;

  @IsString({ always: true })
  @IsOptional({ always: true })
  img: string;

  @IsEnum(OnlineStatus, { always: true, message: '无效的状态信息' })
  @ValidateIf((value) => !!value)
  @IsOptional({ groups: ['update', 'paginate'] })
  online: OnlineStatus;

  @IsDataExist(CategoryEntity, { always: true, message: '父分类不存在' })
  @IsUUID(undefined, { always: true, message: '父分类格式不正确' })
  @ValidateIf((value) => value.parent !== null && value.parent)
  @IsString({ always: true })
  @IsOptional({ always: true })
  parent: string;
}
@DtoValidation({ groups: ['create'] })
export class CreateCategoryDto extends PickType(CommonCategoryDto, [
  'name',
  'description',
  'index',
  'img',
  'online',
  'parent',
]) {}

@DtoValidation({ groups: ['update'] })
export class UpdateCategoryDto extends PartialType(CommonCategoryDto) {
  @IsDataExist(CategoryEntity, { always: true, message: '分类不存在' })
  @IsUUID(undefined, { message: '分类id不正确' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}

@DtoValidation({ groups: ['paginate'] })
export class PaginateCategoryDto
  extends PartialType(CommonCategoryDto)
  implements PaginateOptions
{
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNotEmpty({ always: true })
  page?: number = 1;

  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于10' })
  @IsNotEmpty({ always: true })
  limit?: number = 10;
}
