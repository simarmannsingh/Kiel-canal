export default class CountdownController
{
    private scene: Phaser.Scene
    private label: Phaser.GameObjects.Text
    private timerEvent: Phaser.Time.TimerEvent
    private duration = 0
    private finishedCallback: () => {}

    constructor(scene:Phaser.Scene, label:Phaser.GameObjects.Text)
    {
        this.scene = scene
        this.label = label
    }

    start( callback:() => {} , duration = 45000 )
    {
        
        this.stop()

        this.finishedCallback = callback
        this.duration = duration
        
        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                // this.label.text = '0'

                this.stop()
                
                if (callback)
                {
                    callback()
                }
            }
        })
    }

    stop()
    {
        if (this.timerEvent)
        {
            this.timerEvent.destroy()
            this.timerEvent = undefined
        }
    }

    update()
    {
        if(!this.timerEvent || this.duration <= 0)  
        {
            return
        }

        const elapsed = this.timerEvent.getElapsed()
        const remaining = this.duration - elapsed

        const seconds = remaining / 1000

        this.label.text = seconds.toFixed(2)
        
    }
}