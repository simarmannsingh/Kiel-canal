import Phaser from 'phaser'

const debugDraw = (layer: Phaser.Tilemaps.TilemapLayer, scene: Phaser.Scene) => {
 
    const debugGraphics = scene.add.graphics().setAlpha(0.7)
        layer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(0, 0, 0, 255),
            faceColor: new Phaser.Display.Color(40,39, 37, 255)
        })
}

export {debugDraw} ;