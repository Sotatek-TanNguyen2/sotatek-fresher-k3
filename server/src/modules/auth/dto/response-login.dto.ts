import { UserEntity } from './../../../models/entities/user.entity';

export class ResponseLogin extends UserEntity {
  accessToken: string;
  refreshToken: string;
}
