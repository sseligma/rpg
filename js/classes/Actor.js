        
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
    	this.scope;
    	this.controller = '';
    	this.name = '';
    	this.position = new Position(); // grid position
    	this.sprite; // contains pixel coords on tilemap
    	this.map; // tilemap that the actor is on
    	this.intendedPath = [];
    	this.pathSprite = [];
    	this.debugPath = true;
    	this.health = 0;
    
    	if (arguments.length) {
    		var params = arguments[0];
    		this.name = params.name != undefined?params.name:'';
    		this.controller = params.controller != undefined?params.controller:'AI';
    		this.position.x = params.x != undefined?params.x:0;
    		this.position.y = params.y != undefined?params.y:0;
    		this.map = params.map;
    		this.map.actorMap.add(params.x,params.y,this);
    		this.sprite = params.sprite != undefined?params.sprite:null
    		this.health = params.health != undefined?params.health:0;
    	}
    }
    
    Actor.prototype.move = function(d) {    	
      console.log(this.position);
      mX = this.position.x + directions[d].x;
      mY = this.position.y + directions[d].y; 
    	      
    	//console.log('mX = ' + mX);
    	//console.log('mY = ' + mY);
    	      	  
    	//console.log(map);
    	  
    	if (this.map.isWall(mX,mY)) {
    	  console.log('Blocked');
    	}
    	else if (this.map.hasActor(mX,mY)) {
    		console.log('attack');
    	}
    	else {
    	 this.map.actorMap.remove(this.position.x,this.position.y);
    	 this.position.x = mX;
    	 this.position.y = mY;
    	 this.map.actorMap.add(this.position.x,this.position.y,this);

    	 this.sprite.move(this.position);
    	 console.log(this.name + ' moves ' + directions[d].label);
    	}      
    }
    
    Actor.prototype.findShortestPath = function(pEnd,pStart = null) {
      var grid = this.map.pfGrid.clone();
      if (pEnd.type != 'Position') {
        pEnd = new Position(pEnd.x,pEnd.y);
      }
      
      if (pStart == null) {
      	pStart = this.position;
      }
      
      this.intendedPath = this.map.pathfinder.findPath(pStart.x,pStart.y,pEnd.x,pEnd.y,grid);
      this.intendedPath.splice(0,1);
      if (this.debugPath) {
        //this.hidePath();
        //this.showPath();
      }
      console.log(this.intendedPath);
    }
    
    Actor.prototype.moveTowards = function(pEnd) {
      this.findShortestPath(pEnd);
      console.log(this.intendedPath);
      if (this.intendedPath.length > 0) {
        this.position = new Position(this.intendedPath[0][0],this.intendedPath[0][1]);
        this.sprite.move(this.position);
      }
    }
    
//    Actor.prototype.findShortestPath = function(pEnd,pStart = null,openList = {},closedList = {},numTries = 0) {
//    	this.hidePath();
//    	var maxTries = 10;
//    	//console.log(this.map.width * this.map.height);
//    	var path;
//    	var parent;
//    	var minF = Number.MAX_VALUE;
//    	var minFKey; // tile with the lowest F score
//    	var pNext;
//    	if (pEnd.type != 'Position') {
//    	  pEnd = new Position(pEnd.x,pEnd.y);
//    	}
//    	
//        if (pStart == null) {
//        	pStart = this.position;
//        }
//
//        //console.log('try = ' + numTries);
//        //console.log('start = ' + pStart.getKey());
//        //console.log('end = ' + pEnd.getKey());
//
//        //while (!(pEnd.x == pStart.x && pEnd.y == pStart.y) ) {
//        while (!pStart.equals(pEnd) && numTries < maxTries) {
//    	  // add current pos to openList
//    	  closedList[pStart.getKey()] = pStart;
//    	
//          // add each adjacent walkable square to the open list
//    	  for (key in directions) {    	  
//    	    path = new Path(pStart.x,pStart.y,key,{x:pStart.x,y:pStart.y});  	  
//    	    path.x+= directions[key].x;
//    	    path.y+= directions[key].y;
//            if (!this.map.isWall(path.x,path.y)) {
//              path.G = (directions[key].x * directions[key].y) == 0?10:14;
//        	  path.H = (Math.abs(pEnd.x - path.x) + Math.abs(pEnd.y - path.y)) * 10;
//        	  path.F = path.G + path.H;
//        	  if (path.F <= minF) {
//        		minF = path.F;
//        		minFPath = path;
//        	  }
//        	  // check to see if path is already on open list
//        	  if (openList[path.getKey()] != undefined) {
//        	    console.log('old path');
//        	    console.log(openList[path.getKey()]);
//        	    console.log('new path');
//        	    console.log(path);
//        	  }
//              openList[path.getKey()] = path;	  
//            }
//    	  }
//    	
//    	  // move path with minF from open list to closed list
//    	  pNext = new Position(minFPath.x,minFPath.y);
//    	  //map.putTile(5, pNext.x,pNext.y,1);
//    	  //game.add.sprite(pNext.x * map.tileWidth,pNext.y * map.tileHeight,'highlight_sprite');
//    	  closedList[pNext.getKey()] = pNext;
//    	  delete openList[pNext.getKey()];
//    	  //console.log(closedList);
//    	  //console.log(openList);
//    	  //console.log(pNext);
//    	  numTries++;
//    	  this.findShortestPath(pEnd,pNext,openList,closedList,numTries);
//        }
//           	
//    	this.intendedPath = closedList;
//    }

    Actor.prototype.hidePath = function() {
      for (i in this.pathSprite) {
      	this.pathSprite[i].destroy();	
      }
      this.pathSprite = [];
    }

    Actor.prototype.showPath = function() {
      for (i in this.intendedPath) {
    	this.pathSprite.push(game.addMapSprite(map,this.intendedPath[i][0],this.intendedPath[i][1],'highlight_sprite'));
      }	
    }
