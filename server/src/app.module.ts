import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { FriendModule } from './modules/friend/friend.module';
import { MailModule } from './modules/mail/mail.module';
import { PostMediaModule } from './modules/post-media/post-media.module';
import { PostModule } from './modules/post/post.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    PostModule,
    PostMediaModule,
    CommentModule,
    FriendModule,
    UploadModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
