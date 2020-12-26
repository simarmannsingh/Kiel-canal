export default class checkResolution 
{
    public screen_width: number
    public screen_height: number

    constructor()
    {
        this.screen_width = window.screen.width
        this.screen_height = window.screen.height
    }

    get checkRes()
    {
        return [this.screen_width, this.screen_height]
    }

}