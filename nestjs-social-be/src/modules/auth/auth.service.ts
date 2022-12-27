import { compare_password } from './../../shares/utils/hash-password.util';
import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { createHash } from 'crypto';
import { UserEntity } from 'src/models/entities/user.entity';
import { AUTH_CACHE_PREFIX, jwtConstants } from 'src/modules/auth/auth.constants';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RefreshAccessTokenDto } from 'src/modules/auth/dto/refresh-access-token.dto';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { JwtPayload } from 'src/modules/auth/strategies/jwt.payload';
import { UserService } from 'src/modules/user/users.service';
import { httpErrors } from 'src/shares/exceptions';
import { checkRecoverSameAddress } from 'src/shares/helpers/utils';
import { v4 as uuidv4 } from 'uuid';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new HttpException(httpErrors.USERNAME_PASSWORD_WRONG, HttpStatus.BAD_REQUEST);

    const isMatch = await compare_password(password, user.password);
    if (!isMatch) throw new HttpException(httpErrors.USERNAME_PASSWORD_WRONG, HttpStatus.BAD_REQUEST);

    const accessToken = this.generateAccessToken({ userId: user.id });
    const refreshToken = await this.generateRefreshToken(accessToken.accessToken);

    delete user.password;
    return {
      ...accessToken,
      ...refreshToken,
      ...user,
    };
  }

  async signup(signupDto: SignUpDto): Promise<ResponseLogin> {
    const { email, password, confirmPassword } = signupDto;
    if (password !== confirmPassword) {
      throw new HttpException(httpErrors.PASSWORD_NOT_MATCH, HttpStatus.BAD_REQUEST);
    }
    const isExisted = await this.userService.checkEmailExisted(email);
    if (isExisted) {
      throw new HttpException(httpErrors.ACCOUNT_EXISTED, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.createUser(signupDto);
    const accessToken = this.generateAccessToken({ userId: user.id });
    const refreshToken = await this.generateRefreshToken(accessToken.accessToken);

    delete user.password;
    return {
      ...accessToken,
      ...refreshToken,
      ...user,
    };
  }

  // async login(loginDto: LoginDto): Promise<ResponseLogin> {
  //   const checkMessage = await checkRecoverSameAddress({
  //     address: loginDto.address,
  //     message: loginDto.message,
  //     signature: loginDto.signature,
  //   });
  //   if (!checkMessage) {
  //     throw new HttpException(httpErrors.ACCOUNT_HASH_NOT_MATCH, HttpStatus.BAD_REQUEST);
  //   }

  //   let user: UserEntity;

  //   if (!(await this.userService.checkUserAddressExisted(loginDto.address))) {
  //     const newUserDto: { address; signature; message } = loginDto;
  //     user = await this.userService.createUser(newUserDto);
  //   } else {
  //     user = await this.userService.findUserByAddress(loginDto.address);
  //   }

  //   const accessToken = this.generateAccessToken({ userId: user.id });
  //   const refreshToken = await this.generateRefreshToken(accessToken.accessToken);

  //   return {
  //     ...accessToken,
  //     ...refreshToken,
  //     ...user,
  //   };
  // }

  async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto): Promise<ResponseLogin> {
    const { refreshToken, accessToken } = refreshAccessTokenDto;
    const oldHashAccessToken = await this.cacheManager.get<string>(`${AUTH_CACHE_PREFIX}${refreshToken}`);
    if (!oldHashAccessToken) throw new HttpException(httpErrors.REFRESH_TOKEN_EXPIRED, HttpStatus.BAD_REQUEST);

    const hashAccessToken = createHash('sha256').update(accessToken).digest('hex');
    if (hashAccessToken == oldHashAccessToken) {
      const oldPayload = await this.decodeAccessToken(accessToken);
      delete oldPayload.iat;
      delete oldPayload.exp;
      const newAccessToken = this.generateAccessToken(oldPayload);
      const newRefreshToken = await this.generateRefreshToken(newAccessToken.accessToken);
      await this.cacheManager.del(`${AUTH_CACHE_PREFIX}${refreshToken}`);
      return {
        ...newAccessToken,
        ...newRefreshToken,
      };
    } else throw new HttpException(httpErrors.REFRESH_TOKEN_EXPIRED, HttpStatus.BAD_REQUEST);
  }

  generateAccessToken(payload: JwtPayload): { accessToken: string } {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async generateRefreshToken(accessToken: string): Promise<{ refreshToken: string }> {
    const refreshToken = uuidv4();
    const hashedAccessToken = createHash('sha256').update(accessToken).digest('hex');
    await this.cacheManager.set<string>(`${AUTH_CACHE_PREFIX}${refreshToken}`, hashedAccessToken, {
      ttl: jwtConstants.refreshTokenExpiry,
    });
    return {
      refreshToken: refreshToken,
    };
  }

  async verifyAccessToken(accessToken: string): Promise<Record<string, unknown>> {
    return this.jwtService.verifyAsync(accessToken);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async decodeAccessToken(accessToken: string): Promise<JwtPayload | any> {
    return this.jwtService.decode(accessToken);
  }
}
