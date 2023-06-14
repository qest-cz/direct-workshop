import { Injectable } from '@nestjs/common';
import { IGameState, MAX_GRID_X, MAX_GRID_Y } from '@pawesome-care/game-types';

@Injectable()
export class AppService {
  getGrid(
    robotX: IGameState['x'],
    robotY: IGameState['y'],
    obstacles: IGameState['obstacles'],
    flag: IGameState['flag'],
    id: IGameState['id']
  ) {
    const gridWidth = MAX_GRID_X + 1;
    const gridHeight = MAX_GRID_Y + 1;

    let grid = `Game #${id} \n`;
    grid += '┌───┬───┬───┬───┬───┬───┬───┬───┐\n';

    for (let y = 0; y < gridHeight; y++) {
      grid += '│';
      for (let x = 0; x < gridWidth; x++) {
        if (x === robotX && y === robotY) {
          grid += ' 🤖';
        } else if (x === flag.x && y === flag.y) {
          grid += ' ⚑ ';
        } else if (obstacles[`${x},${y}`]) {
          grid += ' ⚡ ';
        } else {
          grid += '   ';
        }
        grid += '│';
      }
      grid += '\n';
      if (y < gridHeight - 1) {
        grid += '├───┼───┼───┼───┼───┼───┼───┼───┤\n';
      }
    }

    grid += '└───┴───┴───┴───┴───┴───┴───┴───┘\n';

    console.log(grid);
    return grid;
  }
}
