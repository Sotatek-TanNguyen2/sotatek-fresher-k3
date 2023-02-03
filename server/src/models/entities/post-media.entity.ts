import { MediaType } from './../../shares/enums/media-type.enum';
import { PostEntity } from './post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'post_media',
})
export class PostMediaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: MediaType, default: MediaType.IMAGE })
  type: string;

  @ManyToOne(() => PostEntity, (post) => post.media, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
