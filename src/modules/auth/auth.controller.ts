import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Public } from 'src/decorators/public.decorator';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { JwtRefreshTokenGuard } from 'src/guards/jwt-refresh.guard';
import { User } from 'src/decorators/user-infor.decorator';
import { IUser } from '../user/user.interface';
import { ResponseMessage } from 'src/decorators/response-message.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ResponseMessage('Sign up successfully')
  @Public()
  signUp(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login successfully')
  login(@User() user:IUser) {
    return this.authService.handleLogin(user);
  }

  @Post('refresh-token')
  @Public()
  @ResponseMessage('Refresh token successfully')
  handleRefreshToken(@Body('refreshToken') refreshToken:string) {
    return this.authService.handleRefreshToken(refreshToken);
  }

}
