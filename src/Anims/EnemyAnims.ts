import Phaser from 'phaser'

const createEnemyAnim = (anims: Phaser.Animations.AnimationManager) => {

    anims.create({
        key: 'idle',
        frames: anims.generateFrameNames('fire', {start: 0 , end: 3, prefix: 'alpha', suffix: '.png'}),
        repeat: -1,
        frameRate: 10
    })
}

export {
    createEnemyAnim
}
