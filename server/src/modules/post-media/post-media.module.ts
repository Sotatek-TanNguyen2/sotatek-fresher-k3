import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMediaEntity } from './../../models/entities/post-media.entity';
import { PostMediaRepository } from './../../models/repositories/post-media.repository';
import { PostMediaService } from './post-media.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostMediaEntity])],
  providers: [PostMediaService, PostMediaRepository],
  controllers: [],
  exports: [PostMediaService],
})
export class PostMediaModule {}
