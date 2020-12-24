import Phaser from 'phaser'
import Boat from '../Boats/Boat'
import '../Characters/Player'
import Player from '../Characters/Player';

import { sceneEvents } from '../Events/EventsCenter'

export default class Game extends Phaser.Scene
{   
    constructor()
	{
		super('game')
	}    
    
    private cursers!: Phaser.Types.Input.Keyboard.CursorKeys;
    private ship1: Player
    private boat: Phaser.Physics.Arcade.Sprite
    
    // private hit = 0

    private playerDirectn: Phaser.Math.Vector2
    private boatDirectn: Phaser.Math.Vector2
    
    exhaustEmitter : Phaser.GameObjects.Particles.ParticleEmitter;
    fire : Phaser.GameObjects.Particles.ParticleEmitter;

	preload()
    {
       this.cursers = this.input.keyboard.createCursorKeys()
    }

    create()
    {   
        this.scene.run('game_ui')

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

        // =====================================================================
        // Highlighting which area is marked for collisions
        // -----------------------------------------------
        // debugDraw(groundLayer, this)        
        // =====================================================================

        // Adding Particle emitter
        const particles = this.add.particles('ripples')
        const boatparticles = this.add.particles('ripples')
        
        // Adding ship
        this.ship1 = this.add.player(3180, -12250, 'ship')        
        
        // Adding boats
        this.boat = this.physics.add.sprite(3380, -11650, 'boat', 'boat.png' )
        // this.boat.body.setSize(this.boat.width * 0.5, this.boat.height * 0.75)
        
        const boats = this.physics.add.group({
            classType: Boat,
            createCallback: (go) => {
                const boatgo = go as Boat
                boatgo.body.onCollide = true
            }
        })

        boats.get(3450, -11750, 'boat')
        this.physics.add.collider(boats, groundLayer)
        this.physics.add.collider(boats, stonesLayer)
        this.physics.add.collider(boats, treesLayer)
        this.physics.add.collider(boats, this.ship1 , this.handlePlayerBoatCollision , undefined, this)

        //============================================================================================
        //  Particle system for Player's Ship and other boats
        //============================================================================================
        // For Player's ship
        // Calculating Offsets
        const player_Directn = new Phaser.Math.Vector2(0, 0)
        player_Directn.setToPolar(this.ship1.rotation, 1)
    
        const p_dx = -player_Directn.x 
        const p_dy = -player_Directn.y 
    
        const p_offstx = p_dx * this.ship1.width * 0.55
        const p_offsty = p_dy * this.ship1.width * 0.5
        
        this.exhaustEmitter = particles.createEmitter({
            quantity: 10,
            speedY: { min:  -10 * p_dy, max: 80 * p_dy},
            speedX: { min: -40 * p_dx, max: 40 * p_dx},
            accelerationX: 100 * p_dx,
            accelerationY: 100 * p_dy,
            lifespan: { min: 100, max: 300},
            alpha: { start: 0.5, end: 0, ease: 'Sine.easeIn' },
            scale: { start: 0.05, end: 0.002 },
            rotate:{ min: -180, max: 180 },
            angle: { min: 30, max: 140 },            
            blendMode: 'ADD',
            frequency: 50,
            follow: this.ship1,            
            followOffset: { x: p_offstx, y: p_offsty },
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

    private handlePlayerBoatCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        const boat = obj2 as Boat
        
        const dx = this.ship1.x - boat.x
        const dy = this.ship1.y - boat.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
        
        this.ship1.handleDamage(dir)

        sceneEvents.emit('player_health_changed', this.ship1.getHealth)
    }

    update(t: number, dt: number)
    {        
        if(this.ship1.getHealth === 0 )
        {            
            this.exhaustEmitter.follow = null
        }

        if (this.ship1 )
        {
            this.ship1.update(this.cursers)
        }

        // Variables for calculating emitter's direction
        const directn = new Phaser.Math.Vector2(0, 0)
        directn.setToPolar(this.ship1.rotation, 1)

        let dx = directn.x 
        let dy = directn.y 
                
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
