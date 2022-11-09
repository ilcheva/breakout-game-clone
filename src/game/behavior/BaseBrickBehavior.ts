import { GameObject } from "../GameObject";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';



export class BaseBrickBehavior extends GameObjectBehavior {
    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }
    public destroy(): void {
        EventDispatcher.getInstance().getDispatcher().removeListener(GameEvents.BRICK_HIT, this.onBrickHit, this);

    }
    protected init(): void {
        EventDispatcher.getInstance().getDispatcher().addListener(GameEvents.BRICK_HIT, this.onBrickHit, this);

    }
    protected onBrickHit(e: any) {
    }
}