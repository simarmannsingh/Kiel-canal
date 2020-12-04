import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
    
    constructor()
    {
        super('preloader')
    }

    preload() 
    {
        this.load.image('tiles', 'assets/kiel.png')
        this.load.tilemapTiledJSON('level2', 'assets/level2.json')

        this.load.atlas('faune', 'assets/faune.png', 'assets/faune.json')
        
    }

    create() 
    {
        this.scene.start('game')
    }
}