import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMediaRepository } from './../../models/repositories/post-media.repository';
import { PostMediaController } from './post-media.controller';
import { PostMediaService } from './post-media.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostMediaRepository], 'report'),
    TypeOrmModule.forFeature([PostMediaRepository], 'master'),
  ],
  exports: [PostMediaService],
  controllers: [PostMediaController],
  providers: [PostMediaService],
})
export class PostMediaModule {}
