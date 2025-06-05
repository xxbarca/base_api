import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/Auth/services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: { username: string; password: string }) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}
