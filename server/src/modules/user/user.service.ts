import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './../../models/entities/user.entity';
import { UserRepository } from './../../models/repositories/user.repository';
import {
  comparePassword,
  hashPassword,
} from './../../shares/utils/password.util';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;
    const newUser = await this.userRepository.save({
      email: email,
      password: await hashPassword(password),
    });

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
    url?: string
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    if (data.username) {
      const isExisted = await this.checkUsernameExisted(data.username);
      if (isExisted) {
        throw new BadRequestException('Username already exists.');
      }
    }

    return await this.userRepository.save({
      ...user,
      ...data,
      avatar: url ? url : user.avatar,
    });
  }
}
