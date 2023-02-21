import { EmailConsumer } from './comsumers/email.consumer';
import { BullModule } from '@nestjs/bull';
import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../../models/entities/user.entity';
import { UserRepository } from './../../models/repositories/user.repository';
import { MailModule } from './../mail/mail.module';
import { UploadModule } from './../upload/upload.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.registerQueue({
      name: 'mail',
    }),
    CacheModule.register({
      store: redisStore,
      host: '0.0.0.0',
      port: 16379,
      ttl: 5,
    }),
    UploadModule,
    MailModule,
  ],
  providers: [UserService, UserRepository, EmailConsumer],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
