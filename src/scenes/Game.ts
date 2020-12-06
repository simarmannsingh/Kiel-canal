import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{   
    
    private cursers!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player1!: Phaser.Physics.Arcade.Sprite
    private ship1!: Phaser.Physics.Arcade.Sprite
    
    exhaustEmitter : Phaser.GameObjects.Particles.ParticleEmitter;

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
        const map = this.make.tilemap( {key: 'pirates'} )
        const tileset = map.addTilesetImage('oldkiel', 'tiles')

        map.createLayer('Water', tileset)
        const groundLayer = map.createLayer('Ground', tileset)
        const treesLayer = map.createLayer('Trees', tileset)
        const stonesLayer = map.createLayer('Stones', tileset)

        stonesLayer.setCollisionByProperty({collide : true})
        treesLayer.setCollisionByProperty({collide : true})

        // Highlighting which area is marked for colliding
        const debugGraphics = this.add.graphics().setAlpha(0.7)
        groundLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(0, 0, 0, 255),
            faceColor: new Phaser.Display.Color(40,39, 37, 255)
        })


        // Adding player
        this.player1 = this.physics.add.sprite(3520, -12032, 'faune' , 'walk-down-1.png')
        this.player1.body.setSize(this.player1.width * 0.5, this.player1.height * 0.9)

        const particles = this.add.particles('smoke')

        // Adding ship
        this.ship1 = this.physics.add.sprite(3180, -12250, 'ship', 'ship_1.png')
        //ship1.body.setMaxSpeed(200);

        const directn = new Phaser.Math.Vector2(0, 0)
        directn.setToPolar(this.ship1.rotation, 1)

        const dx = -directn.x 
        const dy = -directn.y 

        const offstx = dx * this.ship1.width * 0.55
        const offsty = dy * this.ship1.width * 0.55


        this.exhaustEmitter = particles.createEmitter({
            quantity: 10,
            speedY: { min:  -10 * dy, max: 80 * dy},
            speedX: { min: -40 * dx, max: 40 * dx},
            accelerationX: 100 * dx,
            accelerationY: 100 * dy,
            lifespan: { min: 100, max: 300},
            alpha: { start: 0.5, end: 0, ease: 'Sine.easeIn' },
            scale: { start: 0.05, end: 0.002 },
            rotate:{ min: -180, max: 180 },
            angle: { min: 30, max: 140 },
            
            blendMode: 'ADD',
            frequency: 30,
            follow: this.ship1,            
            followOffset: { x: offstx, y: offsty },
        })


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
        this.physics.add.collider(this.player1, groundLayer)
        this.physics.add.collider(this.player1, stonesLayer)
        this.physics.add.collider(this.player1, treesLayer)

        // Camera Follow the player        
        this.cameras.main.startFollow(this.ship1, true)

    }

    update(t: number, dt: number)
    {
        if (!this.cursers || !this.player1 )
        {
            return
        }

        const speed = 3

        const directn = new Phaser.Math.Vector2(0, 0)
        directn.setToPolar(this.ship1.rotation, 1)

        const dx = directn.x 
        const dy = directn.y 

        if (this.cursers.up?.isDown)
        {
            this.player1.anims.play('faune-run-up', true)
            this.player1.setVelocity(0, -speed)         
            
            // Moving Ship forward on pressing Up
            this.ship1.x += speed * dx
            this.ship1.y += speed * dy

            if (this.cursers.left?.isDown)
            {
                // play animation and move player
                this.player1.anims.play('faune-run-side', true)
                this.player1.setVelocity(-speed, 0)
               
                this.player1.scaleX = -1
                this.player1.body.offset.x = 24
    
                // Rotating Ship on pressing left
                this.ship1.angle -= speed * 0.6
    
            }
            else if (this.cursers.right?.isDown)
            {
                this.player1.setVelocity(speed, 0)
                this.player1.anims.play('faune-run-side', true)
    
                this.player1.scaleX = 1
                this.player1.body.offset.x = 8
    
                // Rotating Ship on pressing Right
                this.ship1.angle += speed * 0.6
            }            
        }
        else if (this.cursers.down?.isDown)
        {
            this.player1.setVelocity(0, speed)
            this.player1.anims.play('faune-run-down', true)

            // Moving Ship backward on pressing down
            this.ship1.x -= speed * dx * 0.3
            this.ship1.y -= speed * dy * 0.3

            if (this.cursers.right?.isDown)
            {
                // play animation and move player
                this.player1.anims.play('faune-run-side', true)
                this.player1.setVelocity(-speed, 0)
               
                this.player1.scaleX = -1
                this.player1.body.offset.x = 24
    
                // Rotating Ship on pressing right
                this.ship1.angle -= speed * 0.3
    
            }
            else if (this.cursers.left?.isDown)
            {
                this.player1.setVelocity(speed, 0)
                this.player1.anims.play('faune-run-side', true)
    
                this.player1.scaleX = 1
                this.player1.body.offset.x = 8
    
                // Rotating Ship on pressing left
                this.ship1.angle += speed * 0.3
            }            
        }

        else
        {
            this.ship1.angle += 0
            this.player1.setVelocity( 0, 0)
            this.player1.anims.play('faune-idle-down')
        }

        if (this.exhaustEmitter)
        {
            const offstx = -dx * this.ship1.width * 0.3
            const offsty = -dy * this.ship1.width * 0.3
            
            const ddx = -dx
            const ddy = -dy

            this.exhaustEmitter.setSpeedX({ min: 40 * ddx, max: 140 * ddx})
            this.exhaustEmitter.setSpeedY({ min:  40 * ddy, max: 140 * ddy})

            this.exhaustEmitter.accelerationX.propertyValue = 100 * ddx
            this.exhaustEmitter.accelerationY.propertyValue = 100 * ddy

            this.exhaustEmitter.followOffset.x = offstx
            this.exhaustEmitter.followOffset.y = offsty
        }
        
    }
}
