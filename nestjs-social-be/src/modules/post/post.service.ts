import { httpErrors } from 'src/shares/exceptions';
import { PostMediaService } from './../post-media/post-media.service';
import { PostRepository } from './../../models/repositories/post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository, 'master')
    private postRepositoryMaster: PostRepository,
    @InjectRepository(PostRepository, 'report')
    private postRepositoryReport: PostRepository,
    private readonly postMediaService: PostMediaService,
  ) {}

  async getAllPublicPosts() {
    return await this.postRepositoryMaster.find({
      where: { access: 'PUBLIC' },
      relations: ['media', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async createPost(
    userId: number,
    createPostData: CreatePostDto,
    filePaths: string[],
  ) {
    const newPost = await this.postRepositoryReport.save({
      ...createPostData,
      user: { id: userId },
    });
    await this.postMediaService.createPostMedia(newPost.id, filePaths);
    return {
      ...newPost,
      media: filePaths,
    };
  }

  async updatePost(
    userId: number,
    postId: number,
    updatePostData: CreatePostDto,
    filesPath: string[],
  ) {
    const post = await this.postRepositoryMaster.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new HttpException(
        httpErrors.POST_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (post.user.id !== userId) {
      throw new HttpException(httpErrors.FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    if (filesPath.length) {
      await this.postMediaService.updatePostMedia(postId, filesPath);
    }
    return await this.postRepositoryReport.update(
      { id: postId },
      updatePostData,
    );
  }

  async deletePost(userId: number, postId: number) {
    const post = await this.postRepositoryMaster.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new HttpException(
        httpErrors.POST_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (post.user.id !== userId) {
      throw new HttpException(httpErrors.FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    await this.postRepositoryReport.delete({ id: postId });
    return { message: 'Delete post successfully!' };
  }
}
