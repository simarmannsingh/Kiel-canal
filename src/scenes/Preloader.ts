import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
    
    constructor()
    {
        super('preloader')
    }

    preload() 
    {
        // Background Map
        this.load.image('tiles', 'assets/oldkiel.png')
        this.load.tilemapTiledJSON('pirates', 'assets/pirates_nieveu1.json')        // ---> Level 1        
        this.load.tilemapTiledJSON('secondlevel', 'assets/pirates_level2.json')        // ---> Level 2

        // Health UI assets
        this.load.image('ui_heart_full', 'assets/ui_heart_full.png')
        this.load.image('ui_heart_empty', 'assets/ui_heart_empty.png')

        // Player : Ship
        this.load.image('ship1', 'assets/ship_1.png')
        this.load.image('ship2', 'assets/ship_2.png')
        this.load.image('ship3', 'assets/ship_3.png')
        this.load.image('ship4', 'assets/ship_4.png')
        
        // passenger Boat
        this.load.image('boat', 'assets/boat.png')

        // Flags
        this.load.image('Germanflags', 'assets/germanyflag.png')
        this.load.image('denmarkflag', 'assets/denmarkflag.png')

        // // Finish tile
        this.load.image('finishtile', 'assets/finishtile.png')
        
        // Ship's ripples
        this.load.image('ripples', 'assets/shipripples.png')

        // Sounds 
        this.load.audio('smash', 'music/collide.mp3')
        this.load.audio('end', 'music/end.mp3')
        this.load.audio('travel', 'music/travel.mp3')
        this.load.audio('reset', 'music/shipreset.mp3')
        this.load.audio('congrats', 'music/congrats.mp3')

    }

    create() 
    {
        this.scene.start('game')
    }
}