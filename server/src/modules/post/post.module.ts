import { UploadModule } from './../upload/upload.module';
import { CommentModule } from './../comment/comment.module';
import { PostMediaModule } from './../post-media/post-media.module';
import { PostEntity } from './../../models/entities/post.entity';
import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './../../models/repositories/post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    CacheModule.register({
      ttl: 60,
    }),
    PostMediaModule,
    CommentModule,
    UploadModule,
  ],
  providers: [PostService, PostRepository],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
