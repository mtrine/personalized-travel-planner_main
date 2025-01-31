import { Module } from '@nestjs/common';
import { OtpTokenService } from './otp-token.service';
import { OtpTokenController } from './otp-token.controller';

@Module({
  controllers: [OtpTokenController],
  providers: [OtpTokenService],
})
export class OtpTokenModule {}
