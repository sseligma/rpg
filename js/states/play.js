var playState = {

        
//        function preload () {
//
//        	  //game.load.tilemap('tilemap', 'test_map.json', null, Phaser.Tilemap.TILED_JSON);
//        	  game.load.image('tiles', 'tilesets/test_tiles_16.png');
//        	  //game.load.image('tiles', 'tilesets/test_tiles_32.png');
//              
//            game.load.spritesheet('sprite_sheet', 'tilesets/test_tiles_16.png', 16, 16, 5);
//        	  game.load.image('player_sprite', 'assets/player_16.png');
//        	 
//            //game.load.image('player_sprite', 'assets/player_32.png');           
//        	  
//        	  game.load.image('enemy_sprite', 'assets/enemy.png');
//            game.load.image('highlight_sprite', 'assets/highlight_16.png');           
//
//
//        }
        
		create: function () {
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
              name: 'Player 1',
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
    },

    
    update: function () {

        //  For example this checks if the up or down keys are pressed and moves the camera accordingly.
        /*
        upKey.onUpCallback = function(){
        	console.log('up');
        	player.y+= map.tileHeight;
        }
        */
        /*
        else if (cursors.down.isDown)
        {
            player.y-= map.tileHeight;
        }

        if (cursors.left.isDown)
        {
            player.x-= map.tileWidth;

        }
        else if (cursors.right.isDown)
        {
            player.x+= map.tileWidth;
        }
        */

    }
		
}