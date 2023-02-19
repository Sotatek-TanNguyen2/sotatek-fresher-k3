import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../../shares/decorators/get-user.decorator';
import { UserEntity } from './../../models/entities/user.entity';
import { ResponseDto } from './../../shares/dtos/response.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(
    @GetUser('id') userId: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseDto<UserEntity>> {
    return {
      data: await this.userService.updateProfile(userId, updateUserDto),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @GetUser('id') userId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<ResponseDto<UserEntity>> {
    return {
      data: await this.userService.updateProfile(userId, {}, file),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async changePassword(
    @GetUser('id') userId: number,
    @Body() data: ChangePasswordDto
  ) {
    return { data: await this.userService.changePassword(userId, data) };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUserById(
    @Param('id', new ParseIntPipe()) userId: number
  ): Promise<ResponseDto<UserEntity>> {
    return { data: await this.userService.findUserById(userId) };
  }
}
