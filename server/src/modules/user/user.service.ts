import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './../../models/entities/user.entity';
import { UserRepository } from './../../models/repositories/user.repository';
import { getKeyS3 } from './../../shares/utils/get-key-s3.util';
import {
  comparePassword,
  hashPassword,
} from './../../shares/utils/password.util';
import { MailService } from './../mail/mail.service';
import { UploadService } from './../upload/upload.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uploadService: UploadService,
    private readonly mailService: MailService
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findUserByEmail(email);
  }

  async checkEmailExisted(email: string): Promise<boolean> {
    const isExist = await this.userRepository.count({
      where: { email },
    });
    return isExist > 0;
  }

  async checkUsernameExisted(username: string): Promise<boolean> {
    const isExist = await this.userRepository.count({
      where: { username },
    });
    return isExist > 0;
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async checkUserExisted(id: number): Promise<boolean> {
    const isExist = await this.userRepository.count({
      where: { id },
    });
    return isExist > 0;
  }

  async getUserWithRefreshToken(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.getUserWithRefreshToken(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;
    const newUser = await this.userRepository.save({
      email: email,
      password: await hashPassword(password),
    });
    await this.mailService.sendWelcomeMail(email);
    delete newUser.password;
    return newUser;
  }

  async changePassword(userId: number, data: ChangePasswordDto) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await comparePassword(data.password, user.password))) {
      throw new BadRequestException('Password wrong');
    }
    if (data.newPassword !== data.confirmPassword) {
      throw new BadRequestException('Password and confirm password not match');
    }
    await this.userRepository.update(userId, {
      password: await hashPassword(data.newPassword),
    });
    return { message: 'Change password successfully!' };
  }

  async updateProfile(
    userId: number,
    data: UpdateUserDto,
    file?: Express.Multer.File
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    if (data.username) {
      const isUsernameExisted = await this.checkUsernameExisted(data.username);
      if (isUsernameExisted) {
        throw new BadRequestException('Username already exists.');
      }
    }
    if (file) {
      const upload = await this.uploadService.uploadFile(file);
      await this.uploadService.deleteFileS3(getKeyS3(user.avatar));
      await this.userRepository.update(userId, {
        ...data,
        avatar: upload.url,
      });
    } else await this.userRepository.update(userId, data);
    return await this.findUserById(userId);
  }

  async saveOrUpdateRefreshToken(
    userId: number,
    refreshToken: string,
    refreshTokenExpires: Date
  ) {
    await this.userRepository.update(userId, {
      refreshToken,
      refreshTokenExpires,
    });
  }
}
