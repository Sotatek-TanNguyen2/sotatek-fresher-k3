import { ConfigService } from '@nestjs/config';

export const redisConfig = {
  useFactory: (configService: ConfigService) => ({
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
  }),
  injects: [ConfigService],
};
