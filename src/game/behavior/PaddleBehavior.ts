import { GameObject } from '../GameObject';
import { GameObjectBehavior } from './GameObjectBehavior';
import * as PIXI from "pixi.js";
import { GameApplication } from '../../GameApplication';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import { BrickType } from '../level/BrickType';


export class PaddleBehavior extends GameObjectBehavior {

    private VELOCITY: number = 15;
    private direction: number = 0;
    private paddle: PIXI.Sprite;
    private originalWidth: number;



    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public update(deltaTime: number) {
        if (this.direction === 1) {
            this.moveRight(deltaTime);
            return;
        }

        if (this.direction === -1) {
            this.moveLeft(deltaTime);
            return;
        }
    }

    protected init() {
        this.setInitialPosition();
        this.paddle = this.gameObjRef.getRenderableById('paddleImg') as PIXI.Sprite;
        this.originalWidth = this.paddle.width;

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.NEXT_LEVEL, this.setInitialPosition, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_SPEEDUP, this.onBallSpeedUp, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_RESET, this.onBallReset, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_LOST, this.onBallReset, this);


    }

    private setInitialPosition() {
        this.gameObjRef.x = (GameApplication.STAGE_WIDTH * 0.5) - (this.gameObjRef.width * 0.5);
        this.gameObjRef.y = GameApplication.STAGE_HEIGHT * 0.8;
    }

    private onKeyUp(e: any) {
        switch (e.code) {
            case "ArrowRight":
                if (this.direction === 1) {
                    this.direction = 0;
                }
                break;
            case "ArrowLeft":
                if (this.direction === -1) {
                    this.direction = 0;
                }
                break;
        }
    }

    private onKeyDown(e: any) {
        if (this.direction !== 0) {
            return;
        }

        switch (e.code) {
            case "ArrowRight":
                this.direction = 1;
                break;
            case "ArrowLeft":
                this.direction = -1;
                break;
        }
    }

    private moveLeft(deltaTime: number) {
        if (!this.gameObjRef.isActive()) {
            return;
        }

        if (this.gameObjRef.x - this.VELOCITY > 0) {
            this.gameObjRef.x -= this.VELOCITY * deltaTime;
        } else {
            this.gameObjRef.x = 0;
        }
    }

    private moveRight(deltaTime: number) {
        if (!this.gameObjRef.isActive()) {
            return;
        }

        if (this.gameObjRef.x + this.gameObjRef.width + this.VELOCITY < GameApplication.STAGE_WIDTH) {
            this.gameObjRef.x += this.VELOCITY * deltaTime;
        } else {
            this.gameObjRef.x = GameApplication.STAGE_WIDTH - this.gameObjRef.width;
        }
    }
    private onBallSpeedUp() {
        this.paddle.width *= 1.2;
    }
    private onBallReset() {
        
        this.paddle.width = this.originalWidth;


    }
}