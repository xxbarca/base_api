import { IsDataExist, IsUnique } from '@/modules/Database/constraints';
import { SpecKeyEntity, SpecValueEntity } from '@/modules/Mall/entities';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { DtoValidation } from '@/modules/Core/decorators';

class CommonSpecKeyDto {
  @IsUnique(SpecKeyEntity, { always: true, message: '该KEY已经存在' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional({ always: true })
  unit: string;
}

class CommonSpecValueDto {
  @IsUnique(SpecValueEntity, { always: true, message: '该VALUE已经存在' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsDataExist(SpecKeyEntity, { always: true, message: '该spec_key_id不存在' })
  @IsUUID()
  @IsNotEmpty()
  key_id: string;
}

@DtoValidation({ groups: ['create'] })
export class CreateSpecKeyDto extends PickType(CommonSpecKeyDto, [
  'name',
  'unit',
]) {}

@DtoValidation({ groups: ['create'] })
export class CreateSpecValueDto extends PickType(CommonSpecValueDto, [
  'value',
  'key_id',
]) {}
