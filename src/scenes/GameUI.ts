import Phaser from 'phaser'
import { sceneEvents } from '../Events/EventsCenter'

export default class GameUI extends Phaser.Scene
{
    private hearts: Phaser.GameObjects.Group
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
            sceneEvents.off('player_health_changed', this.handlePlayerHealthChanged, this)
        })
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