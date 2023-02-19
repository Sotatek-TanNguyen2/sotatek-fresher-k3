import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../../models/entities/user.entity';
import { UserRepository } from './../../models/repositories/user.repository';
import { UploadModule } from './../upload/upload.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UploadModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
