import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/Auth/services';
import { SignUpDto } from '@/modules/Auth/dtos';
import { LocalGuard } from '@/modules/Auth/guards';
import { IsPublic, ReqUser } from '@/modules/Auth/decorators';
import { UserEntity } from '@/modules/Auth/entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }

  @UseGuards(LocalGuard)
  @IsPublic()
  @Post('/signIn')
  signIn(@ReqUser() user: ClassToPlain<UserEntity>) {
    return this.authService.signIn(user);
  }

  @IsPublic()
  @Post('/refresh')
  async refresh(@Body() dto: { token: string }) {
    const { token } = dto;
    const result = await this.authService.verifyToken(token);
    return this.authService.signIn(result);
  }
}
