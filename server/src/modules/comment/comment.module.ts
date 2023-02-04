import { CommentEntity } from './../../models/entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './../../models/repositories/comment.repository';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
