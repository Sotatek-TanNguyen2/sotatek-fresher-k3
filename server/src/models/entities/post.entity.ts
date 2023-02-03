import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostAccess } from './../../shares/enums/post.enum';
import { PostMediaEntity } from './post-media.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'posts',
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'enum',
    enum: PostAccess,
  })
  access: string;

  @OneToMany(() => PostMediaEntity, (media) => media.post)
  media: PostMediaEntity[];

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}