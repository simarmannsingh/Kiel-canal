import Phaser, { Tilemaps } from 'phaser'

import CustomButton from '../Utils/CustomButton'

export default class Congrats extends Phaser.Scene
{
    bg_congrats: Phaser.GameObjects.Image
    private swidth = window.innerWidth/2;
    private sheight = window.innerHeight;
    
    soundConfig = {
        volume: 0.25,
        loop: true,
    }
   
    constructor()
    {
        super('congrats')
    }

    preload()
    {
        // Background image of Splashscreen
        this.load.image('bg_congrats', 'assets/congrats.png')   
    }

    create()
    {   
        this.bg_congrats = this.add.image(this.swidth, this.sheight , 'bg_congrats')
        this.sound.play('congrats', this.soundConfig)
                
        const nextScene = new CustomButton(this, this.swidth + 100 ,this.sheight - 35, 'button1', 'button2', 'Next')
        this.add.existing(nextScene)
        
        nextScene.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('congrats')
                this.sound.stopAll()
                this.scene.start('load-screen')
            })

        const back = new CustomButton(this, this.swidth -100 ,this.sheight - 35, 'button1', 'button2', 'Back')
        this.add.existing(back)
        
        back.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('congrats')
                this.sound.stopAll()
                this.scene.start('leveltwo')
            })
    }

    update()
    {
        this.bg_congrats.y -= 0.3
    }
}