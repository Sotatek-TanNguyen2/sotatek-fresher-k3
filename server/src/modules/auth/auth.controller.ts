import { ResponseDto } from './../../shares/dtos/response.dto';
import { UserEntity } from './../../models/entities/user.entity';
import { ResponseLogin } from './dto/response-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { GetUser } from './../../shares/decorator/get-user.decorator';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser('id') userId: number): Promise<ResponseDto<UserEntity>> {
    const user = await this.authService.getMe(userId);
    return { data: user };
  }

  @Post('signup')
  async signup(
    @Body() signupDto: SignUpDto
  ): Promise<ResponseDto<ResponseLogin>> {
    return { data: await this.authService.signup(signupDto) };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto<ResponseLogin>> {
    return { data: await this.authService.login(loginDto) };
  }
}
