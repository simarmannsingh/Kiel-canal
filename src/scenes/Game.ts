import Phaser from 'phaser'
import Boat from '../Boats/Boat'
import DeFlag from '../Flags/DeFlag'
import '../Characters/Player'
import Player from '../Characters/Player';
import CustomButton from '../Utils/CustomButton'

import { sceneEvents } from '../Events/EventsCenter'
import CountdownController from './CountdownController';

export default class Game extends Phaser.Scene
{   
    constructor()
	{
		super('game')
	}    
    
    private swidth = window.innerWidth/2
    private sheight = window.innerHeight/2;
    private cursers!: Phaser.Types.Input.Keyboard.CursorKeys;
    private ship1: Player
    private boat: Phaser.Physics.Arcade.Sprite
    
    private countdown: CountdownController
    private playerBoatCollider?: Phaser.Physics.Arcade.Collider
    private playerFinishCollider?: Phaser.Physics.Arcade.Collider

    exhaustEmitter : Phaser.GameObjects.Particles.ParticleEmitter;
    // fire : Phaser.GameObjects.Particles.ParticleEmitter;
    soundConfig = {
        volume: 0.25,
        loop: true,
    }

    volume = {
        volume: 0.24
    }

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
        // const moretreesLayer = map.createLayer('Moretrees', tileset)        // Layer 4
        const stonesLayer = map.createLayer('Stones', tileset)      // Layer 5
        // const roadsLayer = map.createLayer('Road', tileset2)      // Layer 6
        const finishlineLayer = map.createLayer('Finishline', tileset)      // Layer 7
        // const flagsLayer = map.createLayer('Deflags', tileset)      // Layer 8
        // flagsLayer.forEachTile( (obj) => {
        //     this.physics.add.sprite(obj.x, obj.y, 'germanyflag', 'germanyflag.png' )    
        // })

        // Making different layers collidable by player
        groundLayer.setCollisionByProperty({collide : true})
        treesLayer.setCollisionByProperty({collide : true})
        // moretreesLayer.setCollisionByProperty({collide : true})
        stonesLayer.setCollisionByProperty({collide : true})
        finishlineLayer.setCollisionByProperty({collide: true})

        // =====================================================================
        // Highlighting which area is marked for collisions
        // -----------------------------------------------
        // debugDraw(groundLayer, this)        
        // =====================================================================

        // Adding Particle emitter
        const particles = this.add.particles('ripples')
        // const boatparticles = this.add.particles('ripples')
        
        // Adding ship
        this.ship1 = this.add.player(3180, -12250, 'ship1')
        // this.ship1 = this.add.player(-4880, -8450, 'ship1')
        
        // Adding boats
        this.boat = this.physics.add.sprite(3380, -11650, 'boat', 'boat.png' )        
        
        const boats = this.physics.add.group({
            classType: Boat,
            createCallback: (go) => {
                const boatgo = go as Boat
                boatgo.body.onCollide = true
            },
        })

        const boatsLayer = map.getObjectLayer('Dingyboats')
        boatsLayer.objects.forEach((boatObj) => {
            boats.get(boatObj.x! + boatObj.width! * 0.5, boatObj.y! - boatObj.height! * 0.5, 'boat')
             
        })

        const germanyflags = this.physics.add.group({
            classType: DeFlag
            // createCallback: (go) => {
            //     const boatgo = go as DeFlag
            //     boatgo.body.onCollide = true
            // },
        })

        const germanyflagsLayer = map.getObjectLayer('Germanflags')
        germanyflagsLayer.objects.forEach((deFlagsObj) => {
            germanyflags.get(deFlagsObj.x! + deFlagsObj.width! * 0.5, deFlagsObj.y! - deFlagsObj.height! * 0.5, 'Germanflags')
             
        })

        this.physics.add.collider(boats, groundLayer)
        this.physics.add.collider(boats, stonesLayer)
        this.physics.add.collider(boats, treesLayer)
        this.playerBoatCollider = this.physics.add.collider(boats, this.ship1 , this.handlePlayerBoatCollision , undefined, this)
        this.playerFinishCollider = this.physics.add.collider(this.ship1 , finishlineLayer , this.handlePlayerFinishCollision , undefined, this)


        // TRICK : Uncomment this section to add a
        // button for going to next level, right
        // next to start line of boat
        // =======================================

        // const nextLevel = new CustomButton(this, 3180, -12250, 'button1', 'button2', 'Next Lev')
        // this.add.existing(nextLevel)
        
        // nextLevel.setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //         this.sound.stopAll()
        //         this.scene.start('leveltwo')
        //     })
        
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
        this.cameras.main.setZoom(0.01)
        this.cameras.main.startFollow(this.ship1, true)
        this.cameras.main.zoomTo(1, 2200)

        // this.add.text(16, 32, 'Hello World', { font: '"Press Shift for Map"' });
        this.sound.play('travel',this.soundConfig)
    }
    

    // handleCountdownFinished ()
    // {
    //     const { width, height } = this.scale
    //     this.add.text(width * 0.5, height * 0.5, 'You Lose!', { fontSize: '40px', color: '#000' })
    // }

    private handlePlayerFinishCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        this.sound.play('end', this.volume)
        this.time.delayedCall(2000, () => {
            this.scene.stop('game_ui')
            this.scene.stop('game')
            this.sound.stopAll()
            this.scene.start('intro-screen-level2')
        })
    }

    private handlePlayerBoatCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        const boat = obj2 as Boat
        
        const dx = this.ship1.x - boat.x
        const dy = this.ship1.y - boat.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
        
        this.ship1.handleDamage(dir)        

        if(this.ship1.getHealth <= 0 )
        {       
            this.sound.stopAll()
            this.exhaustEmitter.follow = null
            this.playerBoatCollider?.destroy()
            this.sound.play('reset', this.volume)
            this.time.delayedCall(5000, () => {
                this.scene.stop('game')
                this.sound.stopAll()
                this.scene.start('game')
            })
        }

        sceneEvents.emit('player_health_changed', this.ship1.getHealth)
        this.sound.play('smash')
    }

    update(t: number, dt: number)
    {
        if (this.ship1 )
        {
            this.ship1.update(this.cursers)
        }

        if (this.cursers.shift?.isDown)
        {
            this.scene.stop('game_ui')
            this.scene.stop('game')
            // this.scene.pause('game_ui')
            // this.scene.pause('game')
            this.scene.start('level1-map')
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
        
        // this.countdown.update()
        

        // Background sound                 <---- Comemnted for now as it annoys in development :p
        // this.sound.play('ocean')
    }
}
