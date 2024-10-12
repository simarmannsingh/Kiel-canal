import Phaser from 'phaser'
import { sceneEvents } from '../Events/EventsCenter'

export default class GameUI extends Phaser.Scene
{
    private hearts: Phaser.GameObjects.Group
    timeText: Phaser.GameObjects.Text
    gameRuntime: any
    hasGameEnded: boolean
    constructor()
    {
        super({key: 'game_ui'})

    }

    create()
    {
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        })

        this.hearts.createMultiple({
            key: 'ui_heart_full',
            setXY: {
                x: 25,
                y: 25,
                stepX: 40
            },
            setScale: {
                x: 2.5,
                y: 2.5
            },
            quantity: 4
        })

        sceneEvents.on('player_health_changed', this.handlePlayerHealthChanged, this)

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('player_health_changed', this.stopTimer, this)
        })

        var timeTextStyle = {font: "24px Roboto", fill: '#fff', stroke: '#E43AA4', strokeThickness: 4};
        this.add.text((window.innerWidth - 300), 15, 'Press Shift for Map', timeTextStyle);
        this.timeText = this.add.text((window.innerWidth - 300), 40, "Time Survived: ", timeTextStyle);
        sceneEvents.on('player_health_changed', this.stopTimer,this)

    }

    stopTimer()
    {
        this.hasGameEnded = true
        this.handlePlayerHealthChanged
    }

    update()
    {
        if (!this.hasGameEnded){
            this.gameRuntime = this.time.now * 0.001; //Converted to Seconds
            this.timeText.setText("Time Survived: " + Math.round(this.gameRuntime) + " seconds");
        } else {
            this.timeText.setText("Time Survived: " + Math.round(this.gameRuntime) + " seconds");
        }
   
    }

    private handlePlayerHealthChanged( getHealth: number)
    {
        this.hearts.children.each((go, idx) => {
            const heart = go as Phaser.GameObjects.Image
            if (idx < getHealth)
            {
                heart.setTexture('ui_heart_full')
            }
            else
            {
                heart.setTexture('ui_heart_empty')
            }
        })
    }
}