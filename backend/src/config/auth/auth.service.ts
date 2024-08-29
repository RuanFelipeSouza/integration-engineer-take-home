import { Injectable } from '@nestjs/common';
import { LoginDTO } from './login.dto';
import { UserService } from 'src/users/users.service';
import { UserDTO } from 'src/users/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(user: LoginDTO): Promise<boolean | null> {
    const data: UserDTO = await this.userService.findOne(user.username);

    return user && (await bcrypt.compare(user.password, data.password));
  }

  async login(user: LoginDTO): Promise<{ access_token: string }> {
    const isValid = await this.validateUser(user);

    if (!isValid) throw new Error('User not valid');

    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
