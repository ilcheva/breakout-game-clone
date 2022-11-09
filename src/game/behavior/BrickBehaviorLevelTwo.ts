import { GameObjectBehavior } from './GameObjectBehavior';
import { GameObject } from '../GameObject';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import { BrickType } from '../level/BrickType';
import * as PIXI from 'pixi.js';
import { BaseBrickBehavior } from './BaseBrickBehavior';
import { GameApplication } from '../../GameApplication';

export class BrickBehaviorLevelTwo extends BaseBrickBehavior {
    private hitCounter: number = 0;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);

    }
    

    protected onBrickHit(e: any) {

        if (e.brickId === this.gameObjRef.getId()) {
            this.hitCounter++;


            const rendable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;


            if (this.hitCounter === 1) {
                console.log(e.brickId, 'brickId');
                this.gameObjRef.unregisterRenderable(e.brickId);
                console.log(this.gameObjRef, 'gameref id');


                const bricks = GameApplication.getApp().getLoader().resources.bricks.textures;
                const sprite = new PIXI.Sprite(bricks['b2']);
                sprite.width = this.gameObjRef.width;
                sprite.height = this.gameObjRef.height;
                sprite.cacheAsBitmap = true;
                this.gameObjRef.registerRenderable(e.brickId, sprite);

            } else if (this.hitCounter === 2) {
                console.log(e.brickId, 'brickId');
                this.gameObjRef.unregisterRenderable(e.brickId);
                console.log(this.gameObjRef, 'gameref id');


                const bricks = GameApplication.getApp().getLoader().resources.bricks.textures;
                const sprite = new PIXI.Sprite(bricks['b5']);
                sprite.width = this.gameObjRef.width;
                sprite.height = this.gameObjRef.height;
                sprite.cacheAsBitmap = true;
                this.gameObjRef.registerRenderable(e.brickId, sprite);
            } else if (this.hitCounter >= 3) {
                EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, { brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_2 });
            }


        }
    }
}