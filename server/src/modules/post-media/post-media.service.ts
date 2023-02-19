import { FileDto } from './../post/dto/file.dto';
import { PostMediaRepository } from './../../models/repositories/post-media.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostMediaService {
  constructor(private readonly postMediaRepository: PostMediaRepository) {}

  async createPostMedia(postId: number, filesData: FileDto[]) {
    const newMediaPosts = filesData.map((fileData) => ({
      post: { id: postId },
      url: fileData.url,
      type: fileData.type,
      key: fileData.key,
    }));
    return await this.postMediaRepository.save(newMediaPosts);
  }

  async updatePostMedia(postId: number, filesData: FileDto[]) {
    await this.postMediaRepository.delete({ post: { id: postId } });
    return await this.createPostMedia(postId, filesData);
  }
}
