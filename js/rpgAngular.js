var app = angular.module('rpgApp', ['ui.router','ngRoute','ui.bootstrap']);

app.factory('game_svc', function(character_svc,$rootScope) {
	  character = character_svc;
	  game = new Phaser.Game(320, 320, Phaser.AUTO, 'game-gfx', { preload: preload, create: create});
	    
	  function preload() {

		game.load.image('tiles', 'tilesets/test_tiles_16.png');
		            
		game.load.spritesheet('sprite_sheet', 'tilesets/test_tiles_16.png', 16, 16, 5);
		game.load.image('player_sprite', 'assets/player_16.png');
		      	  
		game.load.image('enemy_sprite', 'assets/enemy.png');
		game.load.image('highlight_sprite', 'assets/highlight_16.png');           
	  };
	  
	  function create() {
	     game.actors = [];

	 	 game.stage.backgroundColor = '#ff0000';

	 	  map = game.add.tilemap();

	 	  //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
	 	  //  The second parameter maps this name to the Phaser.Cache key 'tiles'
	 	  map.addTilesetImage('tiles','tiles',16,16);
	 	  map.randomDungeon();          
	 	  
	 	  pos = map.getRandomOpenTile();
	 	  console.log('placing actor at ');
	 	  console.log(pos);
	     game.addActor({
	       name: character.get('name'),
	       controller: 'player',
	       map:map,
	       x: pos.x,
	       y: pos.y,
	       sprite: "player_sprite"
	     });

	     for (var i = 0; i < game.rnd.integerInRange(1, 10); i++) {
	     	pos = map.getRandomOpenTile();
	       game.addActor({
	         name: 'Enemy ' + i,
	         map: map,
	         x: pos.x,
	         y: pos.y,
	         sprite: "enemy_sprite"
	       });
	     }

	     playerIndex = 0;

	    // Cursor Keys
	    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    upKey.onDown.add(function(){game.actors[playerIndex].move('N')}, this);
	    
	    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	    downKey.onDown.add(function(){game.actors[playerIndex].move('S')}, this);

	    
	    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    leftKey.onDown.add(function(){game.actors[playerIndex].move('W')}, this);

	    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	    rightKey.onDown.add(function(){game.actors[playerIndex].move('E')}, this);
	    
	    //Numpad Keys
	    num8Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
	    num8Key.onDown.add(function(){game.actors[playerIndex].move('N')}, this);
	    
	    num9Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
	    num9Key.onDown.add(function(){game.actors[playerIndex].move('NE')}, this);

	    num6Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
	    num6Key.onDown.add(function(){game.actors[playerIndex].move('E')}, this);

	    num3Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
	    num3Key.onDown.add(function(){game.actors[playerIndex].move('SE')}, this);

	    num2Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
	    num2Key.onDown.add(function(){game.actors[playerIndex].move('S')}, this);

	    num1Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
	    num1Key.onDown.add(function(){game.actors[playerIndex].move('SW')}, this);

	    num4Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
	    num4Key.onDown.add(function(){game.actors[playerIndex].move('W')}, this);

	    num7Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
	    num7Key.onDown.add(function(){game.actors[playerIndex].move('NW')}, this);
	    
	    // mouse clicks
	    game.input.onDown.add(function(pointer, event) { 
	 	   // get tile position
	 	   var pos = new Position(Math.floor(event.x / map.tileWidth),Math.floor(event.y / map.tileHeight));
	 	   console.log(pos);
	    });

	  }

	  var getGame = function(){
	    return game;
	  };

	  var setScope = function(scope) {
	    game.scope = scope;	  
	  }
	  
	  return {
		getGame: getGame,
		setScope:setScope
	  };

	});


