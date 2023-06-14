import { Injectable, Logger } from '@nestjs/common';
import { TState } from './app.interface';
import { RedisClientService } from '@pawesome-care/redis-client';
import {
  GameMessage,
  IGameState,
  IGameValidationResult,
  MAX_GRID_X,
  MAX_GRID_Y,
  MIN_GRID_X,
  MIN_GRID_Y,
} from '@pawesome-care/game-types';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private gameState: TState = {};

  constructor(private readonly redisClientService: RedisClientService) {}

  createGame(): IGameState {
    const id = Math.floor(Math.random() * 1000);
    const x = MIN_GRID_X;
    const y = MIN_GRID_Y;

    const randomObstaclesCount = 3 + Math.floor(Math.random() * 5);
    const obstacles: IGameState['obstacles'] = {};
    for (let i = 0; i < randomObstaclesCount; i++) {
      const x = Math.floor(Math.random() * MAX_GRID_X);
      const y = Math.floor(Math.random() * MAX_GRID_Y);
      obstacles[`${x},${y}`] = { x, y };
    }

    const flagX = MAX_GRID_X - 1; // Math.floor(Math.random() * MAX_GRID_X);
    const flagY = MAX_GRID_Y - 2; // Math.floor(Math.random() * MAX_GRID_Y);
    const flag = { x: flagX, y: flagY };

    this.gameState[id] = { id, x, y, obstacles, flag, success: false };

    Logger.log(`Game created with id ${id}`);

    return this.gameState[id];
  }

  async updateGame(data: IGameState) {
    if (!this.gameState[data.id])
      throw new RpcException(`Game with id ${data.id} not found`);

    const validationResult = await this.validateGameState(data);

    if (!validationResult.valid) {
      Logger.log(
        `Game #${data.id} update failed. ${validationResult.message}}`
      );
      return await this.redisClientService.emit(
        GameMessage.VALIDATION_FAILED,
        validationResult
      );
    }

    this.gameState[data.id] = { ...data, success: validationResult.success };

    Logger.log(
      `Game #${data.id} ${validationResult.success ? 'won! 🥳' : 'updated.'}`
    );

    await this.redisClientService.emit(GameMessage.GAME_SAVED, data);
  }

  getGame(id: number): IGameState {
    if (!this.gameState[id])
      throw new RpcException(`Game with id ${id} not found`);

    return this.gameState[id];
  }

  validateGameState(data: IGameState): IGameValidationResult {
    const game = this.getGame(data.id);

    if (!game) {
      return { valid: false, success: false, message: 'Game not found' };
    }

    // Check if the player is on the flag
    if ((data.x === game.flag.x && data.y === game.flag.y) || game.success) {
      return {
        valid: true,
        success: true,
        message: 'Player reached the flag!! 🥳',
      };
    }

    // Check if the player is out of bounds
    if (
      data.x < MIN_GRID_X ||
      data.x > MAX_GRID_X ||
      data.y < MIN_GRID_X ||
      data.y > MAX_GRID_X
    ) {
      return {
        valid: false,
        success: false,
        message: 'Player is out of bounds',
      };
    }

    // Check if the player is on an obstacle
    const obstacle = game.obstacles[`${data.x},${data.y}`];
    if (obstacle) {
      return {
        valid: false,
        success: false,
        message: 'Player is on an obstacle',
      };
    }

    return { valid: true, success: false, message: 'Player is on a safe tile' };
  }
}
