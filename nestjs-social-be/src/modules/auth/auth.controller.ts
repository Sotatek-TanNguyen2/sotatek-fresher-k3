import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { UserService } from 'src/modules/user/users.service';
import { ResponseDto } from 'src/shares/dtos/response.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  // @Get('/current')
  // @UseGuards(JwtAuthGuard)
  // async currentUser(@UserID() userId: number): Promise<ResponseDto<UserEntity>> {
  //   const user = await this.userService.findUserById(userId);
  //   return {
  //     data: user,
  //   };
  // }

  @Post('signup')
  async signup(
    @Body() signupDto: SignUpDto,
  ): Promise<ResponseDto<ResponseLogin>> {
    return { data: await this.authService.signup(signupDto) };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto<ResponseLogin>> {
    return { data: await this.authService.login(loginDto) };
  }

  // @Post('refresh-access-token')
  // @ApiBody({
  //   type: RefreshAccessTokenDto,
  // })
  // async refreshAccessToken(
  //   @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  // ): Promise<ResponseDto<Partial<ResponseLogin>>> {
  //   return {
  //     data: await this.authService.refreshAccessToken(refreshAccessTokenDto),
  //   };
  // }
}
