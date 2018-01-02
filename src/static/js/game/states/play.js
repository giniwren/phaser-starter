/* globals Phaser, Loaders, LOG_INFO_COLOR, game, stateNames, GAME_WIDTH, GAME_HEIGHT */

var bgLayer, actorsLayer, uiLayer;

/**
 * Start play prototype, the state where the main game loop takes place.
 */
var play = function() {
  console.log('%cAdding play state...', LOG_INFO_COLOR);
};

/**
 * Sets up various game functions for the main "play" state.
 */
play.prototype = {
  preload: preload,
  create: startGame,
  render: render,
  update: update
};

/**
 * Load remaining assets defined in assets JSON
 */
function preload(game) {
  console.log('%cLoading primary game assets...', LOG_INFO_COLOR);
  var assets = JSON.parse(game.cache.getText('assets'));
  Loaders.AssetLoader(game, assets, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
}

/**
 * Main function for getting everything going
 */
function startGame(game) {
  console.log('%cGame started.', LOG_INFO_COLOR);

  // initialize layers needed for this state
  bgLayer = game.add.group();
  actorsLayer = game.add.group();
  uiLayer = game.add.group();

  // load background image
  var bg = game.add.sprite(0, 0, 'background');
  bgLayer.add(bg);

  // load PC
  var pc = game.add.sprite(0, 0, 'dude');
  actorsLayer.add(pc);
}

/**
 * State's main update loop
 */
function update() {}

/**
 * State's main render loop
 */
function render() {}

// add state to game
game.state.add(stateNames.play, play);
