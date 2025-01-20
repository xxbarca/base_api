import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';
import { PaginateOptions } from '@/module/Database/types';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';

class UserCommonDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, {
    message: ({ constraints }) => {
      return `用户名长度必须大于${constraints[0]}小于${constraints[1]}`;
    },
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}

export class PaginateUserDto
  extends PartialType(UserCommonDto)
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

export class UpdateUserDto extends PartialType(UserCommonDto) {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class SignInUserDto extends PickType(UserCommonDto, [
  'password',
  'username',
]) {}
