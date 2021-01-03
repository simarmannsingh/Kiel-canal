import Phaser, { Tilemaps } from 'phaser'

import CustomButton from '../Utils/CustomButton'

export default class Level1_map extends Phaser.Scene
{
    bg_information: Phaser.GameObjects.Image
    private swidth = window.innerWidth/2;
    private sheight = window.innerHeight;
    
    constructor()
    {
        super('level1-map')
    }

    preload()
    {
        // Background image of Splashscreen
        this.load.image('bg_level1_map', 'assets/level1_map.png')
    }

    create()
    {   
        this.add.image(this.swidth, this.sheight / 2, 'bg_level1_map')
                
        const back = new CustomButton(this, this.swidth ,this.sheight - 35 , 'button1', 'button2', 'Back')
        this.add.existing(back)
        
        back.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {                
                this.scene.stop('level1-map')
                this.sound.stopAll()
                this.scene.start('game')
            })

    }
}