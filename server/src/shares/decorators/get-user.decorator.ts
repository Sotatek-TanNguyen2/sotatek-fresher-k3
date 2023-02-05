import { JwtService } from '@nestjs/jwt';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (req.user) return data ? req.user[data] : req.user;

    try {
      const token = req.headers.authorization.split(' ')[1];
      return new JwtService().verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
);
