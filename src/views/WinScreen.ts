import * as PIXI from "pixi.js";
import { BaseView } from './BaseView';
import { GameApplication } from '../GameApplication';

export class WinScreen extends BaseView {
    private title: PIXI.Text;
    private score: PIXI.Text;
    private scoreText: PIXI.Text;


    constructor() {
        super();
    }
    protected init() {
        super.init();
        this.createText();

    }
    public setScore(score: number) {
        this.scoreText.text = score.toString(10).padStart(3, '0');
    }
    protected createBackground() {


        this.background = new PIXI.Graphics();
        this.background.lineStyle({ width: 2, color: 0xffffff });
        this.background.beginFill(0x0000000);
        this.background.drawRect(0, 0, GameApplication.STAGE_WIDTH, GameApplication.STAGE_HEIGHT);
        this.background.endFill();
        this.background.cacheAsBitmap = true;
        this.addChild(this.background);
    }
    private createText() {
        this.title = new PIXI.Text('YOU WON', {
            fontFamily: 'Chakra Petch',
            fill: 0xffffff,
            fontSize: 40
        });
        this.title.resolution = 2;

        this.title.anchor.set(0.5);
        this.title.x = this.background.width * 0.5;
        this.title.y = 200;
        this.addChild(this.title);

        this.score = new PIXI.Text('SCORE:', {
            fontFamily: 'Chakra Petch',
            fill: 0xffffff,
            fontSize: 40
        });
        this.score.resolution = 2;
        this.score.anchor.set(0.5);
        this.score.x = this.background.width * 0.4;
        this.score.y = this.title.y + 60;
        this.addChild(this.score);

        this.scoreText = new PIXI.Text('000', {
            fontFamily: 'Chakra Petch',
            fill: 0xffffff,
            fontSize: 40
        });
        this.scoreText.resolution = 2;
        this.scoreText.anchor.set(0.5);

        this.scoreText.x = this.background.width * 0.6;
        this.scoreText.y = this.title.y + 60;
        this.addChild(this.scoreText);
    }
}