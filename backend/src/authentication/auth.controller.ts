import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async checkExistingUser(username: string): Promise<boolean> {
    const user = await this.authService.usersService.findOne(username);
    if (!user) {
      return false;
    }
    return true;
  }

  @Post('signin')
  async signIn(@Body('username') username: string, @Body('password') password: string): Promise<{
    token: string | null
  }> {
    console.log("signin")
    return { token: await this.authService.signIn(username, password) };
  }

  @Post('signup')
  async signUp(@Body('username') username: string, @Body('password') password: string): Promise<{
    token: string | null
  }> {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    console.log("username:", username, "password:", password)
    await this.authService.usersService.create(username, password);
    return { token: await this.authService.signUp(username, password) };
  }
}
