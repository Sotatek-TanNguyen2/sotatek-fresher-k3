import { PostAccess } from './../../shares/enums/post.enum';
import { UserEntity } from './user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PostMediaEntity } from './post-media.entity';

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
