    Phaser.Game.prototype.addActor = function(params) {
      var actor = new Actor(params);
      this.actors.push(actor);
      var key = map.getKey(params.x,params.y);
      delete map.openTiles[key];
    }

    Phaser.Game.prototype.addMapSprite = function(map,x,y,sprite) {
      return this.add.sprite(x * map.tileWidth,y * map.tileHeight, sprite);
    }
    