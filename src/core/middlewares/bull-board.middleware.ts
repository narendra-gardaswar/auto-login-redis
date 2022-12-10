import { Injectable, NestMiddleware } from '@nestjs/common';

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

import { Queue } from 'bull';

@Injectable()
export class BullBoardMiddleware implements NestMiddleware {
  private queues: Queue[] = [];
  serverAdapter = new ExpressAdapter();
  constructor() {
    this.queues = [];
    createBullBoard({
      queues: this.queues.map(
        (queue) => new BullAdapter(queue, { allowRetries: true }),
      ),
      serverAdapter: this.serverAdapter,
    });
    this.serverAdapter.setBasePath('/admin/queue');
  }
  use(req: Request, res: Response): unknown {
    return this.serverAdapter.getRouter()(req, res);
  }
}
