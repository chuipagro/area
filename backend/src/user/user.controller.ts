import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post('changePassword')
  async changePassword(): Promise<{
    token: string | null
  }> {
    return { token: null };
  }

  @Post('changeMail')
  async changeMail(): Promise<{
    token: string | null
  }> {
    return { token: null };
  }

  @Post('changeUsername')
  async changeUsername(): Promise<{
    token: string | null
  }
  > {
    return { token: null };
  }

}
