import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { GridMessage, IGameState } from '@pawesome-care/game-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ msg: GridMessage.GET_GRID })
  getGrid(@Payload() data: IGameState) {
    return this.appService.getGrid(
      data.x,
      data.y,
      data.obstacles,
      data.flag,
      data.id
    );
  }
}
