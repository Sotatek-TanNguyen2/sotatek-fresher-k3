import { ResponseDto } from './../../shares/dtos/response.dto';
import { ConfigService } from '@nestjs/config';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './../../models/entities/post.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './../../models/repositories/post.repository';
import { PostAccess } from './../../shares/enums/post.enum';
import { PostMediaService } from './../post-media/post-media.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileDto } from './dto/file.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postMediaService: PostMediaService,
    private readonly configService: ConfigService
  ) {}
  private readonly PAGE_SIZE = this.configService.get<number>('PAGE_SIZE');

  async getAllPublicPosts(page: number): Promise<ResponseDto<PostEntity[]>> {
    const [posts, count] = await this.postRepository.findAndCount({
      where: { access: PostAccess.PUBLIC, deletedAt: null },
      relations: ['media', 'user', 'likes', 'comments.user'],
      skip: (page - 1) * this.PAGE_SIZE,
      take: this.PAGE_SIZE,
      order: { createdAt: 'DESC' },
    });
    return {
      data: posts,
      metadata: {
        totalPage: Math.ceil(count / this.PAGE_SIZE),
      },
    };
  }

  async getPostById(postId: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: { id: postId, deletedAt: null },
      relations: ['media', 'user', 'likes', 'comments.user'],
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
  ): Promise<PostEntity> {
    const newPost = await this.postRepository.save({
      ...createPostData,
      user: { id: userId },
    });
    await this.postMediaService.createPostMedia(newPost.id, filesData);
    return this.getPostById(newPost.id);
  }

  async updatePost(
    userId: number,
    postId: number,
    updatePostData: UpdatePostDto,
    filesData: FileDto[]
  ): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: { id: postId, deletedAt: null },
      relations: ['user'],
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

    await this.postRepository.update({ id: postId }, updatePostData);
    return await this.getPostById(postId);
  }

  async softDeletePost(userId: number, postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId, deletedAt: null },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found!`);
    }
    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this post!');
    }
    await this.postRepository.softDelete({ id: postId });
    return { message: 'Delete post successfully!' };
  }

  async likePost(userId: number, postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId, deletedAt: null },
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
