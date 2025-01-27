import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UserRepository } from '../user/user.repo';
import { CustomException } from 'src/exception-handle/custom-exception';
import { ErrorCode } from 'src/enums/error-code.enum';
import e from 'express';
import { UtilsService } from 'src/utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { access_token_private_key, access_token_public_key,refresh_token_private_key, refresh_token_public_key } from '../../constants/jwt.constants';
import { ConfigService } from '@nestjs/config';
import { KeyTokenService } from '../key-token/key-token.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly keyTokenService: KeyTokenService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email, []);
    if (!user) {
      return null;
    }
    const truePass = await UtilsService.comparePassword(pass, user.user_password);
    if (truePass) {
      const { user_password, ...result } = user;
      return result;
    }
  }

  async signUp(dto: SignupDto) {
    const existUser = await this.userRepository.findByEmail(dto.email, []);
    if (existUser) {
      throw new CustomException(ErrorCode.USER_EXIST);
    }
    const newUser = await this.userRepository.createNewUser(dto);
    if (newUser) {

      const payload = {
        sub: "token register",
        iss: "from server",
        _id: newUser._id,
        role: newUser.user_role,
      }
      const accessToken = this.generateAccessToken(payload, access_token_private_key);
      const refreshToken = this.generateRefreshToken(payload, refresh_token_private_key);
      const publicKey = await this.keyTokenService.createKeyToken(newUser._id.toString(), access_token_public_key, access_token_private_key,refresh_token_public_key,refresh_token_private_key ,refreshToken);
      if (!publicKey) {
        throw new CustomException(ErrorCode.PUBLICKEY_ERROR);
      }
      return {
        user: newUser,
        access_token: accessToken,
        refresh_token: refreshToken,
      };

    }

  }


  async handleLogin(user: any) {
    const payload = {
      sub: "token login",
      iss: "from server",
      _id: user._id,
      role: user.user_role,
    }
    const accessToken = this.generateAccessToken(payload, access_token_private_key);
    const refreshToken = this.generateRefreshToken(payload, refresh_token_private_key);
    const publicKey = await this.keyTokenService.createKeyToken(user._id.toString(), access_token_public_key, access_token_private_key,refresh_token_public_key,refresh_token_private_key, refreshToken);
    if (!publicKey) {
      throw new CustomException(ErrorCode.PUBLICKEY_ERROR);
    }
    return {
      user: user,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async handleRefreshToken(refreshToken: string) {
    const foundToken = await this.keyTokenService.findByRefreshTokenUsed(refreshToken);
    if (foundToken) {
      const { _id } = await this.jwtService.verifyAsync(refreshToken, { secret: foundToken.refresh_privateKey });
      await this.keyTokenService.deleteKeyById(foundToken._id.toString());
      throw new CustomException(ErrorCode.REFRESH_TOKEN_ERROR);
    }
    const holderToken = await this.keyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) {
      throw new CustomException(ErrorCode.USER_NOT_REGISTER);
    }
    const { _id } = await this.jwtService.verifyAsync(refreshToken, { secret: holderToken.refresh_privateKey });

    const foundUser = await this.userRepository.findById(_id, []);
    if (!foundUser) {
      throw new CustomException(ErrorCode.USER_NOT_REGISTER);
    }
    const payload = {
      sub: "token login",
      iss: "from server",
      _id: foundUser._id,
      role: foundUser.user_role,
    }
    const accessToken = this.generateAccessToken(payload, holderToken.access_privateKey);
    const newRefreshToken = this.generateRefreshToken(payload, holderToken.refresh_privateKey);
    
    await this.keyTokenService.updateKeyToken(holderToken._id.toString(), refreshToken, newRefreshToken);
  
    return{ 
      user: foundUser,
      access_token: accessToken,
      refresh_token: newRefreshToken,
    }
  }

  //Handle JWT
  generateAccessToken(payload: any, access_token_private_key: string) {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: access_token_private_key,
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
    });
  }

  generateRefreshToken(payload: any, refresh_token_private_key: string) {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: refresh_token_private_key,
      expiresIn: this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      ),
    });
  }

  async getUserIfRefreshTokenMatched(
    user_id: string,
    refresh_token: string,
  ) {
    try {
      const user = await this.userRepository.findById(user_id, []);
      if (!user) {
        throw new UnauthorizedException();
      }
      const refresh_token_user = this.keyTokenService.queryKeyToken({
        userId: user_id,
        $in: {  refreshToken: refresh_token }
      });


      if (!refresh_token_user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
