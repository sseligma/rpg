app.controller("NewGameContrl", function($scope,$state,state_svc,character_svc) {
  $scope.character = character_svc.getCharacter();
  console.log($scope.character);
  $scope.state_svc= state_svc;
  $scope.title = 'new';
        
  $scope.create = function() {
	character_svc.setCharacter($scope.character);
    $scope.state_svc.setState('play');
  }
});
