import { EmailConsumer } from './comsumers/email.consumer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../../models/entities/user.entity';
import { UserRepository } from './../../models/repositories/user.repository';
import { MailModule } from './../mail/mail.module';
import { UploadModule } from './../upload/upload.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.registerQueue({
      name: 'mail',
    }),
    UploadModule,
    MailModule,
  ],
  providers: [UserService, UserRepository, EmailConsumer],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
