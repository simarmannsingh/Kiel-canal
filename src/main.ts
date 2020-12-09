import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import LoadingScene from './scenes/LoadingScreen'

const config = {
	type: Phaser.AUTO,
	// parent: 'phaser-container',
	// dom: {
	// 	createContainer: true
	// } ,
	width: 1280,
	height: 960,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		}
	},
	scene: [LoadingScene, Preloader, Game],
	// scale : {
	// 	zoom : 2
	// }
	
}

export default new Phaser.Game(config)
