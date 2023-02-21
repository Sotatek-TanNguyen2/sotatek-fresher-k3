import { MailerModule } from '@nest-modules/mailer';
import { mailConfig } from './../../config/mail.config';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(mailConfig)],
  providers: [MailService],
  controllers: [],
  exports: [MailService],
})
export class MailModule {}
