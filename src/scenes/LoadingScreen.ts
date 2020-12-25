import Phaser from 'phaser'

import CustomButton from '../Utils/CustomButton'

export default class LoadingScene extends Phaser.Scene
{
    constructor()
    {
        super('load-screen')
    }

    preload()
    {
        // Background image of Splashscreen
        this.load.image('background', 'assets/background.png')

        // Buttons
        this.load.image('button1', 'assets/blue_button00.png')
        this.load.image('button2', 'assets/blue_button01.png')
        this.load.image('button3', 'assets/blue_boxCheckmark.png')
        this.load.image('button4', 'assets/blue_boxCross.png')

        // Speaker icon
        this.load.image('speaker', 'assets/musicSpeaker.png')        
    }

    create()
    {
        this.add.image(640, 400,'background')
                
        const startGame = new CustomButton(this, 840, 310, 'button1', 'button2', 'Start Game')
        this.add.existing(startGame)
        
        const settings = new CustomButton(this, 840, 370, 'button1', 'button2', 'Settings')
        this.add.existing(settings)

        const howToPlay = new CustomButton(this, 840, 430, 'button1', 'button2', 'How to play')
        this.add.existing(howToPlay)

        const soundButton = new CustomButton(this, 1140, 60, 'button3', 'button4', '')
        this.add.existing(soundButton)

        const Speaker = new CustomButton(this, 1200, 60, 'speaker', 'speaker', '')
        this.add.existing(Speaker)

        startGame.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('preloader')
            })

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

    }
}