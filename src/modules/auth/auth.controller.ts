import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Public } from 'src/decorators/public.decorator';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { JwtRefreshTokenGuard } from 'src/guards/jwt-refresh.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  signUp(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Req() req: any) {
    return this.authService.handleLogin(req.user);
  }

  @Post('refresh-token')
  @Public()
  handleRefreshToken(@Body('refreshToken') refreshToken:string) {
    return this.authService.handleRefreshToken(refreshToken);
  }
}
