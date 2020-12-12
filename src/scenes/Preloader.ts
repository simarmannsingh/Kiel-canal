import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
    
    constructor()
    {
        super('preloader')
    }

    preload() 
    {
        // this.load.image('tiles', 'assets/kiel.png')
        // this.load.tilemapTiledJSON('level2', 'assets/level2.json')

        // Background Map
        this.load.image('tiles', 'assets/oldkiel.png')
        this.load.tilemapTiledJSON('pirates', 'assets/pirates.json')

        // Player : Ship
        this.load.image('ship', 'assets/ship_1.png')
        this.load.atlas('faune', 'assets/faune.png', 'assets/faune.json')
        
        // Ship's Smoke
        this.load.image('smoke', 'assets/shipripples.png')
        //this.load.image('fire', 'assets/fire.png')

        // Sound : Ocean
        this.load.audio('ocean', 'music/stereo_ocean.mp3')

    }

    create() 
    {
        this.scene.start('game')
    }
}