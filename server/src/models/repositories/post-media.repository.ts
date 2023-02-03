import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { PostMediaEntity } from './../entities/post-media.entity';

@Injectable()
export class PostMediaRepository extends Repository<PostMediaEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PostMediaEntity, dataSource.createEntityManager());
  }
}
