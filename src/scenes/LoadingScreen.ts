import Phaser from 'phaser'

import CustomButton from '../Utils/CustomButton'

export default class LoadingScene extends Phaser.Scene
{
    private swidth = window.innerWidth/2;
    private sheight = window.innerHeight/2;
    constructor()
    {
        super('load-screen')
    }

    preload()
    {
        // Background image of Splashscreen
        this.load.image('background', 'assets/background_1.png')
        this.load.image('schiff', 'assets/schiff_1.png')

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
        this.add.image(this.swidth,this.sheight,'background')
        this.add.image((this.swidth + 420),(this.sheight + 260 ),'schiff')

                
        const startGame = new CustomButton(this, this.swidth + 144,this.sheight - 100, 'button1', 'button2', 'Start Game')
        this.add.existing(startGame)
        
        startGame.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('intro-screen')
            })



        const howToPlay = new CustomButton(this, this.swidth + 144,this.sheight - 40, 'button1', 'button2', 'How to play')
        this.add.existing(howToPlay)

        howToPlay.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('info-screen')
            })

        const soundButton = new CustomButton(this, window.innerWidth - 300,this.sheight - 100, 'button3', 'button4', '')
        this.add.existing(soundButton)

        const Speaker = new CustomButton(this, window.innerWidth - 240,this.sheight - 100, 'speaker', 'speaker', '')
        this.add.existing(Speaker)
        
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