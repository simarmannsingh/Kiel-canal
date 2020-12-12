![phaser3-parceljs-template](https://user-images.githubusercontent.com/2236153/71606463-37a0da80-2b2e-11ea-9b5f-5d26ccc84f91.png)

# KielCanal Game

![License](https://img.shields.io/badge/license-MIT-green)

![Kiel Canal Spiel](https://github.com/simarmannsingh/Kiel-canal/blob/master/background.png)

> This is an official repository for the Kiel Canal Game, which is created as part of a project to be displayed to open public at the Muesem.

The KielCanal game is created using the Phaser3 + Parcel template created by [*ourcade*](https://github.com/ourcade/phaser3-parcel-template). Thanks a lot SuperTommy, the superman of Phaser Games.

This game is designed to showcase the significance and evolution of Kiel Canal, also keeping in mind the audience of the game, which typically would be children under the age of 13. The Game provides a brief overview of the operation and environment effect of ancient Kiel (Schleswig-Holstein) waterways and how the creation of Kiel Canal has revolutionarised the waterways along with saving the environment. The resources saved on a daily basis are tremendous. Kiel Canal is one of the most busiest waterways in the entire Northern Europe even today.

## How to play

To play the game, you simply have to visit the link mentioned on the right side of the page and the game should load in your web browser. Game should work flawlessly on almost all of the modern web browser. If any problem is encountered, please use the issues tab to create a 'issue' and the developer will respond within 24-48 hrs.

You can use arrow keys to navigate the ship and find your way through the map, reaching the goal within time limit.

## Development

The game is released with an MIT licence. This means anyone is free to modify and use the source code of the project in their own commercial or non-commercial projects without written permission. The copyright notice and permission notice shall be included in all copies or substantial portions of the Software.

To run the project on your machine, You'll need [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [Parcel](https://parceljs.org/) installed.

It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) to install Node.js and npm.

For Windows users there is [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows).

Install Node.js and `npm` with `nvm`:


    nvm install node
    nvm use node


Replace 'node' with 'latest' for `nvm-windows`.

Then install Parcel:

    npm install -g parcel-bundler


## Getting Started

Clone this repository to your local machine:

    git clone https://github.com/simarmannsingh/Kiel-canal.git

You might need to install all the dependencies first and then you can run the software
To do so,

    cd KielCanal
    npm install

This should install all the dependencies. Then, start the development server using

    npm start

To run a production build:

    npm run build

Production files will be placed in the `dist` folder. Then upload those files to a web server.

## Project Structure

```
    .
    ├── dist
    ├── node_modules
    ├── public
    ├── src
    │   ├── Anims
    │   │   ├── CharacterAnims.ts
    │   │   ├── EnemyAnims.ts
    │   ├── Enemies
    │   │   ├── Enemies.ts
    │   ├── scenes
    │   │   ├── Game.ts
    │   │   ├── Preloader.ts
    │   ├── index.html
    │   ├── main.js
    ├── package.json
```

## License

[MIT License](https://github.com/simarmannsingh/Kiel-canal/blob/master/LICENSE)
