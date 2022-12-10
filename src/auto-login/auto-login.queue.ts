import { defaultJobOptions } from '@core/configs/bull.config';
import { BullModule, BullModuleOptions, InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import Bull, { Queue } from 'bull';

export const AUTO_LOGIN_QUEUE = 'auto-login';
export const autoLoginQueueConfig: BullModuleOptions = {
  name: AUTO_LOGIN_QUEUE,
  defaultJobOptions: defaultJobOptions,
};
export enum AutoLoginJob {
  REPETABLE_PING = '[AUTO-LOGIN] REPETABLE PING',
}

export const registerAutoLoginQueue =
  BullModule.registerQueueAsync(autoLoginQueueConfig);

@Injectable()
export class AutoLoginQueue {
  constructor(
    @InjectQueue(AUTO_LOGIN_QUEUE)
    private readonly autoLoginQueue: Queue,
  ) {}

  async addRepetablePingJob(cron: string): Promise<{ response: string }> {
    const otps: Bull.JobOptions = {
      repeat: {
        cron: cron,
      },
    };
    const { name, id } = await this.autoLoginQueue.add(
      AutoLoginJob.REPETABLE_PING,
      null,
      otps,
    );
    if (!id) {
      throw new BadRequestException(`Failed to add Job`);
    }
    return { response: `${name}, Added Successfully` };
  }

  async removeRepetablePingJob(): Promise<{ response: string }> {
    const jobs = await this.autoLoginQueue.getRepeatableJobs();
    if (!jobs.length) {
      return { response: 'No Repeatable jobs to remove' };
    }
    const job = jobs.find(($job) => AutoLoginJob.REPETABLE_PING === $job.name);
    if (!job) {
      return { response: 'Job not Found' };
    }
    await this.autoLoginQueue.removeRepeatableByKey(job.key);
    return { response: `${job.name}, Removed Successfully` };
  }
}
