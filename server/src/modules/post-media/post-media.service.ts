import { PostMediaRepository } from './../../models/repositories/post-media.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostMediaService {
  constructor(private readonly postMediaRepository: PostMediaRepository) {}

  async createPostMedia(postId: number, filePaths: string[]) {
    const newMediaPosts = filePaths.map((filePath) => ({
      post: { id: postId },
      url: filePath,
    }));
    return await this.postMediaRepository.save(newMediaPosts);
  }

  async updatePostMedia(postId: number, filePaths: string[]) {
    await this.postMediaRepository.delete({ post: { id: postId } });
    return await this.createPostMedia(postId, filePaths);
  }
}
