import { ChangePasswordDto } from './dto/change-password.dto';
import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadConfig } from './../../config/file-upload.config';
import { UserEntity } from './../../models/entities/user.entity';
import { GetUser } from '../../shares/decorators/get-user.decorator';
import { ResponseDto } from './../../shares/dtos/response.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
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
  @UseInterceptors(FileInterceptor('file', FileUploadConfig))
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
  @UseInterceptors(FileInterceptor('file', FileUploadConfig))
  async changeAvatar(
    @GetUser('id') userId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /[^\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)$/,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<ResponseDto<UserEntity>> {
    const fileUrl = `${this.configService.get<string>(
      'URL'
    )}:${this.configService.get<number>('PORT')}/uploads/${file.filename}`;

    return {
      data: await this.userService.updateProfile(userId, {}, fileUrl),
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
}
