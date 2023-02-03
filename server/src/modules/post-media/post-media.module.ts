import { PostMediaRepository } from './../../models/repositories/post-media.repository';
import { PostMediaEntity } from './../../models/entities/post-media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostMediaService } from './post-media.service';
import { PostMediaController } from './post-media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostMediaEntity])],
  providers: [PostMediaService, PostMediaRepository],
  controllers: [PostMediaController],
  exports: [PostMediaService],
})
export class PostMediaModule {}
