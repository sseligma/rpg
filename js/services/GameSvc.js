app.factory('game_svc', function($rootScope) {
  var actors = [];
  var map;
  var playerIndex = 0;
  

  return {
	addActor:function(params) {
	  params.map = map;
      var actor = new Actor(params);
	  actor.sprite.draw();
	  actors.push(actor);
	  var key = map.getKey(params.x,params.y);
      delete map.openTiles[key];
	},
    setMap:function(_map) {
	  map = _map;
    },
    getMap:function() {
      return map;
    },
    getActors:function() {
      return actors;
    },
    getActor:function(i) {
      return actors[i];
    }

  }

});