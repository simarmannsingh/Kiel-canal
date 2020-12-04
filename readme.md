![phaser3-parceljs-template](https://user-images.githubusercontent.com/2236153/71606463-37a0da80-2b2e-11ea-9b5f-5d26ccc84f91.png)

# KielCanal Game
> For people who want to spend time making games instead of configuring build tools.

![License](https://img.shields.io/badge/license-MIT-green)

This is an official repository for the Kiel Canal Game, which is created as part of a project to be displayed to open public at the Muesem.

The game is created to showcase the significance and evolution of Kiel Canal, also keeping in mind the audience of the game, which would be children under the age of 13. The Game provides a brief overview of the operation and environment effect of ancient Kiel (Schleswig Holstein) waterways and how the creation of Kiel Canal has revolutionarised the waterways along with saving the environment. The resources saved on a daily basis are tremendous. Kiel Canal is one of the most busiest waterways in the entire Northern Europe.

## Prerequisites

To play the game, you simply have to visit the link mentioned on the right side of the page and the game should load in your web browser. Game should work flawlessly on almost all of the modern web browser. If any problem is encountered, please use the issues tab to create a 'issue' and the developer will respond within 24-48 hrs.

The game is released as Open-Source project to everyone. Anyone is free to read and modify the source code of the project and can use it in their own non-commercial projects without written permission.
However, for commercial projects, a written permission of the developer is required.

To run the project on your machine, You'll need [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [Parcel](https://parceljs.org/) installed.

It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) to install Node.js and npm.

For Windows users there is [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows).

Install Node.js and `npm` with `nvm`:

```bash
nvm install node

nvm use node
```

Replace 'node' with 'latest' for `nvm-windows`.

Then install Parcel:

```bash
npm install -g parcel-bundler
```

## Getting Started

Clone this repository to your local machine:

```bash
git clone https://github.com/ourcade/phaser3-parcel-template.git
```

This will create a folder named `phaser3-parcel-template`. You can specify a different folder name like this:

```bash
git clone https://github.com/ourcade/phaser3-parcel-template.git my-folder-name
```

Go into your new project folder and install dependencies:

```bash
cd phaser3-parcel-template # or 'my-folder-name'
npm install
```

Start development server:

```
npm run start
```

To create a production build:

```
npm run build
```

Production files will be placed in the `dist` folder. Then upload those files to a web server. 🎉

## Project Structure

```
    .
    ├── dist
    ├── node_modules
    ├── public
    ├── src
    │   ├── scenes
    │   │   ├── Game.ts
    │   ├── index.html
    │   ├── main.js
    ├── package.json
```

The contents of this template is the basic [Phaser3 getting started example](http://phaser.io/tutorials/getting-started-phaser3/part5).

This template assumes you will want to organize your code into multiple files and use modern JavaScript (or TypeScript).

JavaScript files are intended for the `src` folder. `main.js` is the entry point referenced by `index.html`.

Other than that there is no opinion on how you should structure your project. There is a `scenes` folder in `src` where the `HelloWorldScene.js` lives but you can do whatever you want.

## Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served at http://localhost:8000/images/my-image.png

Example `public` structure:

```
    public
    ├── assets
    │   ├── faune.png
    ├── music
    │   ├── ...
    ├── sfx
    │   ├── ...
```

They can then be loaded by Phaser with `this.image.load('my-image', 'images/faune.png')`.

## Class Properties Support

This template includes class property support out of the box using `@babel/plugin-proposal-class-properties`.

A `.babelrc` is included as well as the use of `babel-eslint` as the parser for ESLint.

# ESLint

This template uses a basic `eslint` set up for code linting to help you find and fix common problems in your JavaScript code.

It does not aim to be opinionated.

[See here for rules to turn on or off](https://eslint.org/docs/rules/).

## TypeScript

Check out the [phaser3-typescript-parcel-template](https://github.com/ourcade/phaser3-typescript-parcel-template) for a ready-to-use version of this template in TypeScript!

## Dev Server Port

You can change the dev server's port number by modifying the `start` script in `package.json`. We use Parcel's `-p` option to specify the port number.

The script looks like this:

```
parcel src/index.html -p 8000
```

Change 8000 to whatever you want.

## Other Notes

[parcel-plugin-clean-easy](https://github.com/lifuzhao100/parcel-plugin-clean-easy) is used to ensure only the latest files are in the `dist` folder. You can modify this behavior by changing `parcelCleanPaths` in `package.json`.

[parcel-plugin-static-files](https://github.com/elwin013/parcel-plugin-static-files-copy#readme) is used to copy static files from `public` into the output directory and serve it. You can add additional paths by modifying `staticFiles` in `package.json`.

## License

[MIT License](https://github.com/ourcade/phaser3-parcel-template/blob/master/LICENSE)
