/**
 * Start boot prototype, the state during which initial game assets are loaded
 */
var boot = function() {
  console.log('%cAdding boot state...', LOG_INFO_COLOR);
};

/**
 * Sets up various game functions for the "boot" state
 */
boot.prototype = {
  preload: startBoot
};

/**
 * Start processes required for booting the game
 */
function startBoot(game) {
  console.log('%cBooting...', LOG_INFO_COLOR);

  // add event that transfers game to the next game state after asset loading
  // has completed
  game.load.onLoadComplete.addOnce(function () {
    game.state.start(stateNames.play);
  }, this);

  // load assets required for starting the game
  loadInitialAssets(game);
}

/**
 * Load initial assets for the game
 */
function loadInitialAssets(game) {
  console.log('%cLoading initial game assets...', LOG_INFO_COLOR);

  // load json specifying what assets are needed for the game
  game.load.text('assets', 'json/assets.json');

  // manually tell phaser to load assets that are queued up above
  game.load.start();
}

// add state to game
game.state.add(stateNames.boot, boot);
