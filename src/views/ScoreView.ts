import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { GameEvents } from '../GameEvents';
import { EventDispatcher } from '../EventDispatcher';
import { BrickType } from '../game/level/BrickType';

export class ScoreView extends BaseView {
    private label: PIXI.Text;
    private scoreText: PIXI.Text;


    constructor() {
        super();
    }

    public setScore(score: number) {
        this.scoreText.text = score.toString(10).padStart(3, '0');
    }

    protected init() {
        super.init();
        this.createScoreText();
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

    private createScoreText() {
        this.scoreText = new PIXI.Text('000', {
            fontFamily: 'Chakra Petch',
            fill: 0xffffff,
            fontSize: 40
        });
        this.scoreText.resolution = 2;
        this.scoreText.anchor.set(0.5);

        this.scoreText.x = this.background.width * 0.75;
        this.scoreText.y = this.background.height * 0.5;
        this.addChild(this.scoreText);

        this.label = new PIXI.Text('SCORE:', {
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