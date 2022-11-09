import { GameController } from "../GameController";

export interface IGameState {
    winState(): void;

    gameStart(): void;

    gameLost(): void;

    gameEnter(): void;
    // winState(): void;
}