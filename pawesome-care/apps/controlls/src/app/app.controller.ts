import { Controller, Get, Inject, NotFoundException } from '@nestjs/common';
import {
  GameMessage,
  GridMessage,
  IGameState,
} from '@pawesome-care/game-types';
import { RedisClientService } from '@pawesome-care/redis-client';

@Controller('game')
export class AppController {
  constructor(
    @Inject(RedisClientService) private redisClientService: RedisClientService
  ) {}

  @Get('start')
  async startGame() {
    const gameState = await this.redisClientService.send<IGameState>(
      { msg: GameMessage.CREATE_GAME },
      ''
    );

    if (!gameState) throw new NotFoundException(`Game not found`);

    return await this.redisClientService.send(
      { msg: GridMessage.GET_GRID },
      gameState
    );
  }

  // HINT: Implement route GET /:id/:direction to move the player
}
