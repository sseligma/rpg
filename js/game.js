        function findObjectsByType (type, map, layer) {
          var result = new Array();
          for(var i = 0; i < map.objects[layer].length; i++) {
        	  obj = map.objects[layer][i];
        	  if (obj.type == type) {
              obj.y -= map.tileHeight;
        		  result.push(obj);
        	  }
          };
          return result;
        }

        function moveActor(actor,d) {
            actor.move(d);	
          }
          
          function movePlayer(d) {
            var currentPosition = {
          		x:player.position.x / map.tileWidth,
          		y:player.position.y / map.tileHeight
            }

            var newPosition = {
          	  x:currentPosition.x + directions[d].x,
              y:currentPosition.y + directions[d].y, 
            }
            
            if (map.hasTile(newPosition.x,newPosition.y,'Walls')) {
          	  console.log('Blocked');
            }
            else {
          	  player.position.x+=directions[d].x * map.tileWidth;
              player.position.y+=directions[d].y * map.tileHeight;
              console.log(directions[d].label);
            }      
          }

          
          var directions = {
        	      'N':{
        	    	  'x':0,
        	    	  'y':-1,
        	    	  'label':'North'
        	      },      
        	      'NE':{
        	          'x':1,
        	          'y':-1,
        	          'label':'North East'
        	      },      
        	      'E':{
        	        'x':1,
        	        'y':0,
        	        'label':'East'
        	      },
        	      'SE':{
        	          'x':1,
        	          'y':1,
        	          'label':'South East'
        	      },      
        	      'S':{
        	        'x':0,
        	        'y':1,
        	        'label':'South'
        	      },
        	      'SW':{
        	          'x':-1,
        	          'y':1,
        	          'label':'South'
        	      },
        	      'W':{
        	        'x':-1,
        	        'y':0,
        	        'label':'West'
        	      },
        	      'NW':{
        	          'x':-1,
        	          'y':-1,
        	          'label':'North West'
        	      }
        	    };

        
  //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
  //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
  //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

  //game = new Phaser.Game(320, 320, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  var game = new Phaser.Game(320, 320, Phaser.AUTO, 'game' );

  game.state.add('boot', bootState);
  game.state.add('menu', menuState);
  game.state.add('play', playState);
  
  game.state.start('boot');

