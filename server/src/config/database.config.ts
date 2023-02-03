import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('MYSQL_HOST'),
    port: +configService.get('MYSQL_PORT'),
    username: configService.get('MYSQL_USERNAME'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DATABASE'),
    entities: [__dirname + '/../models/entities/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  inject: [ConfigService],
};
