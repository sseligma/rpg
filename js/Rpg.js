    Phaser.Game.prototype.addActor = function(params) {
    	var actor = new Actor(params);
      this.actors.push(actor);
    }
