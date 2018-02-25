var app = angular.module('rpgApp', ['ui.bootstrap']);

app.controller('RpgController', function($scope,$location,$http,$window,$timeout) {

  $scope.getTemplate = function() {
    return $scope.template;
  }

	
  $scope.template = 'js/templates/intro.html';
});


/*
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: 'js/templates/intro.html', controller: 'IntroCtrl'})
    .when('/play', {templateUrl: 'js/templates/play.html', controller: 'PlayCtrl'})   
});

app.controller('IntroCtrl', function($scope,$routeParams,$location,$http,$window,$timeout) {
  $scope.uiClass = 'intro';
});	  

app.controller('PlayCtrl', function($scope,$routeParams,$location,$http,$window,$timeout) {
  $scope.uiClass = 'play';
});	  
*/

