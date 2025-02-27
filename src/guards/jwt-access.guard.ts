import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
		super();
	}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}
		return super.canActivate(context);
	}

	handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
          throw err || new UnauthorizedException('Token is invalid');
        }
        return user;
      }
}