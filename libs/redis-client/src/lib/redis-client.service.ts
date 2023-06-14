import { GatewayTimeoutException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { throwError, timeout } from 'rxjs';
import { REDIS_CLIENT } from './redis-client.interface';

@Injectable()
export class RedisClientService {
  private readonly TIMEOUT = 3000;

  constructor(@Inject(REDIS_CLIENT) private readonly client: ClientProxy) {}

  async send<Result, Body = unknown>(
    pattern: string | { msg: string },
    body: Body
  ): Promise<Result> {
    return new Promise((resolve, reject) => {
      this.client
        .send(pattern, body)
        .pipe(
          timeout({
            each: this.TIMEOUT,
            with: (e) => throwError(() => new GatewayTimeoutException(e)),
          })
        )
        .subscribe({
          next: resolve,
          error: reject,
        });
    });
  }

  async emit<Result, Body>(
    pattern: string | { msg: string },
    body: Body
  ): Promise<Result> {
    return new Promise((resolve, reject) => {
      this.client
        .emit(pattern, body)
        .pipe(
          timeout({
            each: this.TIMEOUT,
            with: (e) => throwError(() => new GatewayTimeoutException(e)),
          })
        )
        .subscribe({
          next: resolve,
          error: reject,
        });
    });
  }
}
