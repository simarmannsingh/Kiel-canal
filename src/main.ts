import Phaser from 'phaser'

import LoadingScene from './scenes/LoadingScreen'
import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameUI from './scenes/GameUI'

const config = {
	type: Phaser.AUTO,
	// parent: 'phaser-container',
	// dom: {
	// 	createContainer: true
	// } ,
	width: 1280,
	height: 900,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			// debug: true			//	<--- uncomment this for debug mode, shows bounding border of the player
		}
	},
	scene: [LoadingScene, Preloader, Game, GameUI],
	// scale : {
	// 	zoom : 2
	// }
	
}

export default new Phaser.Game(config)
