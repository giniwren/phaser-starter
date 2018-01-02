# Phaser Starter
This project is a starter for a Phaser JS project that includes automatic asset loading, an ExpressJS server for serving local assets needed for the game, and an example mocha test for unit tests.

## Getting Started
To run this project, a minified version of Phaser CE needs to be added to the `src/static/lib` directory. This can be found in the releases of [Phaser CE's GitHub repository](https://github.com/photonstorm/phaser-ce).

After that, the following commands will assist in running the project.
```bash
# install node modules listed in package json
npm install

# run the server
# while this is running, game will be available at localhost:3000
npm start

# run mocha tests
npm test
```

### General File Structure
The main game files for Phaser are in `src/static/js/game` and `src/static/js/game/states`. These are partial files that, when put together in order (see the `Automatic Javascript Building` section below), define the main game logic to run the Phaser game. Other files in the example have their own function closures and are loaded before the main game files so they can be passed into function arguments. To see an example of this, look at `Loaders` and `AssetLoader` provided in `src/static/js/loaders`, used to load static assets into the game (called in `preload` function of `src/static/js/game/play.js`).

### Automatic Javascript Building
While the app is running with `npm start`, all files within `src/static` are watched for changes. When changes are detected, the app reloads and runs a script to combine and minify the project's javascript files. The output of the script is written to `src/static/js/build.min.js`. The files to be included are listed in `config.json` -- included in the repository for better visibility into how things work -- under the key `jsFiles`. This is done to preserve the order needed for the partial game files (mentioned earlier in the `General File Structure` section).

To manually combine and minify the javascript, you can run `npm run build`. To combine the javascript without minifying it, you can run `npm run build -- --skip-minify` (mind the extra double dashes).

### Game States
The boot state is in `src/static/js/game/states/boot.js`, and it's in charge of loading any initial assets (in this example, the json that defines all the other static assets the game needs, like images, audio, and texture atlases with their corresponding json). The primary state of the game is in `src/static/js/game/states/play.js` which contains the main start function and the state's update and render loops. Should your game require other states, they can be created and added in a similar fashion to these states.

### Asset Loading
To add assets that the `AssetLoader` will pick up, their paths can be added to `static/json/assets.json`. For more information on what can be added, see the comments and code in `AssetLoader` itself, located in `src/static/js/loaders/asset-loader.js`.