app.config(function($stateProvider,$urlRouterProvider) {
	
    $urlRouterProvider.otherwise('/');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('preload', {
        url: '/',
        templateUrl: 'js/templates/preload.html',
        controller: 'PreloadContrl'
    })

       // HOME STATES AND NESTED VIEWS ========================================
        .state('menu', {
            templateUrl: 'js/templates/menu.html',
            controller: function($scope,$state,state_svc,preloader) {
              $scope.state_svc= state_svc;
              $scope.title = 'RPG';
              
            }
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('new', {
            // we'll get to this in a bit       
            templateUrl: 'js/templates/game-new.html',
            controller: 'NewGameContrl'
        })

        .state('load', {
            // we'll get to this in a bit       
            templateUrl: 'js/templates/game-load.html',
            	controller: function($scope,$state,state_svc) {
                    $scope.state_svc= state_svc;
                    $scope.title = 'load';
                    
                  }

        })
        .state('play', {
            // we'll get to this in a bit       
            templateUrl: 'js/templates/game-play.html',
            controller: 'PlayGameContrl'
        })

});


/*
app.controller('HomeCtrl', function($scope,character_svc,$routeParams,$location,$http,$window,$timeout) { 
  $scope.viewClass = 'home';

  $scope.player = {
	'name':''	  
  };
  
  $scope.character_svc = character_svc;
  
  $scope.enterName = function(e) {
	if (e.charCode == 13) {
	  $scope.character_svc.setName($scope.player.name);
	  console.log($scope.player.name);
      location.hash = "#/game";
	}  
  };
  
});	  

app.controller('GameCtrl', function($scope,game_svc,character_svc,$routeParams,$location,$http,$window,$timeout) {
  $scope.character = character_svc;
  console.log($scope.character);
  console.log($scope.character.get('name'));
  $scope.viewClass = 'game';
  $scope.text_console = 'welcome';
  character = character_svc;
  console.log(character);
  if (game == undefined) {
  game = new Phaser.Game(320, 320, Phaser.AUTO, 'game-gfx', { preload: preload, create: create});
    
  function preload() {

	game.load.image('tiles', 'tilesets/test_tiles_16.png');
	            
	game.load.spritesheet('sprite_sheet', 'tilesets/test_tiles_16.png', 16, 16, 5);
	game.load.image('player_sprite', 'assets/player_16.png');
	      	  
	game.load.image('enemy_sprite', 'assets/enemy.png');
	game.load.image('highlight_sprite', 'assets/highlight_16.png');           
  };
  
  function create() {
     game.actors = [];

 	 game.stage.backgroundColor = '#ff0000';

 	  map = game.add.tilemap();

 	  //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
 	  //  The second parameter maps this name to the Phaser.Cache key 'tiles'
 	  map.addTilesetImage('tiles','tiles',16,16);
 	  map.randomDungeon();          
 	  
 	  pos = map.getRandomOpenTile();
 	  console.log('placing actor at ');
 	  console.log(pos);
     game.addActor({
       name: character.get('name'),
       controller: 'player',
       map:map,
       x: pos.x,
       y: pos.y,
       sprite: "player_sprite"
     });

     for (var i = 0; i < game.rnd.integerInRange(1, 10); i++) {
     	pos = map.getRandomOpenTile();
       game.addActor({
         name: 'Enemy ' + i,
         map: map,
         x: pos.x,
         y: pos.y,
         sprite: "enemy_sprite"
       });
     }

     playerIndex = 0;

    // Cursor Keys
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(function(){game.actors[playerIndex].move('N')}, this);
    
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(function(){game.actors[playerIndex].move('S')}, this);

    
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(function(){game.actors[playerIndex].move('W')}, this);

    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(function(){game.actors[playerIndex].move('E')}, this);
    
    //Numpad Keys
    num8Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
    num8Key.onDown.add(function(){game.actors[playerIndex].move('N')}, this);
    
    num9Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
    num9Key.onDown.add(function(){game.actors[playerIndex].move('NE')}, this);

    num6Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
    num6Key.onDown.add(function(){game.actors[playerIndex].move('E')}, this);

    num3Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
    num3Key.onDown.add(function(){game.actors[playerIndex].move('SE')}, this);

    num2Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
    num2Key.onDown.add(function(){game.actors[playerIndex].move('S')}, this);

    num1Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
    num1Key.onDown.add(function(){game.actors[playerIndex].move('SW')}, this);

    num4Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
    num4Key.onDown.add(function(){game.actors[playerIndex].move('W')}, this);

    num7Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
    num7Key.onDown.add(function(){game.actors[playerIndex].move('NW')}, this);
    
    // mouse clicks
    game.input.onDown.add(function(pointer, event) { 
 	   // get tile position
 	   var pos = new Position(Math.floor(event.x / map.tileWidth),Math.floor(event.y / map.tileHeight));
 	   console.log(pos);
    });
  }
  }
});	  

app.controller('NewGameCtrl', function($scope,$routeParams,$location,$http,$window,$timeout) {
  $scope.uiClass = 'new-game';
});	  

app.controller('LoadGameCtrl', function($scope,$routeParams,$location,$http,$window,$timeout) {
  $scope.uiClass = 'load-game';
});	  
*/
app.factory('game_svc', function(character_svc) {
  character = character_svc;
  console.log(character);
  game = new Phaser.Game(320, 320, Phaser.AUTO, 'game-gfx', { preload: preload, create: create});
    
  function preload() {

	game.load.image('tiles', 'tilesets/test_tiles_16.png');
	            
	game.load.spritesheet('sprite_sheet', 'tilesets/test_tiles_16.png', 16, 16, 5);
	game.load.image('player_sprite', 'assets/player_16.png');
	      	  
	game.load.image('enemy_sprite', 'assets/enemy.png');
	game.load.image('highlight_sprite', 'assets/highlight_16.png');           
  };
  
  function create() {
     game.actors = [];

 	 game.stage.backgroundColor = '#ff0000';

 	  map = game.add.tilemap();

 	  //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
 	  //  The second parameter maps this name to the Phaser.Cache key 'tiles'
 	  map.addTilesetImage('tiles','tiles',16,16);
 	  map.randomDungeon();          
 	  
 	  pos = map.getRandomOpenTile();
 	  console.log('placing actor at ');
 	  console.log(pos);
     game.addActor({
       name: character.get('name'),
       controller: 'player',
       map:map,
       x: pos.x,
       y: pos.y,
       sprite: "player_sprite"
     });

     for (var i = 0; i < game.rnd.integerInRange(1, 10); i++) {
     	pos = map.getRandomOpenTile();
       game.addActor({
         name: 'Enemy ' + i,
         map: map,
         x: pos.x,
         y: pos.y,
         sprite: "enemy_sprite"
       });
     }

     playerIndex = 0;

    // Cursor Keys
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(function(){game.actors[playerIndex].move('N')}, this);
    
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(function(){game.actors[playerIndex].move('S')}, this);

    
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(function(){game.actors[playerIndex].move('W')}, this);

    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(function(){game.actors[playerIndex].move('E')}, this);
    
    //Numpad Keys
    num8Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
    num8Key.onDown.add(function(){game.actors[playerIndex].move('N')}, this);
    
    num9Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
    num9Key.onDown.add(function(){game.actors[playerIndex].move('NE')}, this);

    num6Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
    num6Key.onDown.add(function(){game.actors[playerIndex].move('E')}, this);

    num3Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
    num3Key.onDown.add(function(){game.actors[playerIndex].move('SE')}, this);

    num2Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
    num2Key.onDown.add(function(){game.actors[playerIndex].move('S')}, this);

    num1Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
    num1Key.onDown.add(function(){game.actors[playerIndex].move('SW')}, this);

    num4Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
    num4Key.onDown.add(function(){game.actors[playerIndex].move('W')}, this);

    num7Key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
    num7Key.onDown.add(function(){game.actors[playerIndex].move('NW')}, this);
    
    // mouse clicks
    game.input.onDown.add(function(pointer, event) { 
 	   // get tile position
 	   var pos = new Position(Math.floor(event.x / map.tileWidth),Math.floor(event.y / map.tileHeight));
 	   console.log(pos);
    });

  }

  var getGame = function(){
    return game;
  };

  var setScope = function(scope) {
    game.scope = scope;	  
  }
  
  return {
	getGame: getGame,
	setScope:setScope
  };

});