import Phaser from 'phaser'

import LoadingScene from './scenes/LoadingScreen'
import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameUI from './scenes/GameUI'
import IntroductionScreenLevel1 from './scenes/IntroductionScreenLevel1'
import IntroductionScreenLevel2 from './scenes/IntroductionScreenLevel2'
import InformationScreen from './scenes/InformationScreen'
import CountdownController from './scenes/CountdownController'
import Leveltwo from './scenes/Leveltwo'
import Congrats from './scenes/Congrats'
import Level1_map from './scenes/Level1_map'
import Level2_map from './scenes/Level2_map'

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
	scene: [LoadingScene, 
		IntroductionScreenLevel1, 
		CountdownController,
		InformationScreen, 
		Preloader, 
		Game, 
		Level1_map,
		IntroductionScreenLevel2,
		Leveltwo,
		Level2_map,
		GameUI,
		Congrats],
	// scale : {
	// 	zoom : 2
	// }
	
}

export default new Phaser.Game(config)
