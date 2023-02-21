import { ResponseRefresh } from './dto/response-refresh.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { JwtPayload } from './strategies/jwt.payload';
import { ConfigService } from '@nestjs/config';
import {
  comparePassword,
  hashPassword,
} from './../../shares/utils/password.util';
import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './../../models/entities/user.entity';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLogin } from './dto/response-login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  private AUTH_CACHE_PREFIX: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    this.AUTH_CACHE_PREFIX =
      this.configService.get<string>('AUTH_CACHE_PREFIX');
  }

  async getMe(userId: number): Promise<UserEntity> {
    return await this.userService.findUserById(userId);
  }

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new BadRequestException('Email or password wrong');
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new BadRequestException('Email or password wrong');
    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(accessToken);
    delete user.password;
    return {
      accessToken,
      refreshToken,
      ...user,
    };
  }

  async signup(signupDto: SignUpDto): Promise<UserEntity> {
    const { email, password, confirmPassword } = signupDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Password and confirm password not match');
    }
    const isExisted = await this.userService.checkEmailExisted(email);
    if (isExisted) {
      throw new BadRequestException('Email is existed');
    }
    const newUser = await this.userService.createUser(signupDto);
    delete newUser.password;
    return newUser;
  }

  async logout(userId: number): Promise<void> {
    await this.cacheManager.reset();
  }

  async refreshAccessToken(
    refreshAccessTokenDto: RefreshAccessTokenDto
  ): Promise<ResponseRefresh> {
    const { refreshToken, accessToken } = refreshAccessTokenDto;
    const oldHashAccessToken = await this.cacheManager.get<string>(
      `${this.AUTH_CACHE_PREFIX}${refreshToken}`
    );
    if (!oldHashAccessToken)
      throw new BadRequestException('Refresh token expired');

    const isMatch = await comparePassword(accessToken, oldHashAccessToken);
    if (isMatch) {
      const { userId } = this.decodeAccessToken(accessToken);
      const newAccessToken = await this.generateAccessToken(userId);
      const newRefreshToken = await this.generateRefreshToken(newAccessToken);
      await this.cacheManager.del(`${this.AUTH_CACHE_PREFIX}${refreshToken}`);
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } else throw new BadRequestException('Refresh token not match');
  }

  decodeAccessToken(accessToken: string): JwtPayload | any {
    return this.jwtService.decode(accessToken);
  }

  async generateAccessToken(userId: number): Promise<string> {
    return await this.jwtService.sign({ userId });
  }

  async generateRefreshToken(accessToken: string): Promise<string> {
    const refreshToken = uuidv4();
    const hashedAccessToken = await hashPassword(accessToken);
    await this.cacheManager.set<string>(
      `${this.AUTH_CACHE_PREFIX}${refreshToken}`,
      hashedAccessToken,
      {
        ttl: this.configService.get<number>(
          'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
        ),
      }
    );
    return refreshToken;
  }
}
