import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/models/entities/**/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  logger: 'file',
};

module.exports = config;
