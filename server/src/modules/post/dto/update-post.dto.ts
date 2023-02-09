import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PostAccess } from './../../../shares/enums/post.enum';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(PostAccess)
  access: string;
}
