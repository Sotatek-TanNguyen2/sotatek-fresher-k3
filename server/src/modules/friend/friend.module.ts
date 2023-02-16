import { UserModule } from './../user/user.module';
import { FriendRepository } from './../../models/repositories/friend.repository';
import { FriendEntity } from './../../models/entities/friend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FriendEntity]), UserModule],
  providers: [FriendService, FriendRepository],
  controllers: [FriendController],
  exports: [FriendService],
})
export class FriendModule {}
