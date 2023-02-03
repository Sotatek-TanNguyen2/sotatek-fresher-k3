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
import { ConfigService } from '@nestjs/config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetUser } from './../../shares/decorator/get-user.decorator';
import { getMediaType } from './../../shares/utils/get-file-type.util';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly configService: ConfigService,
    private readonly postService: PostService
  ) {}

  @Get()
  async getAllPublicPosts() {
    return await this.postService.getAllPublicPosts();
  }

  @Get(':id')
  async getPostById(@Param('id', new ParseIntPipe()) postId: number) {
    return await this.postService.getPostById(postId);
  }

  @UseGuards(JwtAuthGuard)
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
    })
  )
  async createPost(
    @GetUser('id') userId: number,
    @Body() createPostData: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const filesData = files.map((file) => ({
      type: getMediaType(file.mimetype),
      url: `${this.configService.get<string>(
        'URL'
      )}:${this.configService.get<number>('PORT')}/uploads/${file.filename}`,
    }));
    return await this.postService.createPost(userId, createPostData, filesData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('files', 30, {
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
    })
  )
  async updatePost(
    @GetUser('id') userId: number,
    @Param('id', new ParseIntPipe()) postId: number,
    @Body() updatePostData: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const filesData = files.map((file) => ({
      type: getMediaType(file.mimetype),
      url: `${this.configService.get<string>(
        'URL'
      )}:${this.configService.get<number>('PORT')}/uploads/${file.filename}`,
    }));
    return await this.postService.updatePost(
      userId,
      postId,
      updatePostData,
      filesData
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@GetUser('id') userId: number, @Param('id') postId: number) {
    return await this.postService.deletePost(userId, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async likePost(@GetUser('id') userId: number, @Param('id') postId: number) {
    return await this.postService.likePost(userId, postId);
  }
}
