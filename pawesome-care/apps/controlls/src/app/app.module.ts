import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisClientModule } from '@pawesome-care/redis-client';

@Module({
  imports: [
    // HINT: Uncomment the line below to inject the RedisClientModule
    RedisClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
