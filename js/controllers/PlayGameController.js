app.controller("PlayGameContrl", function($scope,$state,state_svc,character_svc,preloader,asset_svc) {
  $scope.asset_svc = asset_svc;
  
  $scope.character = character_svc.getCharacter();
  console.log($scope.character);
  $scope.state_svc= state_svc;
  $scope.title = 'new';

  console.log(preloader);

  $scope.map = new Tilemap({'height':20,'width':20,'tileHeight':16,'tileWidth':16,'assets':asset_svc});
  $scope.map.addTileSrc('test-tiles');
  $scope.map.addLayer('layer-0','test-tiles');
  $scope.map.addLayer('sprite-layer');
  $scope.map.randomMap('layer-0');
  
  
  
  angular.element(document).ready(function () {
	 for (i = 0; i < $scope.map.layers.length; i++) {
	    $scope.map.layers[i].ctx = document.getElementById($scope.map.layers[i].id).getContext('2d');	
	    $scope.map.drawMap('test-tiles');
	 }
  });
        
});
