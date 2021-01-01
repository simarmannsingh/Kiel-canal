import Phaser, { Tilemaps } from 'phaser'

import CustomButton from '../Utils/CustomButton'

export default class InformationScreen extends Phaser.Scene
{
    bg_information: Phaser.GameObjects.Image
    private swidth = window.innerWidth/2;
    private sheight = window.innerHeight;
    
    constructor()
    {
        super('info-screen')
    }

    preload()
    {
        // Background image of Splashscreen
        this.load.image('bg_info', 'assets/information.png')
        

        // Buttons
        this.load.image('button1', 'assets/blue_button00.png')
        this.load.image('button2', 'assets/blue_button01.png')
        // this.load.image('button3', 'assets/blue_boxCheckmark.png')
        // this.load.image('button4', 'assets/blue_boxCross.png')

        // Speaker icon
        this.load.image('speaker', 'assets/musicSpeaker.png')        
    }

    create()
    {
        
        // this.add.image(640, 450,'bg_intro')
        // this.bg_introduction = this.add.tileSprite(this.swidth, this.sheight, this.swidth*2, this.sheight*2, 'bg_intro' )
        this.add.image(this.swidth, this.sheight / 2, 'bg_info')//, this.swidth*2, this.sheight*2,  )
                
        const back = new CustomButton(this, this.swidth ,this.sheight - 35 , 'button1', 'button2', 'Back')
        this.add.existing(back)
        
        back.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('load-screen')
            })

    }
}