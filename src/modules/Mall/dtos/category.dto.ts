import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { DtoValidation } from '@/modules/Core/decorators';
import { Transform } from 'class-transformer';
import { OnlineStatus } from '@/modules/Mall/constants';
import { toNumber } from 'lodash';

export class CommonCategoryDto {
  @IsString({ always: true })
  @IsNotEmpty({ groups: ['create'] })
  @IsOptional({ groups: ['update'] })
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
  @IsOptional({ groups: ['update'] })
  online: OnlineStatus;

  @IsUUID(undefined, { always: true, message: '父分类格式不正确' })
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
