import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('request-otp')
  async requestOtp(@Body() body: { email: string }) {
    const { email } = body;
    return this.auth.requestOtp(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string, code: string }) {
    const { email, code } = body;
    return this.auth.verifyOtp(email, code);
  }
}
