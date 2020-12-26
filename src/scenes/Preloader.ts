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
        // this.load.tilemapTiledJSON('pirates', 'assets/pirates1.json')
        this.load.tilemapTiledJSON('pirates', 'assets/pirates_2.json')

        // Health UI assets
        this.load.image('ui_heart_full', 'assets/ui_heart_full.png')
        this.load.image('ui_heart_empty', 'assets/ui_heart_empty.png')

        // Player : Ship
        this.load.image('ship', 'assets/ship_1.png')
        this.load.image('ship2', 'assets/ship_2.png')
        this.load.image('ship4', 'assets/ship_4.png')
        
        // passenger Boat
        this.load.image('boat', 'assets/boat.png')
        
        // Ship's ripples
        this.load.image('ripples', 'assets/shipripples.png')

        // Sound : Ocean
        this.load.audio('ocean', 'music/stereo_ocean.mp3')
        this.load.audio('smash', 'music/collide.mp3')
        this.load.audio('end', 'music/end.mp3')
        this.load.audio('travel', 'music/travel.mp3')

    }

    create() 
    {
        this.scene.start('game')
    }
}