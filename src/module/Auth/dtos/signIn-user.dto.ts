import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SignInUserDto {
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

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  roles: number[];
}
