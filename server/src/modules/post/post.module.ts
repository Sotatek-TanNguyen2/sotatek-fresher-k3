import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { PostEntity } from './../../models/entities/post.entity';
import { PostRepository } from './../../models/repositories/post.repository';
import { CommentModule } from './../comment/comment.module';
import { PostMediaModule } from './../post-media/post-media.module';
import { UploadModule } from './../upload/upload.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    // CacheModule.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     store: redisStore,
    //     host: configService.get<string>('REDIS_HOST'),
    //     port: configService.get<number>('REDIS_PORT'),
    //     ttl: configService.get<number>('REDIS_TTL'),
    //   }),
    //   inject: [ConfigService],
    // }),
    CacheModule.register({
      store: redisStore,
      host: '0.0.0.0',
      port: 16379,
      ttl: 3600,
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
