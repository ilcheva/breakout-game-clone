import * as PIXI from 'pixi.js';
import { GameView } from '../../views/GameView';
import { GameObject } from '../GameObject';
import { GameApplication } from '../../GameApplication';
import { BrickType } from './BrickType';
import { Model } from '../../Model';
import { BrickBehaviorLevelOne } from '../behavior/BrickBehaviorLevelOne';
import { BrickBehaviorLevelTwo } from '../behavior/BrickBehaviorLevelTwo';
import { BrickBehaviorLevelThree } from '../behavior/BrickBehaviorLevelThree';
import { BrickBehaviorLevelFour } from '../behavior/BrickBehaviorLevelFour';

export class LevelFactory extends PIXI.Container {

    private bricks: Array<GameObject>;
    private gameViewRef: GameView;
    private brickTop: number = 100;

    constructor(gameViewRef: GameView) {
        super();

        this.gameViewRef = gameViewRef;
        this.init();
    }

    public getNextLevel(level: number): Array<GameObject> {
        if (level === 1) {
            return this.getLevel(1);
        }

        if (level > 1) {
            return this.getLevel(level);
        }
    }

    private getLevel(difficulty: number): Array<GameObject> {
        let nbrBrickHorizontal: number;
        let nbrBrickVertical: number;
        let brickWidth: number;
        let brickHeight: number;

        this.bricks = [];

        if (difficulty <= 3) {
            nbrBrickHorizontal = 10;

            switch (difficulty) {
                case 1:
                    nbrBrickVertical = 3;
                    break;
                case 2:
                    nbrBrickVertical = 4;
                    break;
                default:
                    nbrBrickVertical = 5;
                    break;

            }
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.04);


            const rand: number = Math.random();
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const brickDifficulty = this.targetDifficulty(rand, difficulty);


                    const brick: GameObject = this.brickFactory(brickDifficulty, brickWidth, brickHeight);

                    const coord: PIXI.Point = this.getBrickPosition(j, i, brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;

                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty > 3 && difficulty <= 6) {
            nbrBrickHorizontal = 15;
            nbrBrickVertical = 5;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                const rand: number = Math.random();

                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const brickDifficulty = this.targetDifficulty(rand, difficulty);

                    const brick: GameObject = this.brickFactory(brickDifficulty, brickWidth, brickHeight);

                    const coord: PIXI.Point = this.getBrickPosition(j, i, brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;

                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty >= 7 && difficulty <= 15) {
            nbrBrickHorizontal = 15;
            nbrBrickVertical = 5;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    const brickDifficulty = this.targetDifficulty(rand, difficulty);

                    const brick: GameObject = this.brickFactory(brickDifficulty, brickWidth, brickHeight);

                    const coord: PIXI.Point = this.getBrickPosition(j, i, brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;

                    this.bricks.push(brick);

                }
            }
            return this.bricks;
        }

        return this.bricks;
    }
    private targetDifficulty(rand: number, difficulty: number): number {
        let targetDifficulty: number;
        if (difficulty <= 6) {

            if (rand <= 0.2) {
                targetDifficulty = 1;
            } else if (rand > 0.2 && rand <= 0.4) {
                targetDifficulty = 2;
            } else if (rand > 0.4 && rand <= 0.5) {
                targetDifficulty = 3;
            } else if (rand > 0.5 && rand <= 0.6) {
                targetDifficulty = 4;
            } else if (rand > 0.6 && rand <= 0.7) {
                targetDifficulty = 5;
            } else if (rand > 0.7) {
                targetDifficulty = 6;
            }

            return targetDifficulty;
        } else if (difficulty > 6) {

            if (rand <= 0.2) {
                targetDifficulty = 6;
            } else if (rand > 0.2 && rand <= 0.3) {
                targetDifficulty = 7;
            } else if (rand > 0.3 && rand <= 0.4) {
                targetDifficulty = 8;
            } else if (rand > 0.4 && rand <= 0.5) {
                targetDifficulty = 9;
            } else if (rand > 0.5 && rand <= 0.6) {
                targetDifficulty = 10;
            } else if (rand > 0.6 && rand <= 0.7) {
                targetDifficulty = 11;
            } else if (rand > 0.7 && rand <= 0.8) {
                targetDifficulty = 12;
            } else if (rand > 0.8) {
                targetDifficulty = 13;
            }

            return targetDifficulty;
        }
    }

