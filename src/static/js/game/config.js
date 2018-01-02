/**
 * Partial for initial game configuration, before states are loaded
 */

// base game width when 1 pixel is 1 pixel size onscreen
var GAME_WIDTH = 640;
var GAME_HEIGHT = 360;

// make those logs pretty
var LOG_INFO_COLOR = 'color:cadetblue;';

// ID of the html element inside which the canvas will be place
var PARENT_CONTAINER = 'game-container';
// no antialias for that good good old school aesthetic
var ANTIALIAS = false;

// state names
var stateNames = {
  'boot': 'boot',
  'play': 'playState'
};

// configure and start Phaser
var gameConfig = {
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  renderer: Phaser.AUTO,
  parent: PARENT_CONTAINER,
  antialias: ANTIALIAS
};
var game = new Phaser.Game(gameConfig);
