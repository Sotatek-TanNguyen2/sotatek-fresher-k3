import { UserEntity } from './user.entity';
import { FriendStatus } from './../../shares/enums/user.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'friends' })
export class FriendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: FriendStatus, default: FriendStatus.FOLLOW })
  friendStatus: string;

  @ManyToOne(() => UserEntity, (user) => user.friendRequest, {
    onDelete: 'CASCADE',
  })
  userRequest: number;

  @ManyToOne(() => UserEntity, (user) => user.friendReceive, {
    onDelete: 'CASCADE',
  })
  userReceive: number;

  @CreateDateColumn()
  createdAt: Date;
}
