import { GameObject } from "../GameObject";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import { GameApplication } from '../../GameApplication';

import * as PIXI from 'pixi.js';



export class CrystalBehavior extends GameObjectBehavior {
    private velocity: number = 0;
    private isPlaying: boolean = false;
    private crystalRef: GameObject;
    private paddleRef: GameObject;


    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }
    public destroy(): void {
        EventDispatcher.getInstance().getDispatcher().removeListener(GameEvents.CRYSTAL_HIT, this.onCrystalHit, this);

    }
    protected init(): void {
        this.setInitialPosition();

        this.paddleRef = this.gameObjRef.getGameViewRef().getGameObjectById("paddle") as GameObject;


        EventDispatcher.getInstance().getDispatcher().addListener(GameEvents.CRYSTAL_HIT, this.onCrystalHit, this);
        // document.addEventListener("keyup", this.onKeyUp);
        // document.addEventListener("keydown", this.onKeyDown);



    }
    protected onCrystalHit(e: any) {

    }
    private setInitialPosition() {
        console.log(this.gameObjRef);
        this.gameObjRef.x = (GameApplication.STAGE_WIDTH * 0.5) - (this.gameObjRef.width * 0.5);
        this.gameObjRef.y = GameApplication.STAGE_HEIGHT * 0.9;
    }
    public update(deltaTime: number) {
        if (!this.isPlaying) {
           this.setInitialPosition;
        } else {
            this.move(deltaTime);
        }
    }
    private onKeyDown(e: any) {
        if (!this.gameObjRef.isActive() || this.isPlaying) {
            return;
        }

        if (e.code === "Space") {
            // this.angle = 180;
            this.velocity = 6;
            this.isPlaying = true;
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BALL_ACTIVE);
        }
    }

    private move(deltaTime: number) {

        this.gameObjRef.y += this.velocity * deltaTime;
    }
}