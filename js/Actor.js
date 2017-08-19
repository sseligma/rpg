    function Position(){
    	this.x = 0;
    	this.y = 0;
    };
    
    Position.prototype.getX = function() {
      return this.x;
    }
      
    Position.prototype.getY = function() {
      return this.y;
    }

    function Actor() {
    	this.controller = '';
    	this.name = '';
    	this.position = new Position(); // grid position
    	this.sprite; // contains pixel coords on tilemap
    	
    	if (arguments != undefined) {
    		var params = arguments[0];
    		this.name = params.name != undefined?params.name:'';
    		this.controller = params.controller != undefined?params.controller:'AI';
    		this.position.x = params.x != undefined?params.x:0;
    		this.position.y = params.y != undefined?params.y:0;
    		this.sprite = params.sprite != undefined?game.add.sprite(this.position.x * map.tileWidth,this.position.y * map.tileHeight, params.sprite):null;
    	}
    }
    
    Actor.prototype.move = function(d) {    	
      console.log(this.position);
      mX = this.position.x + directions[d].x,
    	mY = this.position.y + directions[d].y, 
    	      
    	console.log('mX = ' + mX);
    	console.log('mY = ' + mY);
    	      	  
    	console.log(map);
    	  
    	if (map.isWall(mX,mY)) {
    	  console.log('Blocked');
    	}
    	else {
    	 this.position.x = mX;
    	 this.position.y = mY;
    	 this.sprite.position.x+=directions[d].x * map.tileWidth;
    	  this.sprite.position.y+=directions[d].y * map.tileHeight;
    	  console.log(directions[d].label);
    	}      
    }
