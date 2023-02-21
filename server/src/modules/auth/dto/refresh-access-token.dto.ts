import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
