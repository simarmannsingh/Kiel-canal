import Phaser from 'phaser'

import LoadingScene from './scenes/LoadingScreen'
import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameUI from './scenes/GameUI'
import Introduction from './scenes/Introduction'
// import CountdownController from './scenes/CountdownController'

const config = {
	type: Phaser.AUTO,
	// parent: 'phaser-container',
	// dom: {
	// 	createContainer: true
	// } ,
	width: 	(window.innerWidth -4)* window.devicePixelRatio,							//  res.screen_width,
	height: (window.innerHeight -4)* window.devicePixelRatio,							// res.screen_height,
	backgroundColor: "#4488AA",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			// debug: true			//	<--- uncomment this for debug mode, shows bounding border of the player
		}
	},
	scene: [LoadingScene, Introduction, Preloader, Game, GameUI],
	// scale : {
	// 	zoom : 2
	// }
	
}

export default new Phaser.Game(config)
