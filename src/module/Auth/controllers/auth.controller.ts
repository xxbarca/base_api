import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@/module/Auth/services';
import { SignInUserDto } from '@/module/Auth/dtos';
import { UserEntity } from '@/module/Auth/entities';
import { IsPublic, ReqUser } from '@/module/Auth/decorators';
import { LocalAuthGuard } from '@/module/Auth/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  signIn(@ReqUser() user: ClassToPlain<UserEntity>) {
    return this.authService.signIn(user);
  }

  @Post('/signup')
  signup(@Body() dto: SignInUserDto) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }

  @IsPublic()
  @Post('/refresh')
  async refresh(@Body() dto: { token: string }) {
    const { token } = dto;
    const result = await this.authService.verifyToken(token);
    return this.authService.signIn(result);
  }
}
