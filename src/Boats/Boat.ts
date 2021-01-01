import Phaser from 'phaser'

enum Direction
{
    TOP,
    TOPRIGHT,
    RIGHT,
    DOWNRIGHT,
    DOWN,
    DOWNLEFT,
    LEFT,
    TOPLEFT
}

const randomDirection = (exclude: Direction) => {
    let newDirection = Phaser.Math.Between(0, 3)
    while(newDirection === exclude)
    {
        newDirection = Phaser.Math.Between(0, 3)
    }

    return newDirection
}

export default class Boat extends Phaser.Physics.Arcade.Sprite
{
    private direction = Direction.TOP
    private moveEvent: Phaser.Time.TimerEvent
    fire : Phaser.GameObjects.Particles.ParticleEmitter;

    constructor(scene:Phaser.Scene, x: number, y: number, texture: string, frame?: string | number )
    {
        super(scene, x, y, texture, frame)
        
        const boatparticles = scene.add.particles('ripples')

        const boat_Directn = new Phaser.Math.Vector2(0, 0)
        boat_Directn.setToPolar(this.rotation, 1)
    
        const b_dx = -boat_Directn.x 
        const b_dy = -boat_Directn.y 
    
        const b_offstx = b_dx * this.width * 0
        const b_offsty = b_dy * this.height * 0.5
        
        this.fire = boatparticles.createEmitter({
            quantity: 6,
            speedY: { min:  -10 * b_dy, max: 40 * b_dy},
            speedX: { min: -30 * b_dx, max: 30 * b_dx},
            accelerationX: 80 * b_dx,
            accelerationY: 80 * b_dy,
            lifespan: { min: 100, max: 300},
            alpha: { start: 0.5, end: 0, ease: 'Sine.easeIn' },
            scale: { start: 0.05, end: 0.002 },
            rotate:{ min: -180, max: 180 },
            angle: { min: 30, max: 140 },            
            blendMode: 'ADD',
            frequency: 40,
            follow: this,            
            followOffset: { x: b_offstx, y: b_offsty },
            tint: 0x1AC7F1,
        })

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision)

        this.moveEvent = scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.direction = randomDirection(this.direction)
            },
            loop: true
        })
    }

    destroy()
    {
        this.moveEvent.destroy()

        super.destroy()
    }

    private handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile)
    { 
        if(go !== this)
        {
            return
        }
        
        this.direction = randomDirection(this.direction)
    }

    preUpdate(t: number, dt: number)
    {
        super.preUpdate(t, dt)

        const speed = 200

        switch(this.direction)
        {
            case Direction.TOP:
                // this.setVelocity(0, -speed)
                this.setVelocity(0, -Phaser.Math.Between(0, speed))
                this.angle = -90
                break
            
            case Direction.TOPRIGHT:
                this.setVelocity(Phaser.Math.Between(0, speed), -Phaser.Math.Between(0, speed))
                this.angle = -45
                break
                
            case Direction.RIGHT:
                this.setVelocity(Phaser.Math.Between(0, speed), 0)
                this.angle = 0
                break

            case Direction.DOWNRIGHT:
                this.setVelocity(Phaser.Math.Between(0, speed), Phaser.Math.Between(0, speed))
                this.angle = 45
                break
            
        
            case Direction.DOWN:
                this.setVelocity(0, Phaser.Math.Between(0, speed))
                this.angle = 90
                break
            
            case Direction.DOWNLEFT:
                this.setVelocity(-Phaser.Math.Between(0, speed), Phaser.Math.Between(0, speed))
                this.angle = 135
                break
            

            case Direction.LEFT:
                this.setVelocity(-Phaser.Math.Between(0, speed), 0)
                this.angle = 180
                break

            case Direction.TOPLEFT:
                this.setVelocity(-Phaser.Math.Between(0, speed), -Phaser.Math.Between(0, speed))
                this.angle = -135
                break

        }
    }
}


