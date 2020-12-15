import Phaser from 'phaser'

import Enemy from '../Enemies/Enemy'

import { createEnemyAnim } from '../Anims/EnemyAnims'
import { createCharacterAnims } from '../Anims/CharacAnims'

export default class Game extends Phaser.Scene
{   
    constructor()
	{
		super('game')
	}    
    
    private cursers!: Phaser.Types.Input.Keyboard.CursorKeys;
    private ship1: Phaser.Physics.Arcade.Sprite
    // private player1!: Phaser.Physics.Arcade.Sprite
    
    exhaustEmitter : Phaser.GameObjects.Particles.ParticleEmitter;
    fire : Phaser.GameObjects.Particles.ParticleEmitter;

	preload()
    {
       this.cursers = this.input.keyboard.createCursorKeys()
    }

    create()
    {     
        // Adding tileset and different Map layers
        const map = this.make.tilemap( {key: 'pirates'} )
        const tileset = map.addTilesetImage('oldkiel', 'tiles')

        map.createLayer('Water', tileset)                           // Layer 1
        const groundLayer = map.createLayer('Ground', tileset)      // Layer 2
        const treesLayer = map.createLayer('Trees', tileset)        // Layer 3
        const stonesLayer = map.createLayer('Stones', tileset)      // Layer 4

        // Making different layers collidable by player
        groundLayer.setCollisionByProperty({collide : true})
        treesLayer.setCollisionByProperty({collide : true})
        stonesLayer.setCollisionByProperty({collide : true})

        // ============================================================================================================
        // Highlighting which area is marked for colliding
        // -----------------------------------------------
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // groundLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(0, 0, 0, 255),
        //     faceColor: new Phaser.Display.Color(40,39, 37, 255)
        // })
        // ============================================================================================================

        // Adding Particle emitter
        const particles = this.add.particles('smoke')

        // Adding ship
        this.ship1 = this.physics.add.sprite(3180, -12250, 'ship', 'ship_1.png')
        this.ship1.body.setSize(this.ship1.width * 0.5, this.ship1.height * 0.75)

        // Calculating Offsets
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
            frequency: 50,
            follow: this.ship1,            
            followOffset: { x: offstx, y: offsty },
            tint: 0xA6C7F1,
        })

        // Setting collisions with ground, walls and trees
        this.physics.add.collider(this.ship1, groundLayer)
        this.physics.add.collider(this.ship1, stonesLayer)
        this.physics.add.collider(this.ship1, treesLayer)

        // Camera Follow the player
        this.cameras.main.setZoom(0.1)
        this.cameras.main.startFollow(this.ship1, true)
        this.cameras.main.zoomTo(1, 1200)
    }

    update(t: number, dt: number)
    {
        if (!this.cursers || !this.ship1 )
        {
            return
        }

        let speed = 200         // <-------   Speed of the boat

        const directn = new Phaser.Math.Vector2(0, 0)
        directn.setToPolar(this.ship1.rotation, 1)

        let dx = directn.x 
        let dy = directn.y 

        if (this.cursers.up?.isDown)
        {             
            if (this.cursers.left?.isDown)
            {   
                // Rotating Ship direction on pressing left
                this.ship1.angle -= speed * 0.012
            }
            else if (this.cursers.right?.isDown)
            {
                // Rotating Ship direction on pressing Right
                this.ship1.angle += speed * 0.012
            }
            
            // Moving Ship forward on pressing Up            
            this.ship1.setVelocity(speed * dx, speed * dy)
        }

        else if (this.cursers.down?.isDown)
        {            
            if (this.cursers.right?.isDown)
            {
                // Rotating Ship direction on pressing right
                this.ship1.angle -= speed * 0.012
            }
            else if (this.cursers.left?.isDown)
            {
                // Rotating Ship direction on pressing left
                this.ship1.angle += speed * 0.012
            }            
            
            // Moving Ship backward on pressing down
            this.ship1.setVelocity(-speed * 0.7 * dx, -speed * 0.7 * dy)
        }

        else
        {
            this.ship1.angle += 0            
            this.ship1.setVelocity( 0, 0)
        }
        
        // Setting direction and intensity of Particle system at the end of the boat
        if (this.exhaustEmitter)
        {
            const offstx = -dx * this.ship1.width * 0.3
            const offsty = -dy * this.ship1.width * 0.3
            
            const ddx = -dx
            const ddy = -dy

            // exhaustEmitter
            this.exhaustEmitter.setSpeedX({ min: 40 * ddx, max: 140 * ddx})
            this.exhaustEmitter.setSpeedY({ min:  40 * ddy, max: 140 * ddy})

            this.exhaustEmitter.accelerationX.propertyValue = 100 * ddx
            this.exhaustEmitter.accelerationY.propertyValue = 100 * ddy

            this.exhaustEmitter.followOffset.x = offstx
            this.exhaustEmitter.followOffset.y = offsty          
        }

        // Background sound                 <---- Comemnted for now as it annoys in development :p
        // this.sound.play('ocean')
    }
}
