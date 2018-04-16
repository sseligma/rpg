app.controller("PlayGameContrl", function($scope,$state,state_svc,character_svc,preloader,asset_svc,game_svc) {
  $scope.game_svc = game_svc;
  
  $scope.asset_svc = asset_svc;
  
  $scope.character = character_svc.getCharacter();
  console.log($scope.character);
  $scope.state_svc= state_svc;
  $scope.title = 'new';

  console.log(preloader);

  $scope.game_svc.setMap(new Tilemap({'height':20,'width':20,'tileHeight':16,'tileWidth':16,'assets':asset_svc}));

  $scope.game_svc.getMap().addTileSrc('test-tiles',{'ground':[1],'wall':[2]});
  $scope.game_svc.getMap().addLayer('layer-0','test-tiles');
  $scope.game_svc.getMap().addLayer('sprite-layer');
  $scope.game_svc.getMap().randomMap('layer-0');
  

  
  angular.element(document).ready(function () {
	 console.log($scope.game_svc.getMap());
	 for (i = 0; i < $scope.game_svc.getMap().layers.length; i++) {
		  console.log($scope.game_svc.getMap().layers[i].id);

	    $scope.game_svc.getMap().layers[i].ctx = document.getElementById($scope.game_svc.getMap().layers[i].id).getContext('2d');	
	    $scope.game_svc.getMap().drawMap('test-tiles');
	 }
	 
	 // Actors
	 pos = $scope.game_svc.getMap().getRandomOpenTile();
	 player_sprite = new Sprite({
	   img:asset_svc.get('test-tiles'),
	   width:16,
	   height:16,
	   frameIndex:4,
	   ctx:$scope.game_svc.getMap().getLayer('sprite-layer').ctx,
	   position:pos
	 });
	 
	 // Player
	 game_svc.addActor({
	   name: $scope.character.name,
	   controller: 'player',
	   x: pos.x,
	   y: pos.y,
	   sprite: player_sprite
	 });

	 
  });
        
});
