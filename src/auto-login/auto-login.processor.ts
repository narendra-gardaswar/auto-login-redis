import { defaultWorkersConcurrency } from '@core/configs/bull.config';
import { ProcessorLogger } from '@core/helpers/processor.logging.helper';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { AutoLoginJob, AUTO_LOGIN_QUEUE } from './auto-login.queue';
import { AutoLoginService } from './auto-login.service';

@Processor(AUTO_LOGIN_QUEUE)
export class AutoLoginProcessor extends ProcessorLogger {
  readonly logger = new Logger(AutoLoginProcessor.name);
  constructor(private readonly autoLoginService: AutoLoginService) {
    super();
  }

  @Process({
    name: AutoLoginJob.REPETABLE_PING,
    concurrency: defaultWorkersConcurrency,
  })
  async handleRepetablePing(): Promise<string> {
    try {
      return this.autoLoginService.repetablePing();
    } catch (error) {
      this.logger.error(`${this.handleRepetablePing.name}:${error.stack}`);
      throw error;
    }
  }
}
