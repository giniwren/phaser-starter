(function (Loaders) {
  'use strict';

  function AssetLoader (game, assets, textureAtlasJSONHash) {
    // load all images
    if (assets.images) {
      for (var i = 0; i < assets.images.length; i++) {
        game.load.image(assets.images[i].name, assets.images[i].path);
      }
    }

    // load all json
    if (assets.json) {
      for (var j = 0; j < assets.json.length; j++) {
        game.load.text(assets.json[j].name, assets.json[j].path);
      }
    }

    // load all JSON atlases for images
    if (assets.atlases) {
      if (!textureAtlasJSONHash) {
        console.log('Error: Can\'t load texture atlasses without Phaser.Loader.TEXTURE_ATLAS_JSON_HASH');
      } else {
        for (var k = 0; k < assets.atlases.length; k++) {
          game.load.atlasJSONArray(assets.atlases[k].name, assets.atlases[k].image, assets.atlases[k].json, textureAtlasJSONHash);
        }
      }
    }

    // load all sound assets
    if (assets.audio) {
      for (var m = 0; m < assets.audio.length; m++) {
        game.load.audio(assets.audio[m].name, assets.audio[m].path);
      }
    }
  }

  Loaders.AssetLoader = AssetLoader;
  return AssetLoader;
})(Loaders);
