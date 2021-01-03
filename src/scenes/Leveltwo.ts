import Phaser from 'phaser'
import Boat from '../Boats/Boat'
import '../Characters/Player'
import Player from '../Characters/Player';
import CustomButton from '../Utils/CustomButton'

import { sceneEvents } from '../Events/EventsCenter'
import CountdownController from './CountdownController';

export default class Leveltwo extends Phaser.Scene
{   
    constructor()
	{
		super('leveltwo')                
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

	preload()
    {
       this.cursers = this.input.keyboard.createCursorKeys()
       
    }

    create()
    {   
        // Adding tileset and different Map layers
        const map = this.make.tilemap( {key: 'secondlevel'} )
        const tileset = map.addTilesetImage('oldkiel', 'tiles')

        map.createLayer('Water', tileset)                           // Layer 1
        const groundLayer = map.createLayer('Ground', tileset)      // Layer 2
        const treesLayer = map.createLayer('Trees', tileset)        // Layer 3
        // const moretreesLayer = map.createLayer('Moretrees', tileset)        // Layer 4
        const stonesLayer = map.createLayer('Stones', tileset)      // Layer 5
        // const roadsLayer = map.createLayer('Road', tileset2)      // Layer 6
        const finishlineLayer = map.createLayer('FinishLine', tileset)      // Layer 7
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

        // Adding ship
        this.ship1 = this.add.player(3180, -12250, 'ship1')        
        // this.ship1 = this.add.player(3600, -9096, 'ship1')        
        
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

        this.physics.add.collider(boats, groundLayer)
        this.physics.add.collider(boats, stonesLayer)
        this.physics.add.collider(boats, treesLayer)
        this.playerBoatCollider = this.physics.add.collider(boats, this.ship1 , this.handlePlayerBoatCollision , undefined, this)
        this.playerFinishCollider = this.physics.add.collider(this.ship1 , finishlineLayer , this.handlePlayerFinishCollision , undefined, this)

        
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
        this.cameras.main.zoomTo(1, 2500)


        const openMap = new CustomButton(this, this.swidth + 100 ,this.sheight - 35, 'button1', 'button2', 'Next')
        this.add.existing(openMap)
        
        openMap.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('leveltwo')
                this.scene.start('level1-map')
            })


        //============================================================================================================================
        //     TODO : Countdown Timer
        //============================================================================================================================

        let timerLabel = this.add.text(300, -300, '45', { fontSize: '40px', color: '#ffffff' })
            .setOrigin(0.5)
        
        console.log(timerLabel.text);
        
        const abc = Number(timerLabel.text)

        this.countdown = new CountdownController(this, timerLabel)
        this.countdown.start(this.handleCountdownFinished.bind(this), abc) 
        //============================================================================================================================
        
        this.scene.run('game_ui')

        this.sound.play('travel',{
            loop: true
        })

    }
    

    handleCountdownFinished ()
    {
        const { width, height } = this.scale
        this.add.text(width * 0.5, height * 0.5, 'You Lose!', { fontSize: '40px', color: '#000' })
			.setOrigin(0.5)

    }

    private handlePlayerFinishCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        this.sound.stopAll()
        this.sound.play('end')
        this.time.delayedCall(2000, () => {
            this.scene.stop('leveltwo')
            this.scene.stop('game_ui')
            this.sound.stopAll()
            this.scene.start('congrats')
        })       
    }

    private handlePlayerBoatCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        const boat = obj2 as Boat
        
        const dx = this.ship1.x - boat.x
        const dy = this.ship1.y - boat.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
        
        this.ship1.handleDamage(dir)

        sceneEvents.emit('player_health_changed', this.ship1.getHealth)

        if(this.ship1.getHealth <= 0 )
        {            
            this.sound.stopAll()
            this.exhaustEmitter.follow = null
            this.playerBoatCollider?.destroy()
            this.sound.play('reset')
            this.time.delayedCall(5000, () => {
                this.scene.stop('leveltwo')
                this.scene.start('leveltwo')                
            })
        }
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
            this.scene.stop('leveltwo')
            this.scene.start('level2-map')
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
        
        this.countdown.update()
        

        // Background sound                 <---- Comemnted for now as it annoys in development :p
        // this.sound.play('ocean')
    }
}
