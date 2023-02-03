import { UserRole, UserStatus } from './../../shares/enums/user.enum';
import { PostEntity } from './post.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
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

  @Column()
  password: string;

  @Column()
  bio: string;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}