import Phaser from 'phaser'

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {

    // Player's running animations
        // Idle Down animation
        anims.create({
            key: 'faune-idle-down',
            frames: [{ key: 'faune', frame: 'run-down-1.png' }]
        })

        // idle Up animation
        anims.create({
            key: 'faune-idle-up',
            frames: [{ key: 'faune', frame: 'run-up-1.png' }]
        })

        // Idle side animation
        anims.create({
            key: 'faune-idle-side',
            frames: [{ key: 'faune', frame: 'run-side-1.png' }]
        })      

        // Running Down Animation
        anims.create({
            key: 'faune-run-down',
            frames: anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-down-', suffix: '.png'}),
            repeat: -1,
            frameRate: 13
        })

        // Running up animation
        anims.create({
            key: 'faune-run-up',
            frames: anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-up-', suffix: '.png'}),
            repeat: -1,
            frameRate: 13
        })

        // Running side animation
        anims.create({
            key: 'faune-run-side',
            frames: anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-side-', suffix: '.png'}),
            repeat: -1,
            frameRate: 13
        })
}

export { 
    createCharacterAnims
}