    private getBrickPosition(x: number, y: number, width: number, height: number): PIXI.Point {
        const coord: PIXI.Point = new PIXI.Point();
        const startPos: number = 1;

        coord.x = x === 0 ? (x * width) + startPos : x * width;
        coord.y = (y * height) + this.brickTop;
        return coord;
    }

    private init() {
        this.bricks = [];
    }
    private createSprite(texture: PIXI.Texture, width: number, height: number): PIXI.Sprite {
        const sprite = new PIXI.Sprite(texture);
        sprite.width = width;
        sprite.height = height;
        sprite.cacheAsBitmap = true;
        return sprite;
    }
    private brickFactory(difficulty: number, width: number, height: number): GameObject {
        const brick: GameObject = new GameObject(this.gameViewRef);
        const bricks = GameApplication.getApp().getLoader().resources.bricks.textures;

        switch (difficulty) {
            case 1:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b3'], width, height));

                    const brickBehaviorLevelOne: BrickBehaviorLevelOne = new BrickBehaviorLevelOne(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelOne);
                }
                break;
            case 2:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b15'], width, height));
                    const brickBehaviorLevelOne: BrickBehaviorLevelOne = new BrickBehaviorLevelOne(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelOne);
                }
                break;
            case 3:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b7'], width, height));
                    const brickBehaviorLevelOne: BrickBehaviorLevelOne = new BrickBehaviorLevelOne(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelOne);
                }
                break;
            case 4:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b11'], width, height));
                    const brickBehaviorLevelOne: BrickBehaviorLevelOne = new BrickBehaviorLevelOne(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelOne);

                }
                break;
            case 5:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b10'], width, height));

                    const brickBehaviorLevelOne: BrickBehaviorLevelOne = new BrickBehaviorLevelOne(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelOne);

                }
                break;
            case 6:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b14'], width, height));

                    const brickBehaviorLevelOne: BrickBehaviorLevelOne = new BrickBehaviorLevelOne(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelOne);

                }
                break;
            case 7:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b8'], width, height));

                    const brickBehaviorLevelTwo: BrickBehaviorLevelTwo = new BrickBehaviorLevelTwo(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelTwo);
                }
                break;
            case 8:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b9'], width, height));

                    const brickBehaviorLevelFour: BrickBehaviorLevelFour = new BrickBehaviorLevelFour(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelFour);

                }
                break;
            case 9:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b6'], width, height));

                    const brickBehaviorLevelFour: BrickBehaviorLevelFour = new BrickBehaviorLevelFour(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelFour);

                }
                break;
            case 10:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b12'], width, height));

                    const brickBehaviorLevelFour: BrickBehaviorLevelFour = new BrickBehaviorLevelFour(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelFour);

                }
                break;
            case 11:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b4'], width, height));

                    const brickBehaviorLevelFour: BrickBehaviorLevelFour = new BrickBehaviorLevelFour(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelFour);

                }
                break;
            case 12:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b1'], width, height));

                    const brickBehaviorLevelFour: BrickBehaviorLevelFour = new BrickBehaviorLevelFour(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelFour);

                }
                break;

            case 13:
                {
                    brick.registerRenderable('brickImg', this.createSprite(bricks['b13'], width, height));

                    const brickBehaviorLevelThree: BrickBehaviorLevelThree = new BrickBehaviorLevelThree(brick);
                    brick.registerBehavior('brickBehavior', brickBehaviorLevelThree);

                }
                break;
        }

        return brick;
    }
}