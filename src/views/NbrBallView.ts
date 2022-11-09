import * as PIXI from 'pixi.js';
import { BaseView } from './BaseView';
import { GameApplication } from '../GameApplication';
import { EventDispatcher } from '../EventDispatcher';
import { GameEvents } from '../GameEvents';
import { BrickType } from '../game/level/BrickType';

export class NbrBallView extends BaseView {

    private label: PIXI.Text;
    private nbrBallText: PIXI.Text;


    constructor() {
        super();
    }

    public setNbrBall(ball: number) {
        this.nbrBallText.text = ball.toString(10).padStart(2, '0');

    }

    protected init() {
        super.init();
        this.createBallText();

    }
    protected createBackground() {
        this.background = new PIXI.Graphics();
        this.background.lineStyle({ width: 2, color: 0xffffff });
        this.background.beginFill(0x0000000);
        this.background.drawRoundedRect(0, 0, 250, 50, 10);
        this.background.endFill();
        this.background.cacheAsBitmap = true;
        this.addChild(this.background);

    }

    private createBallText() {
        this.nbrBallText = new PIXI.Text('', {
            fontFamily: 'Chakra Petch',
            fill: 0xffffff,
            fontSize: 40
        });
        this.nbrBallText.resolution = 2;
        this.nbrBallText.anchor.set(0.5);

        this.nbrBallText.x = this.background.width * 0.7;
        this.nbrBallText.y = this.background.height * 0.5;
        this.addChild(this.nbrBallText);

        this.label = new PIXI.Text('BALL:', {
            fontFamily: 'Chakra Petch',
            fill: 0xffffff,
            fontSize: 30
        });

        this.label.resolution = 2;

        this.label.anchor.set(0.5);
        this.label.x = this.background.width * 0.3;
        this.label.y = this.background.height * 0.5;


        this.addChild(this.label);
    }
}