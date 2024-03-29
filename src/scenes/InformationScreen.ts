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
    }

    create()
    {   
        this.add.image(this.swidth, this.sheight / 2, 'bg_info')
                
        const back = new CustomButton(this, this.swidth ,this.sheight - 35 , 'button1', 'button2', 'Back')
        this.add.existing(back)
        
        back.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('load-screen')
                this.scene.start('load-screen')
            })

    }
}