import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from 'src/strategies/jwt-access.strategy';
import { KeyTokenModule } from '../key-token/key-token.module';
import { JwtRefreshTokenStrategy } from 'src/strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule, 
    KeyTokenModule,
    PassportModule,
    JwtModule.register({
      signOptions: {
        algorithm: 'RS256', 
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtAccessTokenStrategy],
})
export class AuthModule { }
