import { Injectable, Logger } from '@nestjs/common';
import { AutoLoginQueue } from './auto-login.queue';

@Injectable()
export class AutoLoginService {
  private readonly logger = new Logger(AutoLoginService.name);
  constructor(private readonly autoLoginQueue: AutoLoginQueue) {}

  async addRepetablePingJob(cron: string): Promise<{ response: string }> {
    return this.autoLoginQueue.addRepetablePingJob(cron);
  }

  async removeRepetablePingJob(): Promise<{ response: string }> {
    return this.autoLoginQueue.removeRepetablePingJob();
  }
  async repetablePing(): Promise<string> {
    const response = `Repetable Ping, Date:- ${new Date()}`;
    this.logger.warn(response);
    return response;
  }
}
