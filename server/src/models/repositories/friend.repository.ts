import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FriendEntity } from '../entities/friend.entity';

@Injectable()
export class FriendRepository extends Repository<FriendEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FriendEntity, dataSource.createEntityManager());
  }
}
