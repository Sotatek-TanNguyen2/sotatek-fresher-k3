import { MailService } from './../../mail/mail.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('mail')
export class EmailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('register')
  async registerEmail(job: Job) {
    await this.mailService.sendWelcomeMail(job.data.email);
  }
}
