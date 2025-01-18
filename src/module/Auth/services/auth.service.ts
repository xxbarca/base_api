import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@/module/Auth/services';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@/module/Auth/entities';
import { ConfigService } from '@nestjs/config';
import { ENV_JWT } from '@/constants';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    protected readonly userService: UserService,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByName(username);
    if (!user) {
      throw new ForbiddenException('用户不存在');
    }
    const isPasswordValid = await argon2.verify(user.password, pass);
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误');
    }
    return {
      id: user.id,
      username: user.username,
    };
  }

  async signIn(user: Partial<UserEntity>) {
    return {
      accessToken: await this.generateToken(
        user,
        this.configService.get(ENV_JWT.JWT_EXPIRED),
      ),
      refreshToken: await this.generateToken(
        user,
        this.configService.get(ENV_JWT.JWT_EXPIRED_REFRESH),
      ),
    };
  }

  async generateToken(user: Partial<UserEntity>, expiresIn: string) {
    return await this.jwtService.signAsync(
      {
        username: user.username,
        id: user.id,
      },
      {
        expiresIn,
      },
    );
  }

  async signup(username: string, password: string) {
    return await this.userService.create(username, password);
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(
        token,
        this.configService.get(ENV_JWT.JWT_SECRET),
      );
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('token已过期, 请重新登录');
    }
  }
}
