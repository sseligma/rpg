    Phaser.Game.prototype.addActor = function(params) {
      var actor = new Actor(params);
      this.actors.push(actor);
      var key = map.getKey(params.x,params.y);
      delete map.openTiles[key];
    }
