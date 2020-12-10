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
        this.load.image('button1', 'assets/blue_button00.png')
        this.load.image('button2', 'assets/blue_button01.png')
        this.load.image('background', 'assets/background.png')
    }

    create()
    {
        this.add.image(640, 400,'background')      //0.34
          

        const button = new CustomButton(this, 840, 300, 'button1', 'button2', 'Start Game')
        this.add.existing(button)

        button.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('preloader')
            })
        // this.add.image(400, 300, 'button1').setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //         console.log('pressed');
        //     })
        
    }
}