import { FileDto } from './dto/file.dto';
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

  async getPostById(postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['media', 'user'],
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found!`);
    }
    return post;
  }

  async createPost(
    userId: number,
    createPostData: CreatePostDto,
    filesData: FileDto[]
  ) {
    const newPost = await this.postRepository.save({
      ...createPostData,
      user: { id: userId },
    });
    await this.postMediaService.createPostMedia(newPost.id, filesData);
    return {
      ...newPost,
      media: filesData,
    };
  }

  async updatePost(
    userId: number,
    postId: number,
    updatePostData: CreatePostDto,
    filesData: FileDto[]
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
    if (filesData.length) {
      await this.postMediaService.updatePostMedia(postId, filesData);
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

  async likePost(userId: number, postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['likes'],
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found!`);
    }
    const isLiked = post.likes.some((user) => user.id === userId);
    if (isLiked) {
      await this.postRepository.unlikePost(postId, userId);
      return { message: 'Unlike post successfully!' };
    }
    await this.postRepository.likePost(postId, userId);
    return { message: 'Like post successfully!' };
  }
}
