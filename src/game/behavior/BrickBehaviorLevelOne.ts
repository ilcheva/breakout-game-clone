import { GameObjectBehavior } from './GameObjectBehavior';
import { GameObject } from '../GameObject';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import { BrickType } from '../level/BrickType';
import { BaseBrickBehavior } from './BaseBrickBehavior';


export class BrickBehaviorLevelOne extends BaseBrickBehavior {

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    protected onBrickHit(e: any) {
        if (e.brickId === this.gameObjRef.getId()) {

            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, { brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_1 });
        }
    }
}