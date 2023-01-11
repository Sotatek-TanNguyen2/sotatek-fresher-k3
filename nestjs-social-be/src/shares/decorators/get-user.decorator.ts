import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'src/modules/auth/strategies/jwt.payload';
import { httpErrors } from 'src/shares/exceptions';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return data ? request.user[data] : request.user;
    }
    try {
      const token = request.headers.authorization;
      const payload: JwtPayload = jwtDecode(token);
      return payload.userId;
    } catch (e) {
      throw new HttpException(httpErrors.UNAUTHORIZED, HttpStatus.BAD_REQUEST);
    }
  },
);
