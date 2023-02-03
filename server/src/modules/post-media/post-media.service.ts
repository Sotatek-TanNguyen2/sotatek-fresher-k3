import { FileDto } from './../post/dto/file.dto';
import { PostMediaRepository } from './../../models/repositories/post-media.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostMediaService {
  constructor(private readonly postMediaRepository: PostMediaRepository) {}

  async createPostMedia(postId: number, filePaths: FileDto[]) {
    const newMediaPosts = filePaths.map((filePath) => ({
      post: { id: postId },
      url: filePath.url,
      type: filePath.type,
    }));
    return await this.postMediaRepository.save(newMediaPosts);
  }

  async updatePostMedia(postId: number, filePaths: FileDto[]) {
    await this.postMediaRepository.delete({ post: { id: postId } });
    return await this.createPostMedia(postId, filePaths);
  }
}
