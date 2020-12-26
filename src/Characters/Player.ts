import Phaser from 'phaser'

declare global
{
    namespace Phaser.GameObjects
    {
        interface GameObjectFactory
        {
            player(x: number, y: number, texture: string, frame?: string | number): Player
        }
    }
}

enum HealthState
{
    IDLE,
    DAMAGE,
    DEAD
}

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    private healthState = HealthState.IDLE
    private damageTime = 0

    private health = 4

    get getHealth()
    {
        return this.health
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super (scene, x, y, texture, frame)        
    }


    handleDamage(dir: Phaser.Math.Vector2)
    {        
        if (this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD || this.health <= 0)
        {
            return
        }
        
        --this.health      
        if(this.health <= 0)                        // Case : DEAD
        {            
            this.healthState = HealthState.DEAD
            this.setTexture('ship4')
            this.setVelocity( 0, 0 )
            this.scene.sound.play('end')
        }
        else if(this.health > 0 && this.health < 3) // Case : DAMAGE
        {            
            this.healthState = HealthState.DAMAGE
            this.setTexture('ship2')
            this.setVelocity( dir.x, dir.y )    
            this.setTint(0xff0000)
            this.damageTime = 0
        }
        else                                        // Case : IDLE or DAMAGE 
        {
            this.setVelocity( dir.x, dir.y )    
            this.setTint(0xff0000)
        
            this.healthState = HealthState.DAMAGE
            this.damageTime = 0
        }
    }


    preUpdate(t: number, dt: number)
    {
        super.preUpdate(t, dt)

        switch(this.healthState)
        {
            case HealthState.IDLE:
                break
            
            case HealthState.DAMAGE:
                this.damageTime += dt
                if (this.damageTime >= 250)
                {
                    this.healthState = HealthState.IDLE
                    this.setTint( 0xffffff)
                    this.damageTime = 0
                }
                break
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys)
    {
        if( this.healthState === HealthState.DAMAGE)
        {
            return
        }

        if( this.healthState === HealthState.DEAD)
        {
            cursors = null
        }


        if (!cursors)
        {
            return
        }

        let speed = 250             // <-------  Speed of the player's ship when accelerating
        let floating_speed = 80     // <-------  floating velocity

        const directn = new Phaser.Math.Vector2(0, 0)
        directn.setToPolar(this.rotation, 1)

        let dx = directn.x 
        let dy = directn.y 

        if (cursors.up?.isDown)
        {             
            if (cursors.left?.isDown)
            {   
                // Rotating Ship direction on pressing left
                this.angle -= speed * 0.012 
            }
            else if (cursors.right?.isDown)
            {
                // Rotating Ship direction on pressing Right
                this.angle += speed * 0.012
            }
            
            // Moving Ship forward on pressing Up            
            this.setVelocity(speed * dx, speed * dy)
            
        }

        else if (cursors.down?.isDown)
        {            
            if (cursors.right?.isDown)
            {
                // Rotating Ship direction on pressing right
                this.angle -= speed * 0.012
            }
            else if (cursors.left?.isDown)
            {
                // Rotating Ship direction on pressing left
                this.angle += speed * 0.012
            }            
            
            // Moving Ship backward on pressing down
            this.setVelocity(-speed * 0.7 * dx, -speed * 0.7 * dy)
        }

        else
        {
            this.angle += 0            
            this.setVelocity(floating_speed * dx, floating_speed * dy)
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('player', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number)
{
    var sprite = new Player( this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.75)

    return sprite
})