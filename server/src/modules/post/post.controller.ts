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
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../../shares/decorators/get-user.decorator';
import { PostEntity } from './../../models/entities/post.entity';
import { ResponseDto } from './../../shares/dtos/response.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPublicPosts(
    @Query('page', new ParseIntPipe()) page: number
  ): Promise<ResponseDto<PostEntity[]>> {
    return await this.postService.getAllPublicPosts(page);
  }

  @Get('user/:id')
  async getAllPostsOfUser(
    @Query('page', new ParseIntPipe()) page: number,
    @Param('id', new ParseIntPipe()) userId: number
  ): Promise<ResponseDto<PostEntity[]>> {
    return await this.postService.getAllPostsOfUser(page, userId);
  }

  @Get(':id')
  async getPostById(
    @Param('id', new ParseIntPipe()) postId: number
  ): Promise<ResponseDto<PostEntity>> {
    return { data: await this.postService.getPostById(postId) };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createPost(
    @GetUser('id') userId: number,
    @Body() createPostData: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<ResponseDto<PostEntity>> {
    return {
      data: await this.postService.createPost(userId, createPostData, files),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async updatePost(
    @GetUser('id') userId: number,
    @Param('id', new ParseIntPipe()) postId: number,
    @Body() updatePostData: UpdatePostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<ResponseDto<PostEntity>> {
    return {
      data: await this.postService.updatePost(
        userId,
        postId,
        updatePostData,
        files
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async softDeletePost(
    @GetUser('id') userId: number,
    @Param('id') postId: number
  ) {
    return { data: await this.postService.softDeletePost(userId, postId) };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async likePost(@GetUser('id') userId: number, @Param('id') postId: number) {
    return { data: await this.postService.likePost(userId, postId) };
  }
}
