import { CommentEntity } from './comment.entity';
import { UserRole, UserStatus } from './../../shares/enums/user.enum';
import { PostEntity } from './post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FriendEntity } from './friend.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  bio: string;

  @Column()
  location: string;

  @Column()
  avatar: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @ManyToMany(() => PostEntity, (post) => post.likes)
  likedPosts: PostEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.userRequest)
  friendRequest: FriendEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.userReceive)
  friendReceive: FriendEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
