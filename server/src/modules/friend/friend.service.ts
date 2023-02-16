import { UserService } from './../user/user.service';
import { FriendStatus } from './../../shares/enums/user.enum';
import { FriendRepository } from './../../models/repositories/friend.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository,
    private readonly userService: UserService
  ) {}

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

  async friendRequest(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException(
        'You cannot send friend request to yourself'
      );
    }
    const isFriendExist = await this.userService.checkUserExisted(friendId);
    if (!isFriendExist) {
      throw new NotFoundException('User not found');
    }
    const isUserExist = await this.userService.checkUserExisted(userId);
    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }

    const status = await this.friendRepository.getFriendShip(userId, friendId);
    if (status) {
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
    return await this.friendRepository.getFriendShip(userId, friendId);
  }

  async acceptFriend(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException(
        'You cannot send friend request to yourself'
      );
    }
    const isFriendExist = await this.userService.checkUserExisted(friendId);
    if (!isFriendExist) {
      throw new NotFoundException('User not found');
    }
    const isUserExist = await this.userService.checkUserExisted(userId);
    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }
    const status = await this.friendRepository.getFriendShip(friendId, userId);
    if (!status) {
      throw new BadRequestException('You have not sent friend request');
    }
    if (status.friendStatus === FriendStatus.FRIEND) {
      await this.friendRepository.delete({
        userRequest: friendId,
        userReceive: userId,
      });
      return { message: 'Unfriend successfully!' };
    }
    await this.friendRepository.update(status.id, {
      friendStatus: FriendStatus.FRIEND,
    });
    return await this.friendRepository.getFriendShip(friendId, userId);
  }

  async rejectFriend(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException(
        'You cannot send friend request to yourself'
      );
    }
    const isFriendExist = await this.userService.checkUserExisted(friendId);
    if (!isFriendExist) {
      throw new NotFoundException('User not found');
    }
    const isUserExist = await this.userService.checkUserExisted(userId);
    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }
    const status = await this.friendRepository.getFriendShip(friendId, userId);
    if (!status) {
      throw new BadRequestException('You have not sent friend request');
    }
    await this.friendRepository.delete({
      userRequest: friendId,
      userReceive: userId,
    });
    return { message: 'Delete request successfully!' };
  }
}
