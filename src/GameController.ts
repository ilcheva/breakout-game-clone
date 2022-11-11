import * as PIXI from "pixi.js";
import { EventDispatcher } from "./EventDispatcher";
import { GameView } from "./views/GameView";
import { GameEvents } from "./GameEvents";
import { StartScreen } from "./views/StartScreen";
import { IGameState } from "./states/IGameState";
import { EnterState } from "./states/EnterState";
import { ScoreView } from "./views/ScoreView";
import { NbrBallView } from "./views/NbrBallView";
import { Model } from "./Model";
import { BrickType } from "./game/level/BrickType";
import { EndScreen } from "./views/EndScreen";
import { LevelScreen } from "./views/LevelScreen";
import { LostState } from "./states/LostState";
import { WinState } from "./states/WinState";
import { WinScreen } from "./views/WinScreen";

import { GameApplication } from "./GameApplication";



export class GameController extends PIXI.Container {
  private endScreen: EndScreen;
  private startScreen: StartScreen;
  private game: GameView;
  private scoreView: ScoreView;
  private nbrBallView: NbrBallView;
  private currentState: IGameState;
  private gameContainer: PIXI.Container;
  private uiContainer: PIXI.Container;
  private levelScreen: LevelScreen;
  private winScreen: WinScreen;


  constructor() {
    super();
    this.init();
  }

  public changeGameState(newState: IGameState) {
    this.currentState = newState;
  }

  public showStartScreen() {
    this.startScreen.show();
  }

  public hideStartScreen() {
    this.startScreen.hide();
  }

  public showEndScreen() {
    this.endScreen.show();
  }

  public hideEndScreen() {
    this.endScreen.hide();
  }
  public showLevelScreen() {
    this.levelScreen.show();

  }
  public hideLevelScreen() {
    this.levelScreen.hide();
  }
  public showWinScreen() {
    this.winScreen.show();

  }
  public hideWinScreen() {
    this.winScreen.hide();
  }


  public showGame() {
    this.game.show();
    EventDispatcher.getInstance()
      .getDispatcher()
      .emit(GameEvents.NEXT_LEVEL, { level: Model.getInstance().getCurrentLevel() });
  }

  public showScore() {
    this.scoreView.show();
  }

  public hideScore() {
    this.scoreView.hide();
  }

  public showNbrBall() {
    this.nbrBallView.show();
  }

  public hideNbrBall() {
    this.nbrBallView.hide();
  }

  public hideGame() {
    this.game.hide();
  }

  private init() {

    this.createContainers();
    this.createViews();
    this.resetGame();
    this.setInitialGameState();
    this.addKeyUpListener();

    EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_LOST, this.onBallLost, this);
    
    EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIDE, this.checkEndOfLevel, this);
    EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIDE, this.updateScore, this);
    




  }

  private addKeyUpListener() {
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
  }

  private setInitialGameState() {
    this.changeGameState(new EnterState(this));
    this.currentState.gameEnter();
  }


  private createContainers() {
    this.uiContainer = new PIXI.Container();
    this.gameContainer = new PIXI.Container();

    this.addChild(this.uiContainer);
    this.addChild(this.gameContainer);
  }

  private createViews() {
    this.game = new GameView();
    this.addChild(this.game);

    this.scoreView = new ScoreView();
    this.scoreView.x = GameApplication.STAGE_WIDTH * 0.65;
    this.scoreView.y = GameApplication.STAGE_HEIGHT * 0.9;
    this.addChild(this.scoreView);

    this.nbrBallView = new NbrBallView();
    this.nbrBallView.x = GameApplication.STAGE_WIDTH * 0.05;
    this.nbrBallView.y = GameApplication.STAGE_HEIGHT * 0.9;
    this.addChild(this.nbrBallView);


    this.startScreen = new StartScreen();
    this.addChild(this.startScreen);

    this.endScreen = new EndScreen();
    this.addChild(this.endScreen);

    this.winScreen = new WinScreen();
    this.addChild(this.winScreen);

    this.levelScreen = new LevelScreen();
    this.addChild(this.levelScreen);
  }

  private resetGame() {
    Model.getInstance().resetGame();
    this.scoreView.setScore(Model.getInstance().getScore());
    this.nbrBallView.setNbrBall(Model.getInstance().getTotalNbrBall());

  }

  private updateScore(e: any) {
    switch (e.brickType) {
      case BrickType.TYPE_1:
        Model.getInstance().addScore(1);
        break;
      case BrickType.TYPE_2:
        Model.getInstance().addScore(3);
        break;
      case BrickType.TYPE_3:
        Model.getInstance().addScore(5);
        break;
    }

    this.scoreView.setScore(Model.getInstance().getScore());
  }

  private checkEndOfLevel() {
    Model.getInstance().decrementTotalNbrBrick();

    if (Model.getInstance().getTotalNbrBrick() <= 0) {
      Model.getInstance().incrementLevel();
      Model.getInstance().incrementNbrBall();
      this.nbrBallView.setNbrBall(Model.getInstance().getTotalNbrBall());
      this.levelScreen.setLevel(Model.getInstance().getCurrentLevel());

      if (Model.getInstance().getCurrentLevel() >= 15) {
        this.winScreen.setScore(Model.getInstance().getScore());
        this.winScreen.show();
        this.resetGame();
       
        this.currentState.winState();
      } else {

        this.levelScreen.show();
        setTimeout(() => {
          this.levelScreen.hide();
          EventDispatcher.getInstance()
            .getDispatcher()
            .emit(GameEvents.NEXT_LEVEL, {
              level: Model.getInstance().getCurrentLevel(),
              score: Model.getInstance().getScore()
            });


        }, 1000);
      }
    }

  }

  private onKeyUp() {
    if (
      this.currentState instanceof EnterState ||
      this.currentState instanceof LostState ||
      this.currentState instanceof WinState

    ) {
      this.currentState.gameStart();
      EventDispatcher.getInstance().getDispatcher().emit(GameEvents.GAME_START);
    }
  }
 
  private onBallLost() {
    Model.getInstance().decrementNbrBall();
    if (Model.getInstance().getTotalNbrBall() <= 0) {
      this.resetGame();
      this.currentState.gameLost();

    }
    this.nbrBallView.setNbrBall(Model.getInstance().getTotalNbrBall());
  }
}
