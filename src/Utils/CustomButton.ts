import Phaser from 'phaser'

export default class CustomButton extends Phaser.GameObjects.Container
{
    private onImg: Phaser.GameObjects.Image
    private overImg: Phaser.GameObjects.Image
    private Text : Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y:number, onTexture: string, overTexture: string, ButtonText: string)
    {
        super(scene, x, y)
        
        this.onImg = scene.add.image(0, 0, onTexture)
        this.overImg = scene.add.image(0, 0, overTexture)
        this.Text = scene.add.text(0, 0, ButtonText).setOrigin(0.5) 
        
        this.add(this.onImg)
        this.add(this.overImg)
        this.add(this.Text)

        this.overImg.setVisible(false)

        this.setSize(this.onImg.width, this.onImg.height)

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.onImg.setVisible(false)
                this.overImg.setVisible(true)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.onImg.setVisible(true)
                this.overImg.setVisible(false)
            })
    }    

}