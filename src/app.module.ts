import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './shared/auth/auth.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { HttpBasicAuth } from '@core/middlewares/http-auth.middleware';
import { BullBoardMiddleware } from '@core/middlewares/bull-board.middleware';

@Module({
  imports: [CoreModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HttpBasicAuth, BullBoardMiddleware)
      .forRoutes('/admin/queue');
  }
}
