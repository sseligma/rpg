function ObjectMap() {
  // contents is a hashmap of position keys to object a rrays
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

Phaser.Tilemap.prototype.setScope = function($scope) {
  this.$scope = $scope;
}

Phaser.Tilemap.prototype.getKey = function(x,y) {
  return x + ':' + y;	
}

Phaser.Tilemap.prototype.isWall = function(x,y) {
 //console.log('checking x = ' + x + ' y = ' + y);
  //var t = this.layers[0].data[x][y].index;
  var t = this.getTile(x,y,0).index;
  return this.wall_tiles.indexOf(t) != -1;	
}

Phaser.Tilemap.prototype.getOpenTile = function() {
  var t;	
  
  for (var y = 0; y < this.layers[0].height; y++) {
    for (var x = 0; x < this.layers[0].width; x++) {
      t = this.getTile(x,y,0).index;
      console.log('t = ' + t);
      if ( (this.floor_tiles.indexOf(t) != -1) && (this.objects.getObjects(x,y) == undefined) ){
    	  return({x:x,y:y});
      }     	
    }
  }
}

Phaser.Tilemap.prototype.getRandomOpenTile = function() {
  var t;	
  var count = 0;
  var x;
  var y;
  var key;
  var tried = {};

  // get the tile keys of each tile in the openTiles map
  var keys = Object.keys(this.openTiles);
  var numOpen = keys.length;
  console.log(numOpen);
  
  if (numOpen > 0) {
    key = keys[game.rnd.integerInRange(0, numOpen - 1)];
    console.log('open key = ' + key);
	return this.openTiles[key];
  }

}

Phaser.Tilemap.prototype.randomDungeon = function(width=20,height=20) {
  this.pfGrid = new PF.Grid(width,height);
  this.pathfinder = new PF.AStarFinder();
  this.floor_tiles = [1];
  this.wall_tiles = [2]
  this.wall_percent = 20;
  this.objects = new ObjectMap();
  this.openTiles = {};
  var tile_key = null;  	    
//	 //  Creates a layer from the World1 layer in the map data.
//	 //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
//	 floor_layer = map.createLayer('Floor');
//	 wall_layer = map.createLayer('Walls');
  
  
//
//	 //  This resizes the game world to match the layer dimensions
//	 wall_layer.resizeWorld();
//  floor_layer.resizeWorld();
  this.layer0 = this.create('level1', width, height, 16, 16);
  this.layer0.resizeWorld();
  this.debugLayer = this.createBlankLayer('debugLayer',width, height, 16, 16);

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
     this.pfGrid.setWalkableAt(x,y,this.wall_tiles.indexOf(t) == -1); // set walkable to false for wall tiles
     
     // if t is a floor tile, add it to the open tiles
     if (this.wall_tiles.indexOf(t) == -1) {
       this.openTiles[this.getKey(x,y)] = {x:x,y:y};    	 
     }
   }
 }
 
 
}