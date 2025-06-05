import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '@/modules/Auth/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    protected readonly userService: UserService,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {}

  async signup(username: string, password: string) {
    return await this.userService.create(username, password);
  }
}
