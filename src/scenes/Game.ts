import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
    
    private cursers!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player1!: Phaser.Physics.Arcade.Sprite

	constructor()
	{
		super('game')
	}

	preload()
    {
       this.cursers = this.input.keyboard.createCursorKeys()
    }

    create()
    {        
        const map = this.make.tilemap( {key: 'level2'} )
        const tileset = map.addTilesetImage('kiel', 'tiles')

        map.createLayer('Ground', tileset)
        const wallsLayer = map.createLayer('Walls', tileset)
        const treesLayer = map.createLayer('Trees', tileset)

        wallsLayer.setCollisionByProperty({collide : true})
        treesLayer.setCollisionByProperty({collide : true})

        // Highlighting which area is marked for colliding
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // wallsLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(0, 0, 0, 255),
        //     faceColor: new Phaser.Display.Color(40,39, 37, 255)
        // })


        // Adding player to the scene
        this.player1 = this.physics.add.sprite(528, 350, 'faune' , 'walk-down-1.png')
        this.player1.body.setSize(this.player1.width * 0.5, this.player1.height * 0.9)


        // Player's running animations
        // Idle Down animation
        this.anims.create({
            key: 'faune-idle-down',
            frames: [{ key: 'faune', frame: 'run-down-1.png' }]
        })

        // idle Up animation
        this.anims.create({
            key: 'faune-idle-up',
            frames: [{ key: 'faune', frame: 'run-up-1.png' }]
        })

        // Idle side animation
        this.anims.create({
            key: 'faune-idle-side',
            frames: [{ key: 'faune', frame: 'run-side-1.png' }]
        })      

        // Running Down Animation
        this.anims.create({
            key: 'faune-run-down',
            frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-down-', suffix: '.png'}),
            repeat: -1,
            frameRate: 13
        })

        // Running up animation
        this.anims.create({
            key: 'faune-run-up',
            frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-up-', suffix: '.png'}),
            repeat: -1,
            frameRate: 13
        })

        // Running side animation
        this.anims.create({
            key: 'faune-run-side',
            frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-side-', suffix: '.png'}),
            repeat: -1,
            frameRate: 13
        })

        this.player1.anims.play('faune-idle-down')

        // Setting collisions with walls and trees
        this.physics.add.collider(this.player1, wallsLayer)
        this.physics.add.collider(this.player1, treesLayer)

        // Camera Follow the player        
        this.cameras.main.startFollow(this.player1, true)

    }

    update(t: number, dt: number)
    {
        if (!this.cursers || !this.player1 )
        {
            return
        }

        const speed = 100

        if (this.cursers.left?.isDown)
        {
            // play animation and move player
            this.player1.anims.play('faune-run-side', true)
            this.player1.setVelocity(-speed, 0)

            this.player1.scaleX = -1
            this.player1.body.offset.x = 24
        }
        else if (this.cursers.right?.isDown)
        {
            this.player1.setVelocity(speed, 0)
            this.player1.anims.play('faune-run-side', true)

            this.player1.scaleX = 1
            this.player1.body.offset.x = 8
        }
        else if (this.cursers.up?.isDown)
        {
            this.player1.anims.play('faune-run-up', true)
            this.player1.setVelocity(0, -speed)            
        }
        else if (this.cursers.down?.isDown)
        {
            this.player1.setVelocity(0, speed)
            this.player1.anims.play('faune-run-down', true)
        }
        else
        {
            this.player1.setVelocity( 0, 0)
            this.player1.anims.play('faune-idle-down')
        }
        
    }
}
