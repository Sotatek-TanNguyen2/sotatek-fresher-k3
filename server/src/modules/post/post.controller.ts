import { IsOptional } from 'class-validator';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadConfig } from '../../config/file-upload.config';
import { PostEntity } from './../../models/entities/post.entity';
import { GetUser } from '../../shares/decorators/get-user.decorator';
import { ResponseDto } from './../../shares/dtos/response.dto';
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
  async getAllPublicPosts(
    @Query('page', new ParseIntPipe()) page: number
  ): Promise<ResponseDto<PostEntity[]>> {
    return await this.postService.getAllPublicPosts(+page);
  }

  @Get(':id')
  async getPostById(
    @Param('id', new ParseIntPipe()) postId: number
  ): Promise<ResponseDto<PostEntity>> {
    return { data: await this.postService.getPostById(postId) };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 30, FileUploadConfig))
  async createPost(
    @GetUser('id') userId: number,
    @Body() createPostData: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<ResponseDto<PostEntity>> {
    const filesData = files.map((file) => ({
      type: getMediaType(file.mimetype),
      url: `${this.configService.get<string>(
        'URL'
      )}:${this.configService.get<number>('PORT')}/uploads/${file.filename}`,
    }));
    return {
      data: await this.postService.createPost(
        userId,
        createPostData,
        filesData
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('files', 30, FileUploadConfig))
  async updatePost(
    @GetUser('id') userId: number,
    @Param('id', new ParseIntPipe()) postId: number,
    @Body() updatePostData: UpdatePostDto,
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
  async softDeletePost(
    @GetUser('id') userId: number,
    @Param('id') postId: number
  ) {
    return await this.postService.softDeletePost(userId, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async likePost(@GetUser('id') userId: number, @Param('id') postId: number) {
    return await this.postService.likePost(userId, postId);
  }
}
