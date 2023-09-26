import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body('username') username: string, @Body('password') password: string): Promise<{
    token: string | null
  }> {
    return { token: await this.authService.signIn(username, password) };
  }

  @Post('signup')
  async signUp(@Body('username') username: string, @Body('password') password: string): Promise<{
    token: string | null
  }> {
    return { token: await this.authService.signUp(username, password) };
  }
}
