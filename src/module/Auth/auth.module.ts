import { Module } from '@nestjs/common';
import * as controllers from '@/module/Auth/controllers';
import * as services from '@/module/Auth/services';
import * as repositories from '@/module/Auth/repositories';
import * as strategies from '@/module/Auth/strategies';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV_JWT } from '@/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>(ENV_JWT.JWT_SECRET),
          signOptions: {
            expiresIn: configService.get<string>(ENV_JWT.JWT_EXPIRED),
          },
        };
      },
    }),
  ],
  controllers: Object.values(controllers),
  providers: [
    ...Object.values(services),
    ...Object.values(repositories),
    ...Object.values(strategies),
  ],
})
export class AuthModule {}
