import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { Public } from '../../decorators/isPublic';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async login(@Body() user: LoginDTO): Promise<{ access_token: string }> {
    return await this.authService.login(user);
  }
}
