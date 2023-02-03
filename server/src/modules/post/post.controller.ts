import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from './../../shares/decorator/get-user.decorator';
import { PostService } from './post.service';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('post')
export class PostController {
  constructor(
    private readonly configService: ConfigService,
    private readonly postService: PostService
  ) {}

  @Get()
  async getAllPublicPosts() {
    return await this.postService.getAllPublicPosts();
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
    const filePaths = files.map(
      (file) =>
        `${this.configService.get<string>(
          'APP_URL'
        )}:${this.configService.get<number>('APP_PORT')}/uploads/${
          file.filename
        }`
    );
    return await this.postService.createPost(userId, createPostData, filePaths);
  }

  @UseGuards(JwtAuthGuard)
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
    })
  )
  async updatePost(
    @GetUser('id') userId: number,
    @Param('id', new ParseIntPipe()) postId: number,
    @Body() updatePostData: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const filePaths = files.map(
      (file) =>
        `${this.configService.get<string>(
          'APP_URL'
        )}:${this.configService.get<number>('APP_PORT')}/uploads/${
          file.filename
        }`
    );
    return await this.postService.updatePost(
      userId,
      postId,
      updatePostData,
      filePaths
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@GetUser('id') userId: number, @Param('id') postId: number) {
    return await this.postService.deletePost(userId, postId);
  }
}
