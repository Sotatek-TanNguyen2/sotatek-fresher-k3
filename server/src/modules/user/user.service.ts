import { FriendStatus } from './../../shares/enums/user.enum';
import { FriendRepository } from './../../models/repositories/friend.repository';
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
  constructor(
    private readonly userRepository: UserRepository,
    private readonly friendRepository: FriendRepository
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

  async getAllFriend(id: number) {
    const friends = await this.friendRepository.getFriendList(
      id,
      FriendStatus.FRIEND
    );
    const followings = await this.friendRepository.getFollowings(
      id,
      FriendStatus.FOLLOW
    );
    const followers = await this.friendRepository.getFollowers(
      id,
      FriendStatus.FOLLOW
    );
    return {
      friends,
      followings,
      followers,
    };
  }

  async checkUserExisted(id: number): Promise<boolean> {
    const isExist = await this.userRepository.count({
      where: { id },
    });
    return isExist > 0;
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
    const isExist = await this.checkUserExisted(userId);
    if (!isExist) {
      throw new NotFoundException('User not found');
    }
    if (data.username) {
      const isUsernameExisted = await this.checkUsernameExisted(data.username);
      if (isUsernameExisted) {
        throw new BadRequestException('Username already exists.');
      }
    }
    if (url)
      await this.userRepository.update(userId, {
        ...data,
        avatar: url,
      });
    else await this.userRepository.update(userId, data);

    return await this.userRepository.findUserById(userId);
  }

  async friendRequest(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException(
        'You cannot send friend request to yourself'
      );
    }
    const isFriendExist = await this.checkUserExisted(friendId);
    if (!isFriendExist) {
      throw new NotFoundException('User not found');
    }
    const isUserExist = await this.checkUserExisted(userId);
    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }

    const isFriend = await this.friendRepository.getFriendShipStatus(
      userId,
      friendId
    );
    if (isFriend > 0) {
      await this.friendRepository.delete({
        userRequest: userId,
        userReceive: friendId,
      });
      return { message: 'Unfollow successfully!' };
    }
    await this.friendRepository.save({
      userRequest: userId,
      userReceive: friendId,
    });
    return { message: 'Follow successfully!' };
  }

  async receiveFriendRequest(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException(
        'You cannot send friend request to yourself'
      );
    }
    const isFriendExist = await this.checkUserExisted(friendId);
    if (!isFriendExist) {
      throw new NotFoundException('User not found');
    }
    const isUserExist = await this.checkUserExisted(userId);
    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }

    const isFriend = await this.friendRepository.getFriendShipStatus(
      userId,
      friendId
    );
    if (isFriend > 0) {
      await this.friendRepository.delete({
        userRequest: friendId,
        userReceive: userId,
      });
      return { message: 'Unfriend successfully!' };
    }
    await this.friendRepository.save({
      userRequest: friendId,
      userReceive: userId,
      friendStatus: FriendStatus.FRIEND,
    });
    return { message: 'Friend successfully!' };
  }
}
