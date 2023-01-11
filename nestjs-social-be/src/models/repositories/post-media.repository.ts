import { EntityRepository, Repository } from 'typeorm';
import { PostMediaEntity } from './../entities/post-media.entity';

@EntityRepository(PostMediaEntity)
export class PostMediaRepository extends Repository<PostMediaEntity> {}
