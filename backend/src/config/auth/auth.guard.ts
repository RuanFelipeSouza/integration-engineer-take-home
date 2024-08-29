import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { getJwtConfig } from '../jwt.config';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../../decorators/isPublic';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtConfig;
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = getJwtConfig(this.configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfig.secret,
      });

      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(
    request: Record<string, any>,
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
