import Phaser, { Tilemaps } from 'phaser'

import CustomButton from '../Utils/CustomButton'

export default class Introduction extends Phaser.Scene
{
    bg_introduction: Phaser.GameObjects.Image
    private swidth = window.innerWidth/2;
    private sheight = window.innerHeight;
    
    constructor()
    {
        super('intro-screen')
    }

    preload()
    {
        // Background image of Splashscreen
        this.load.image('bg_intro', 'assets/level_1_intro.png')
        

        // Buttons
        // this.load.image('button1', 'assets/blue_button00.png')
        // this.load.image('button2', 'assets/blue_button01.png')
        // this.load.image('button3', 'assets/blue_boxCheckmark.png')
        // this.load.image('button4', 'assets/blue_boxCross.png')

        // Speaker icon
        this.load.image('speaker', 'assets/musicSpeaker.png')        
    }

    create()
    {
        
        // this.add.image(640, 450,'bg_intro')
        // this.bg_introduction = this.add.tileSprite(this.swidth, this.sheight, this.swidth*2, this.sheight*2, 'bg_intro' )
        this.bg_introduction = this.add.image(this.swidth, this.sheight, 'bg_intro')//, this.swidth*2, this.sheight*2,  )
                
        const nextScene = new CustomButton(this, this.swidth ,this.sheight - 35, 'button1', 'button2', 'Next')
        this.add.existing(nextScene)
        
        nextScene.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('preloader')
            })


        // const settings = new CustomButton(this, 840, 370, 'button1', 'button2', 'Settings')
        // this.add.existing(settings)

        // const howToPlay = new CustomButton(this, 840, 430, 'button1', 'button2', 'How to play')
        // this.add.existing(howToPlay)

        // const soundButton = new CustomButton(this, 1140, 60, 'button3', 'button4', '')
        // this.add.existing(soundButton)

        // const Speaker = new CustomButton(this, 1200, 60, 'speaker', 'speaker', '')
        // this.add.existing(Speaker)

        
        // soundButton.setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                              

        //     })
        // this.add.image(400, 300, 'button1').setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //         console.log('pressed');
        //     })
        
    }

    update()
    {
        this.bg_introduction.y -= 0.3
    }
}