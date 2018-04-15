app.controller("PlayGameContrl", function($scope,$state,state_svc,character_svc,preloader,asset_svc) {
  
  $scope.addActor = function(params) {
    var actor = new Actor(params);
    actor.sprite.draw();
	$scope.actors.push(actor);
	var key = $scope.map.getKey(params.x,params.y);
	delete $scope.map.openTiles[key];
	
  }

  $scope.asset_svc = asset_svc;
  
  $scope.character = character_svc.getCharacter();
  console.log($scope.character);
  $scope.state_svc= state_svc;
  $scope.title = 'new';

  console.log(preloader);

  $scope.map = new Tilemap({'height':20,'width':20,'tileHeight':16,'tileWidth':16,'assets':asset_svc});
  $scope.map.addTileSrc('test-tiles',{'ground':[1],'wall':[2]});
  $scope.map.addLayer('layer-0','test-tiles');
  $scope.map.addLayer('sprite-layer');
  $scope.map.randomMap('layer-0');
  
  $scope.actors = [];

  /* TODO - move map and actor generation to a game_svc */  
  $scope.playerIndex = 0;
  
  angular.element(document).ready(function () {
	 for (i = 0; i < $scope.map.layers.length; i++) {
	    $scope.map.layers[i].ctx = document.getElementById($scope.map.layers[i].id).getContext('2d');	
	    $scope.map.drawMap('test-tiles');
	 }
	 
	 // Actors
	 pos = $scope.map.getRandomOpenTile();
	 player_sprite = new Sprite({
	   img:asset_svc.get('test-tiles'),
	   width:16,
	   height:16,
	   frameIndex:4,
	   ctx:$scope.map.getLayer('sprite-layer').ctx,
	   position:pos
	 });
	 
	 // Player
	 $scope.addActor({
	   name: $scope.character.name,
	   controller: 'player',
	   map:$scope.map,
	   x: pos.x,
	   y: pos.y,
	   sprite: player_sprite
	 });

	 
  });
        
});
