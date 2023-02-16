import { UserEntity } from './user.entity';
import { FriendStatus } from './../../shares/enums/user.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'friends' })
export class FriendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: FriendStatus })
  friendStatus: string;

  @ManyToOne(() => UserEntity, (user) => user.friendRequest, {
    onDelete: 'CASCADE',
  })
  userRequest: number;

  @ManyToOne(() => UserEntity, (user) => user.friendAccept, {
    onDelete: 'CASCADE',
  })
  userAccept: number;

  @Column()
  createdAt: Date;
}
