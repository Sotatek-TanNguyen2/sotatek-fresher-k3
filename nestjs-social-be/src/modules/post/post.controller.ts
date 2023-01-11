import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from '../../shares/decorators/get-user.decorator';
import { PostService } from './post.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as config from 'config';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPublicPosts() {
    return await this.postService.getAllPublicPosts();
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '_' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = uniqueSuffix + ext;
          callback(null, filename.replace(/\\/g, '/'));
        },
      }),
    }),
  )
  async createPost(
    @GetUser('id') userId: number,
    @Body() createPostData: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const filePaths = files.map(
      (file) =>
        `http://localhost:${config.get<number>('app.port')}/uploads/${
          file.filename
        }`,
    );
    return await this.postService.createPost(userId, createPostData, filePaths);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '_' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = uniqueSuffix + ext;
          callback(null, filename.replace(/\\/g, '/'));
        },
      }),
    }),
  )
  async updatePost(
    @GetUser('id') userId: number,
    @Param('id', new ParseIntPipe()) postId: number,
    @Body() updatePostData: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const filePaths = files.map(
      (file) =>
        `http://localhost:${config.get<number>('app.port')}/uploads/${
          file.filename
        }`,
    );
    return await this.postService.updatePost(
      userId,
      postId,
      updatePostData,
      filePaths,
    );
  }

  @Delete(':id')
  async deletePost(@GetUser('id') userId: number, @Param('id') postId: number) {
    return await this.postService.deletePost(userId, postId);
  }
}
