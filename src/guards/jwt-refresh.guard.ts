import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt') {
  
    // handleRequest(err, user, info) {
    //     // You can throw an exception based on either "info" or "err" arguments
    //     console.log('err', err);
    //     console.log('user', user);
    //     console.log('info', info);
    //     if (err || !user) {
    //       throw err || new UnauthorizedException('Token is invalid');
    //     }
    //     return user;
    //   }
}