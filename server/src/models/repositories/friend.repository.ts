import { UserEntity } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FriendEntity } from '../entities/friend.entity';

@Injectable()
export class FriendRepository extends Repository<FriendEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FriendEntity, dataSource.createEntityManager());
  }

  async getFriendShipStatus(userId: number, friendId: number) {
    const friendShip = await this.createQueryBuilder('friend')
      .where(
        'friend.userRequest = :userId AND friend.userReceive = :friendId',
        { userId, friendId }
      )
      .getCount();
    return friendShip;
  }

  async getFriendList(userId: number, friendStatus: string) {
    return await this.createQueryBuilder('friend')
      .where(
        'friend.userRequest = :userId AND friend.friendStatus = :friendStatus',
        { userId, friendStatus }
      )
      .orWhere(
        'friend.userReceive = :userId AND friend.friendStatus = :friendStatus',
        { userId, friendStatus }
      )
      .leftJoinAndSelect('friend.userReceive', 'userReceive')
      .getMany();
  }

  async getFollowers(userId: number, friendStatus: string) {
    return await this.createQueryBuilder('friend')
      .where(
        'friend.userReceive = :userId AND friend.friendStatus = :friendStatus',
        { userId, friendStatus }
      )
      .leftJoinAndSelect('friend.userRequest', 'userRequest')
      .getMany();
  }

  async getFollowings(userId: number, friendStatus: string) {
    return await this.createQueryBuilder('friend')
      .where(
        'friend.userRequest = :userId AND friend.friendStatus = :friendStatus',
        { userId, friendStatus }
      )
      .leftJoinAndSelect('friend.userReceive', 'userReceive')
      .getMany();
  }
}
