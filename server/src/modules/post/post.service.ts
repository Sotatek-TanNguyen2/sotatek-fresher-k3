import { PostMediaService } from './../post-media/post-media.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './../../models/repositories/post.repository';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postMediaService: PostMediaService
  ) {}

  async getAllPublicPosts() {
    return await this.postRepository.find({
      where: { access: 'PUBLIC' },
      relations: ['media', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async createPost(
    userId: number,
    createPostData: CreatePostDto,
    filePaths: string[]
  ) {
    const newPost = await this.postRepository.save({
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
    filesPath: string[]
  ) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found!`);
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this post!');
    }
    if (filesPath.length) {
      await this.postMediaService.updatePostMedia(postId, filesPath);
    }
    return await this.postRepository.update({ id: postId }, updatePostData);
  }

  async deletePost(userId: number, postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found!`);
    }
    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this post!');
    }
    await this.postRepository.delete({ id: postId });
    return { message: 'Delete post successfully!' };
  }
}
