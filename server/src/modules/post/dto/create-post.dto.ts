import { PostAccess } from './../../../shares/enums/post.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(PostAccess)
  access: string;
}
