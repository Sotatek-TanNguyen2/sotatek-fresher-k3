import { FriendService } from './friend.service';
import { GetUser } from './../../shares/decorators/get-user.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async getFriends(@Param('id', new ParseIntPipe()) userId: number) {
    return { data: await this.friendService.getAllFriend(userId) };
  }

  @UseGuards(JwtAuthGuard)
  @Post('request/:id')
  async friendRequest(
    @GetUser('id') userId: number,
    @Param('id', new ParseIntPipe()) followId: number
  ) {
    return { data: await this.friendService.friendRequest(userId, followId) };
  }

  @UseGuards(JwtAuthGuard)
  @Post('accept/:id')
  async acceptFriend(
    @GetUser('id') userId: number,
    @Param('id', new ParseIntPipe()) friendId: number
  ) {
    return {
      data: await this.friendService.acceptFriend(userId, friendId),
    };
  }
}
