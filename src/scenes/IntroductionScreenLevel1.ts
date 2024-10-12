import Phaser, { Tilemaps } from 'phaser'

import CustomButton from '../Utils/CustomButton'

export default class IntroductionScreenLevel1 extends Phaser.Scene
{
    bg_introduction: Phaser.GameObjects.Image
    private swidth = window.innerWidth/2;
    private sheight = window.innerHeight;
    
    constructor()
    {
        super('intro-screen-level1')
    }

    preload()
    {
        // Background image of Splashscreen
        this.load.image('bg_intro_level1', 'assets/level_1_intro.png')   
    }

    create()
    {   
        this.bg_introduction = this.add.image(this.swidth, this.sheight, 'bg_intro_level1')
                
        const nextScene = new CustomButton(this, this.swidth + 100 ,this.sheight - 35, 'button1', 'button2', 'Next')
        this.add.existing(nextScene)
        
        nextScene.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('intro-screen-level1')
                this.scene.start('preloader')
            })

        const back = new CustomButton(this, this.swidth -100 ,this.sheight - 35, 'button1', 'button2', 'Back')
        this.add.existing(back)
        
        back.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('intro-screen-level1')
                this.scene.start('load-screen')
            })
    }

    update()
    {
        this.bg_introduction.y -= 0.6
    }
}