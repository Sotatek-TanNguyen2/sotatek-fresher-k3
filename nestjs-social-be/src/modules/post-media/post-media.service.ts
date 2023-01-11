import { PostMediaRepository } from './../../models/repositories/post-media.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostMediaService {
  constructor(
    @InjectRepository(PostMediaRepository, 'master')
    private postMediaRepositoryMaster: PostMediaRepository,
    @InjectRepository(PostMediaRepository, 'report')
    private postMediaRepositoryReport: PostMediaRepository,
  ) {}

  async createPostMedia(postId: number, filePaths: string[]) {
    const newMediaPosts = filePaths.map((filePath) => ({
      post: { id: postId },
      url: filePath,
    }));
    return await this.postMediaRepositoryReport.save(newMediaPosts);
  }

  async updatePostMedia(postId: number, filePaths: string[]) {
    await this.postMediaRepositoryReport.delete({ post: { id: postId } });
    return await this.createPostMedia(postId, filePaths);
  }
}
