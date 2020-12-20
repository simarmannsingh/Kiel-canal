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
        this.load.tilemapTiledJSON('pirates', 'assets/pirates1.json')

        // Player : Ship
        this.load.image('ship', 'assets/ship_1.png')
        
        // passenger Boat
        this.load.image('boat', 'assets/boat.png')
        
        
        // this.load.atlas('faune', 'assets/faune.png', 'assets/faune.json')
        
        
        // Ship's ripples
        this.load.image('ripples', 'assets/shipripples.png')
        //this.load.image('fire', 'assets/fire.png')

        // Sound : Ocean
        this.load.audio('ocean', 'music/stereo_ocean.mp3')

    }

    create() 
    {
        this.scene.start('game')
    }
}