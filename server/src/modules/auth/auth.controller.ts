import { ResponseRefresh } from './dto/response-refresh.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '../../shares/decorators/get-user.decorator';
import { UserEntity } from './../../models/entities/user.entity';
import { ResponseDto } from './../../shares/dtos/response.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLogin } from './dto/response-login.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser('id') userId: number): Promise<ResponseDto<UserEntity>> {
    return { data: await this.authService.getMe(userId) };
  }

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto): Promise<ResponseDto<UserEntity>> {
    return { data: await this.authService.signup(signupDto) };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto<ResponseLogin>> {
    return { data: await this.authService.login(loginDto) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@GetUser('id') userId: number): Promise<ResponseDto<null>> {
    await this.authService.logout(userId);
    return { data: null };
  }

  @Post('refresh')
  async refreshAccessToken(
    @Body() data: RefreshAccessTokenDto
  ): Promise<ResponseDto<ResponseRefresh>> {
    return {
      data: await this.authService.refreshAccessToken(data),
    };
  }
}
