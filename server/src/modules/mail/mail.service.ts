import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to my social app',
      template: './welcome',
      context: {
        name: email,
      },
    });
  }
}
