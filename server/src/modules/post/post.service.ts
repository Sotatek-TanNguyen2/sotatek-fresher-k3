import { PostMediaEntity } from './../../models/entities/post-media.entity';
import { DataSource } from 'typeorm';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostEntity } from './../../models/entities/post.entity';
import { PostRepository } from './../../models/repositories/post.repository';
import { ResponseDto } from './../../shares/dtos/response.dto';
import { PostAccess } from './../../shares/enums/post.enum';
import { getMediaType } from './../../shares/utils/get-file-type.util';
import { getKeyS3 } from './../../shares/utils/get-key-s3.util';
import { PostMediaService } from './../post-media/post-media.service';
import { UploadService } from './../upload/upload.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileDto } from './dto/file.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postMediaService: PostMediaService,
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource
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

  async getAllPostsOfUser(
    page: number,
    userId: number
  ): Promise<ResponseDto<PostEntity[]>> {
    const [posts, count] = await this.postRepository.findAndCount({
      where: {
        user: { id: userId },
        deletedAt: null,
        access: PostAccess.PUBLIC,
      },
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

  async createMany(post: PostEntity, media: PostMediaEntity[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(post);
      await queryRunner.manager.save(media);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createPost(
    userId: number,
    createPostData: CreatePostDto,
    files: Express.Multer.File[]
  ): Promise<PostEntity> {
    const uploadFiles = await Promise.allSettled(
      files.map((file) => this.uploadService.uploadFile(file))
    );
    const filesData = [];
    for (const file of uploadFiles) {
      if (file.status === 'fulfilled') {
        filesData.push({
          type: getMediaType(file.value.type),
          url: file.value.url,
        });
      }
    }
    // const { id } = await this.postRepository.save({
    //   ...createPostData,
    //   user: { id: userId },
    // });
    // await this.postMediaService.createPostMedia(id, filesData);
    let postId: number;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const post = await queryRunner.manager.insert(PostEntity, {
        ...createPostData,
        user: { id: userId },
      });
      postId = post.identifiers[0].id;
      const newMediaPosts = filesData.map((fileData) => ({
        post: { id: postId },
        url: fileData.url,
        type: fileData.type,
      }));
      await queryRunner.manager.insert(PostMediaEntity, newMediaPosts);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return this.getPostById(postId);
  }

  async updatePost(
    userId: number,
    postId: number,
    updatePostData: UpdatePostDto,
    files: Express.Multer.File[]
  ): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: { id: postId, deletedAt: null },
      relations: ['user', 'media'],
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found!`);
    }
    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this post!');
    }
    const uploadFiles = await Promise.allSettled(
      files.map((file) => this.uploadService.uploadFile(file))
    );
    const filesData: FileDto[] = [];
    for (const file of uploadFiles) {
      if (file.status === 'fulfilled') {
        filesData.push({
          type: getMediaType(file.value.type),
          url: file.value.url,
        });
      }
    }
    if (filesData.length) {
      await Promise.allSettled(
        post.media.map((media) =>
          this.uploadService.deleteFileS3(getKeyS3(media.url))
        )
      );
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

  async hardDeletePost(userId: number, postId: number) {
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
