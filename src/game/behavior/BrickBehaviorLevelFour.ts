import { BaseBrickBehavior } from './BaseBrickBehavior';
import { GameObject } from '../GameObject';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import { BrickType } from '../level/BrickType';
import { GameApplication } from '../../GameApplication';
import * as PIXI from 'pixi.js';





export class BrickBehaviorLevelFour extends BaseBrickBehavior {

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    protected onBrickHit(e: any) {
        if (e.brickId === this.gameObjRef.getId()) {
            
            // const texture = GameApplication.getApp().getLoader().resources.crystals.textures;
            // const sprite = new PIXI.Sprite(texture['c1']);
            // sprite.width = 20;
            // sprite.height = 20;
            // this.gameObjRef.registerRenderable('crystal', sprite);


            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, { brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_4 });
        }
    }

}