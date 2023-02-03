import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PostEntity } from './../entities/post.entity';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }

  likePost(postId: number, userId: number) {
    return this.createQueryBuilder()
      .relation(PostEntity, 'likes')
      .of(postId)
      .add(userId);
  }

  unlikePost(postId: number, userId: number) {
    return this.createQueryBuilder()
      .relation(PostEntity, 'likes')
      .of(postId)
      .remove(userId);
  }
}
