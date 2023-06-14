import { Controller, UseFilters } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  GameMessage,
  IGameState,
  IGameValidationResult,
} from '@pawesome-care/game-types';
import { ExceptionFilter } from './app.filter';

@UseFilters(new ExceptionFilter())
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ msg: GameMessage.CREATE_GAME })
  createGame(): IGameState {
    return this.appService.createGame();
  }

  @EventPattern(GameMessage.UPDATE_GAME)
  async updateGame(@Payload() data: IGameState) {
    return this.appService.updateGame(data);
  }

  @MessagePattern({ msg: GameMessage.GET_GAME })
  getGame(@Payload() data: { id: number }): IGameState {
    return this.appService.getGame(data.id);
  }

  @MessagePattern({ msg: GameMessage.VALIDATE_GAME_STATE })
  validateGameState(@Payload() data: IGameState): IGameValidationResult {
    return this.appService.validateGameState(data);
  }
}
