import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from '@/modules/Database/constraints';
import { UserEntity } from '@/modules/Auth/entities';
import { PickType } from '@nestjs/swagger';
import { DtoValidation } from '@/modules/Core/decorators';

class UserCommonDto {
  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  @Length(5, 20, {
    message: ({ constraints }) => {
      return `用户名长度必须大于${constraints[0]}小于${constraints[1]}`;
    },
  })
  @IsUnique(UserEntity, {
    message: '该用户名已存在',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  phone: string;
}

@DtoValidation({ groups: ['create'] })
export class SignUpDto extends PickType(UserCommonDto, [
  'password',
  'username',
]) {}
