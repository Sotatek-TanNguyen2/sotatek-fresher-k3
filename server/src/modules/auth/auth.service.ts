import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
    private readonly userService: UserService
  ) {}

  async getMe(userId: number): Promise<UserEntity> {
    return await this.userService.findUserById(userId);
  }

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new BadRequestException('Email or password wrong');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Email or password wrong');

    const accessToken = this.jwtService.sign({ userId: user.id });
    const refreshToken = uuidv4();

    return {
      accessToken,
      refreshToken,
      ...user,
    };
  }

  async signup(signupDto: SignUpDto): Promise<ResponseLogin> {
    const { email, password, confirmPassword } = signupDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Password and confirm password not match');
    }
    const isExisted = await this.userService.checkEmailExisted(email);
    if (isExisted) {
      throw new BadRequestException('Email is existed');
    }
    const user = await this.userService.createUser(signupDto);
    const accessToken = this.jwtService.sign({ userId: user.id });
    const refreshToken = uuidv4();

    return {
      accessToken,
      refreshToken,
      ...user,
    };
  }
}
