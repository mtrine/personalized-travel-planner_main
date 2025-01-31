import { Controller } from '@nestjs/common';
import { OtpTokenService } from './otp-token.service';

@Controller('otp-token')
export class OtpTokenController {
  constructor(private readonly otpTokenService: OtpTokenService) {}
}
