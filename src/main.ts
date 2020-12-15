import Phaser from 'phaser'

import LoadingScene from './scenes/LoadingScreen'
import Preloader from './scenes/Preloader'
import Game from './scenes/Game'

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
			// debug: true				<--- uncomment this for debug mode, shows bounding border of the player
		}
	},
	scene: [LoadingScene, Preloader, Game],
	// scale : {
	// 	zoom : 2
	// }
	
}

export default new Phaser.Game(config)
