import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './../../models/repositories/post.repository';
import { PostMediaModule } from './../post-media/post-media.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    PostMediaModule,
    TypeOrmModule.forFeature([PostRepository], 'report'),
    TypeOrmModule.forFeature([PostRepository], 'master'),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
