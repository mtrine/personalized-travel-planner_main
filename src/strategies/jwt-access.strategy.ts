import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/modules/user/user.repo';
import { access_token_public_key } from '../constants/jwt.constants'
@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
        super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:  access_token_public_key,
		});
    }

    async validate(payload: any) {
        return await this.userRepository.findById(payload._id, ['user_name', '_id','user_role']);
    }
}
