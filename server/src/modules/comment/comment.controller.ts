import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { GetUser } from '../../shares/decorators/get-user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentEntity } from './../../models/entities/comment.entity';
import { ResponseDto } from './../../shares/dtos/response.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  async getAllCommentByPostId(
    @Param('id') postId: number
  ): Promise<ResponseDto<CommentEntity[]>> {
    return { data: await this.commentService.getAllCommentByPostId(postId) };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async createComment(
    @GetUser('id') userId,
    @Param('id') postId: number,
    @Body() data: CreateCommentDto
  ): Promise<ResponseDto<CommentEntity>> {
    return {
      data: await this.commentService.createComment(userId, postId, data),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateComment(
    @GetUser('id') userId,
    @Param('id') commentId: number,
    @Body() data: CreateCommentDto
  ): Promise<ResponseDto<CommentEntity>> {
    return {
      data: await this.commentService.updateComment(userId, commentId, data),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@GetUser('id') userId, @Param('id') commentId: number) {
    return { data: await this.commentService.deleteComment(userId, commentId) };
  }
}
