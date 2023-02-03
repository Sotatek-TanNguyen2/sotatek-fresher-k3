import { ResponseLogin } from './dto/response-login.dto';
import { ResponseDto } from './../../shares/dtos/response.dto';
import { SignUpDto } from './dto/signup.dto';
import { compare_password } from './../../shares/bcrypt/password.bcrypt';
import { UserEntity } from './../../models/entities/user.entity';
import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async getMe(userId: number): Promise<UserEntity> {
    const user = await this.userService.findUserById(userId);
    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new BadRequestException('Email or password wrong');

    const isMatch = await compare_password(password, user.password);
    if (!isMatch) throw new BadRequestException('Email or password wrong');

    const accessToken = this.jwtService.sign({ userId: user.id });
    const refreshToken = uuidv4();

    delete user.password;
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

    delete user.password;
    return {
      accessToken,
      refreshToken,
      ...user,
    };
  }
}
