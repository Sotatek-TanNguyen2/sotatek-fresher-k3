import { ConfigService } from '@nestjs/config';
import { comparePassword } from './../../shares/utils/password.util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './../../models/entities/user.entity';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLogin } from './dto/response-login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async getMe(userId: number): Promise<UserEntity> {
    return await this.userService.findUserById(userId);
  }

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new BadRequestException('Email or password wrong');
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new BadRequestException('Email or password wrong');
    const { accessToken, refreshToken } = await this.generateRefreshToken(
      user.id
    );
    console.log(await this.userService.getUserWithRefreshToken(user.id));
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
    return await this.userService.createUser(signupDto);
  }

  async logout(userId: number): Promise<void> {
    await this.userService.saveOrUpdateRefreshToken(userId, null, null);
  }

  async generateRefreshToken(
    userId: number
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = uuidv4();
    const resfreshTokenExpires = new Date();
    resfreshTokenExpires.setDate(
      resfreshTokenExpires.getDate() +
        +this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
    );
    await this.userService.saveOrUpdateRefreshToken(
      userId,
      refreshToken,
      resfreshTokenExpires
    );
    return { accessToken, refreshToken };
  }

  async refreshToken(userId: number, refreshToken: string): Promise<string> {
    const user = await this.userService.getUserWithRefreshToken(userId);
    if (!user) throw new BadRequestException('User not found');
    if (user.refreshToken !== refreshToken) {
      throw new BadRequestException('Refresh token not match');
    }
    if (user.refreshTokenExpires < new Date()) {
      throw new BadRequestException('Refresh token expired');
    }
    return this.jwtService.sign({ userId });
  }
}
