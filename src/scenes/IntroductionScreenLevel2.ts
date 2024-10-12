import Phaser, { Tilemaps } from 'phaser'

import CustomButton from '../Utils/CustomButton'

export default class IntroductionScreenLevel2 extends Phaser.Scene
{
    bg_introduction: Phaser.GameObjects.Image
    private swidth = window.innerWidth/2;
    private sheight = window.innerHeight;
    
    constructor()
    {
        super('intro-screen-level2')
    }

    preload()
    {
        // Background image of Splashscreen
        this.load.image('bg_intro_level2', 'assets/level_2_intro.png')   
    }

    create()
    {   
        this.bg_introduction = this.add.image(this.swidth, this.sheight , 'bg_intro_level2')
                
        const nextScene = new CustomButton(this, this.swidth + 100 ,this.sheight - 35, 'button1', 'button2', 'Next')
        this.add.existing(nextScene)
        
        nextScene.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('intro-screen-level2')
                this.scene.start('leveltwo')
            })

        const back = new CustomButton(this, this.swidth -100 ,this.sheight - 35, 'button1', 'button2', 'Back')
        this.add.existing(back)
        
        back.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('intro-screen-level2')
                this.scene.start('game')
            })
    }

    update()
    {
        this.bg_introduction.y -= 0.6
    }
}