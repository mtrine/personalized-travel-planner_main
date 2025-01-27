import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/modules/auth/auth.service';
import { refresh_token_public_key } from '../constants/jwt.constants'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'refresh_token',
) {
	constructor(
		private readonly auth_service: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:refresh_token_public_key ,
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: any) {
		return await this.auth_service.getUserIfRefreshTokenMatched(
			payload._id,
			request.headers.authorization?.split('Bearer ')[1] || '',
		);
	}
}
