app.controller("PreloadContrl", function($scope,$state,state_svc,preloader,asset_svc) {
	
  $scope.asset_svc = asset_svc;
  
  $scope.preloadImages = {
    'test-tiles':'tilesets/test_tiles_16.png'	  
  };

  console.log(preloader);
  preloader.preloadImages( $scope.preloadImages)
  .then(function(result) {
	  console.log(result);
	  var keys = Object.keys(result);
	  for (var i = 0; i < keys.length; i++) {
		console.log(result[keys[i]]);
	    $scope.asset_svc.add(keys[i],result[keys[i]]);	  
	  }
	  state_svc.setState('menu');
	  // Loading was successful.
  },
  function() {
      // Loading failed on at least one image.
  });  

});
