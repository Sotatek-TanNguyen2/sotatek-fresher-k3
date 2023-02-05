import { CommentEntity } from './comment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostAccess } from './../../shares/enums/post.enum';
import { PostMediaEntity } from './post-media.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: PostAccess, default: PostAccess.PUBLIC })
  access: string;

  @OneToMany(() => PostMediaEntity, (media) => media.post)
  media: PostMediaEntity[];

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @ManyToMany(() => UserEntity, (user) => user.likedPosts, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'likes' })
  likes: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
