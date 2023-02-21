import { HandlebarsAdapter } from '@nest-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const mailConfig = {
  useFactory: (configService: ConfigService) => ({
    transport: {
      host: configService.get<string>('MAIL_HOST'),
      secure: configService.get<boolean>('MAIL_SECURE'),
      auth: {
        user: configService.get<string>('MAIL_USER'),
        pass: configService.get<string>('MAIL_PASSWORD'),
      },
    },
    defaults: {
      from: `No Reply <${configService.get<string>('MAIL_FROM')}>`,
    },
    template: {
      dir: join(__dirname + '/../shares/templates/email'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService],
};
