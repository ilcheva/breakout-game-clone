import * as PIXI from 'pixi.js';
import { GameApplication } from "../GameApplication";
import { BaseView } from './BaseView';

export class LevelScreen extends BaseView {
    private label: PIXI.Text;
    private levelText: PIXI.Text;
    constructor() {
        super();
    }

    public setLevel(level: number) {
        this.levelText.text = level.toString(10).padStart(2, '0');       
        
    }
    protected init() {
        super.init();
        this.createLevelText();
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
    private createLevelText() {
        this.levelText = new PIXI.Text('', {
            fontFamily: 'Chakra Petch',
            fill: 0xffffff,
            fontSize: 40
        });
        this.levelText.resolution = 2;
        this.levelText.anchor.set(0.5);

        this.levelText.x = this.background.width * 0.6;
        this.levelText.y = 200;
        this.addChild(this.levelText);

        this.label = new PIXI.Text('LEVEL:', {
            fontFamily: 'Chakra Petch',
            fill: 0xffffff,
            fontSize: 40
        });
        this.label.resolution = 2;

        this.label.anchor.set(0.5);
        this.label.x = this.background.width * 0.4;
        this.label.y = 200;
        this.addChild(this.label);


    }
}