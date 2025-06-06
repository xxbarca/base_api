import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/Auth/services';
import { SignUpDto } from '@/modules/Auth/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}
