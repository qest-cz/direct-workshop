export enum GameMessage {
  CREATE_GAME = 'CREATE_GAME',
  GET_GAME = 'GET_GAME',
  UPDATE_GAME = 'UPDATE_GAME',
  VALIDATE_GAME_STATE = 'VALIDATE_GAME_STATE',
  GAME_SAVED = 'GAME_SAVED',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
}

export type CoordinatesString = `${number},${number}`;

export interface IGameState {
  id: number;
  x: number;
  y: number;
  obstacles: Record<CoordinatesString, { x: number; y: number }>;
  flag: { x: number; y: number };
  success: boolean;
}

export interface IGameValidationResult {
  valid: boolean;
  success: boolean;
  message: string;
}
