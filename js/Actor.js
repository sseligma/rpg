    function Position(){
    	this.type = 'Position';
    	this.x = 0;
    	this.y = 0;
    	
    	if (arguments.length == 2) {
    	  this.x = arguments[0];
    	  this.y = arguments[1];
    	}
    };
    
    Position.prototype.getX = function() {
      return this.x;
    }
      
    Position.prototype.getY = function() {
      return this.y;
    }

    Position.prototype.getKey = function() {
      return 'x_' + this.x + '_' + 'y_' + this.y;
    }
    
    Position.prototype.equals = function(obj) {
      return this.x == obj.x && this.y == obj.y;
    }
        
    function Path() {
      if (arguments.length == 4) {
        Position.call(this, arguments[0],arguments[1]);
        this.type = 'Path';
        this.direction = arguments[2];
        this.parent = arguments[3];
      }	
      this.F = 0;
      this.G = 0;
      this.H = 0;
    }
    Path.prototype = Object.create(Position.prototype);
    
    Path.prototype.getPosition = function() {
    	return new Position(this.x,this.y);
    }
    
    
    function Actor() {
    	this.controller = '';
    	this.name = '';
    	this.position = new Position(); // grid position
    	this.sprite; // contains pixel coords on tilemap
    	this.map; // tilemap that the actor is on
    	
    	if (arguments != undefined) {
    		var params = arguments[0];
    		this.name = params.name != undefined?params.name:'';
    		this.controller = params.controller != undefined?params.controller:'AI';
    		this.map = params.map;
    		this.position.x = params.x != undefined?params.x:0;
    		this.position.y = params.y != undefined?params.y:0;
    		this.sprite = params.sprite != undefined?game.add.sprite(this.position.x * map.tileWidth,this.position.y * map.tileHeight, params.sprite):null;
    	}
    }
    
    Actor.prototype.move = function(d) {    	
      console.log(this.position);
      mX = this.position.x + directions[d].x;
      mY = this.position.y + directions[d].y; 
    	      
    	//console.log('mX = ' + mX);
    	//console.log('mY = ' + mY);
    	      	  
    	//console.log(map);
    	  
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
    
    Actor.prototype.findShortestPath = function(pEnd,pStart = null,openList = {},closedList = {},numTries = 0) {
    	var maxTries = 10;
    	var path;
    	var parent;
    	var minF = Number.MAX_VALUE;
    	var minFKey; // tile with the lowest F score
    	var pNext;
    	if (pEnd.type != 'Position') {
    	  pEnd = new Position(pEnd.x,pEnd.y);
    	}
    	
        if (pStart == null) {
        	pStart = this.position;
        }

        console.log('try = ' + numTries);
        console.log('start = ' + pStart.getKey());
        console.log('end = ' + pEnd.getKey());

        //while (!(pEnd.x == pStart.x && pEnd.y == pStart.y) ) {
        while (!pStart.equals(pEnd) && numTries < maxTries) {
    	  // at current pos to openList
    	  closedList[pStart.getKey()] = pStart;
    	
          // add each adjacent walkabe square to the open list
    	  for (key in directions) {    	  
    	    path = new Path(pStart.x,pStart.y,key,{x:pStart.x,y:pStart.y});    	  
    	    path.x+= directions[key].x;
    	    path.y+= directions[key].y;
            if (!this.map.isWall(path.x,path.y)) {
              path.G = (directions[key].x * directions[key].y) == 0?10:14;
        	  path.H = (Math.abs(pEnd.x - path.x) + Math.abs(pEnd.y - path.y)) * 10;
        	  path.F = path.G + path.H;
        	  if (path.F <= minF) {
        		minF = path.F;
        		minFPath = path;
        	  }
        	  /*
        	  console.log(key);
        	  console.log('pos x = ' + pos.x);	
        	  console.log('path x = ' + path.x);
          	  console.log('pos y = ' + pos.y);	
        	  console.log('path y = ' + path.y);
        	  console.log();
        	  */
              openList[path.getKey()] = path;	  
            }
    	  }
    	
    	  // move path with minF from open list to closed list
    	  pNext = new Position(minFPath.x,minFPath.y);
    	  game.add.sprite(pNext.x * map.tileWidth,pNext.y * map.tileHeight,'highlight_sprite');
    	  closedList[pNext.getKey()] = pNext;
    	  delete openList[pNext.getKey()];
    	  console.log(closedList);
    	  console.log(openList);
    	  console.log(pNext);
    	  numTries++;
    	  this.findShortestPath(pEnd,pNext,openList,closedList,numTries);
        }
           	
    	
    }
