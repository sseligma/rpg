function ObjectMap() {
  // contents is a hashmap of position keys to object arrays
  // the position key is in the form if <x coord>:<y coord>
  this.contents = {};
}

ObjectMap.prototype.getMapKey = function(x,y) {
  return x + ':' + y;
}

ObjectMap.prototype.getObjects = function(x,y) {
  var key = this.getMapKey(x,y);
  if (this.contents[key] != undefined) {
	return this.contents[key];  
  }
}

ObjectMap.prototype.addObject = function(x,y,obj) {
  var key = this.getMapKey(x,y);
  if (this.contents[key] == undefined) {
    this.contents[key] = [];
  }
  
  this.contents[key].push(obj);  
}

Phaser.Tilemap.prototype.isWall = function(x,y) {
 console.log('checking x = ' + x + ' y = ' + y);
  //var t = this.layers[0].data[x][y].index;
  var t = this.getTile(x,y,0).index;
  return this.wall_tiles.indexOf(t) != -1;	
}

Phaser.Tilemap.prototype.getOpenTile = function() {
  var t;	
  
  for (var y = 0; y < this.layers[0].height; y++) {
    for (var x = 0; x < this.layers[0].width; x++) {
      //t = this.layers[0].data[x][y].index;
      t = this.getTile(x,y,0).index;
      if ( (this.floor_tiles.indexOf(t) != -1) && (this.objects.getObjects(x,y) == undefined) ){
    	  return({x:x,y:y});
      }     	
    }
  }
}

Phaser.Tilemap.prototype.randomDungeon = function() {
  this.floor_tiles = [1];
  this.wall_tiles = [2]
  this.wall_percent = 20;
  this.objects = new ObjectMap();
  	    
//	 //  Creates a layer from the World1 layer in the map data.
//	 //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
//	 floor_layer = map.createLayer('Floor');
//	 wall_layer = map.createLayer('Walls');
  
  
//
//	 //  This resizes the game world to match the layer dimensions
//	 wall_layer.resizeWorld();
//  floor_layer.resizeWorld();
  this.layer0 = map.create('level1', 20, 20, 32, 32);        	  
  this.layer0.resizeWorld();

 var t; // tile index

 for (var y = 0; y < this.layers[0].height; y++) {
   for (var x = 0; x < this.layers[0].width; x++) {
	 if (y == 0 || y == (this.layers[0].height - 1) || x == 0 || x == (this.layers[0].width -1) ) {
		 t = 2;
	 } 
	 else {
		 t = game.rnd.integerInRange(1, 100) <= this.wall_percent?2:1;
	 }
     this.putTile(t, x,y,0);
   }
 }
 
 
}