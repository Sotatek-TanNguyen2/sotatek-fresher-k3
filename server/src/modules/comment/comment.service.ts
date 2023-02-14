import { ConfigService } from '@nestjs/config';
import { ResponseDto } from './../../shares/dtos/response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './../../models/entities/comment.entity';
import { CommentRepository } from './../../models/repositories/comment.repository';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly configService: ConfigService
  ) {}
  private readonly PAGE_SIZE = this.configService.get<number>('PAGE_SIZE');

  async getAllCommentByPostId(
    postId: number
  ): Promise<ResponseDto<CommentEntity[]>> {
    const [comments, count] = await this.commentRepository.findAndCount({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    return {
      data: comments,
      metadata: {
        totalPage: Math.ceil(count / this.PAGE_SIZE),
      },
    };
  }

  async createComment(userId: number, postId: number, data: CreateCommentDto) {
    const newComment = await this.commentRepository.save({
      user: { id: userId },
      post: { id: postId },
      content: data.content,
    });
    return await this.commentRepository.findOne({
      where: { id: newComment.id },
      relations: ['user'],
    });
  }

  async updateComment(
    userId: number,
    commentId: number,
    data: CreateCommentDto
  ): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (comment.user.id !== userId) {
      throw new UnauthorizedException('You are not the owner of this comment!');
    }
    return await this.commentRepository.save({ ...comment, ...data });
  }

  async deleteComment(userId: number, commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${commentId} not found!`);
    }
    if (comment.user.id !== userId) {
      throw new UnauthorizedException('You are not the owner of this comment!');
    }

    await this.commentRepository.delete(commentId);
    return { message: 'Delete comment successfully!' };
  }
}
