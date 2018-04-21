function Tile() {
  this.tileIndex; // index from the tileSrc img
  this.x = 0;
  this.y = 0;
  this.data = {};
  
  if (arguments.length) {
	this.tileIndex = arguments[0];
	this.x = arguments[1];
	this.y = arguments[2];
    // optional data argument
	if (arguments.length == 4) {
      this.data = arguments[3];	
    }    	  
  }
}

function ObjectMap() {
  // contents is a hashmap of position keys to object a rrays
  // the position key is in the form if <x coord>:<y coord>
  this.contents = {};
}

ObjectMap.prototype.getObjects = function(x,y) {
  var key = getMapKey(x,y);
  if (this.contents[key] != undefined) {
	return this.contents[key];  
  }
}

ObjectMap.prototype.addObject = function(x,y,obj) {
  var key = getMapKey(x,y);
  if (this.contents[key] == undefined) {
	this.contents[key] = [];
  }
	  
  this.contents[key].push(obj);  
}

function ActorMap() {
  // actors is a hashmap of position keys to actors
  // the position key is in the form if <x coord>:<y coord>
  this.actors = {};
}

ActorMap.prototype.add = function(x,y,actor) {
  this.actors[getMapKey(x,y)] = actor;
}

ActorMap.prototype.get = function(x,y) {
  return this.actors[getMapKey(x,y)];
}

ActorMap.prototype.remove = function(x,y) {
  this.actors[getMapKey(x,y)] = undefined;
}

function TilemapLayer() {
  this.id;
  this.tiles = [];
  this.tileSrcId;
  this.ctx; // canvas ctx
  this.parentMap;

  if (arguments.length >= 2) {
	this.id = arguments[0];	
	this.parentMap = arguments[1];
  }
  
  if (arguments[2]) {
	this.tileSrcId = arguments[2];	
  }
}

TilemapLayer.prototype.drawTile = function(t,img) {
  var tile = this.tiles[t];
  //console.log(tile);
  var tilesWide = this.parentMap.getTileSrc(this.tileSrcId).tilesWide;
  //console.log(tilesWide + ' tiles wide');
  // get top left corner of tileset img for tile
  //console.log('tile ' + t);
  gY = Math.floor(tile.tileIndex / tilesWide);
  gX = tile.tileIndex - (gY * tilesWide); 
  sx = gX * this.parentMap.tileWidth; 
  sy = gY * this.parentMap.tileHeight;
  tX = tile.x * this.parentMap.tileWidth;
  tY = tile.y * this.parentMap.tileHeight;

  //console.log('drawing tile ' + t);
  //console.log('gX = ' + gX);
  //console.log('gY = ' + gY);

  //console.log('from image at ' + sx + ' ' + sy);
  //console.log('to canvas ' + tX + ' ' + tY);
  //console.log(this.parentMap.tileWidth);
  //console.log(this.parentMap.tileHeight);
  this.ctx.drawImage(img, sx, sy, this.parentMap.tileWidth, this.parentMap.tileHeight, tX,tY,this.parentMap.tileWidth,this.parentMap.tileHeight);
}

TilemapLayer.prototype.getTileAt = function(x,y) {
  var t = (y * this.parentMap.width) + x;
  return this.tiles[t];
}

function Tilemap() {
  this.height = 0;
  this.width = 0;
  this.tileHeight = 0;
  this.tileWidth = 0;
  this.canvasHeight = 0;
  this.canvasWidth = 0;
  this.assets;
  this.objects = new ObjectMap();
  this.actorMap = new ActorMap();
  
  this.layers = []; // array of TilemapLayer objects
  this.layerIdMap = {}; // hashmap of layer ID to index
  
  this.tileSrc = [];
  this.tileSrcIdMap = {};
  
  this.pfGrid;
  this.pathfinder = new PF.AStarFinder();

  
  if (arguments.length) {
	var params = arguments[0];
	this.height = params.height != undefined?params.height:0;
	this.width = params.width != undefined?params.width:0;
	this.tileHeight = params.tileHeight != undefined?params.tileHeight:0;
	this.tileWidth = params.tileWidth != undefined?params.tileWidth:0;
	this.canvasHeight = this.height * this.tileHeight;
	this.canvasWidth = this.width * this.tileWidth;
	this.assets = params.assets != undefined?params.assets:undefined;
	//this.tilesWide = this.width / this.tileWidth;
	//this.tilesHeight = this.height / this.tileHeight;
	
	this.pfGrid = new PF.Grid(this.width,this.height); 
  }
}

Tilemap.prototype.getKey = function(x,y) {
  return x + ':' + y;	
}

Tilemap.prototype.addLayer = function(id,tileSrcId = null) {
  // arg 0 = layer id
  // arg 1 = optional tileset img id
		
  var tileMap = this;
  this.layers.push(new TilemapLayer(id,tileMap,tileSrcId));
  this.layerIdMap[arguments[0]] = this.layers.length - 1;  
}

Tilemap.prototype.getLayer = function(id) {
  return this.layers[this.layerIdMap[id]];
}

Tilemap.prototype.addTileSrc = function(id,info = {}) {
  var img = this.assets.get(id);
  this.tileSrc.push({'img':img,'tilesWide':img.width / this.tileWidth,'info':info});
  this.tileSrcIdMap[id] = this.tileSrc.length - 1;
}

Tilemap.prototype.getTileSrc = function(id) {
  return this.tileSrc[this.tileSrcIdMap[id]];	
}

Tilemap.prototype.putTile = function(tileIndex,x,y,layerIndex) {
  // get tiles array index from x/y values
  var i = (y * this.height) + x + 1;	
  this.layers[layerIndex].tiles.push(new Tile(tileIndex,x,y))
}

Tilemap.prototype.drawMap = function(id) {
  console.log(id);
  var tile;
  tileSrcImg = this.getTileSrc(id).img;	
  console.log(tileSrcImg);
  
  for (var i = 0; i < this.layers.length; i++) {
    var layer = this.layers[i];
    for (var t = 0; t < layer.tiles.length; t++) {
      layer.drawTile(t,tileSrcImg);
    }
  }	
}

Tilemap.prototype.randomMap = function() {
  var l = 0; // default layer index l to 0;
  if (arguments.length) {
    if (isNaN(parseInt(arguments[0]))) {
      l = this.layerIdMap[arguments[0]];
    }
    else {
      l = arguments[0];    	
    }
  }
  
  this.floor_tiles = [1];
  this.wall_tiles = [2]
  this.wall_percent = 20;
  this.openTiles = {};
  var tile_key = null;  	    
 
  var t; // tile index

  for (var y = 0; y < this.height; y++) {
   for (var x = 0; x < this.width; x++) {
	 if (y == 0 || y == (this.height - 1) || x == 0 || x == (this.width -1) ) {
		 t = 2;
	 } 
	 else {
		 t = Math.floor((Math.random() * 100)) <= this.wall_percent?2:1;
	 }
     this.putTile(t, x,y,0);
     this.pfGrid.setWalkableAt(x,y,this.wall_tiles.indexOf(t) == -1); // set walkable to false for wall tiles
     
     // if t is a floor tile, add it to the open tiles
     if (this.wall_tiles.indexOf(t) == -1) {
       this.openTiles[x + '_' + y] = {x:x,y:y};    	 
     }     
     this.pfGrid.setWalkableAt(x,y,this.wall_tiles.indexOf(t) == -1); // set walkable to false for wall tiles
     
   }
 }
  
}

Tilemap.prototype.getRandomOpenTile = function() {
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
    key = keys[rnd((numOpen - 1),0)];
    console.log('open key = ' + key);
    return this.openTiles[key];
  }

}

Tilemap.prototype.isWall = function(x,y) {
  	
  var t;
  for(var i = 0; i < this.layers.length; i++) {
    t = this.layers[0].getTileAt(x,y);
    console.log(t);
    console.log(this.wall_tiles);
    if (this.wall_tiles.indexOf(t.tileIndex) != -1) {
    	return true;
    }		  
  }
  return false;
}

Tilemap.prototype.hasActor = function(x,y) {
  return this.actorMap.get(x,y) != undefined;
}

//function ObjectMap() {
//  // contents is a hashmap of position keys to object arrays
//  // the position key is in the form if <x coord>:<y coord>
//  this.contents = {};
//}
//
//ObjectMap.prototype.getMapKey = function(x,y) {
//  return x + ':' + y;
//}
//
//ObjectMap.prototype.getObjects = function(x,y) {
//  var key = this.getMapKey(x,y);
//  if (this.contents[key] != undefined) {
//	return this.contents[key];  
//  }
//}
//
//ObjectMap.prototype.addObject = function(x,y,obj) {
//  var key = this.getMapKey(x,y);
//  if (this.contents[key] == undefined) {
//    this.contents[key] = [];
//  }
//  
//  this.contents[key].push(obj);  
//}
//
//Phaser.Tilemap.prototype.setScope = function($scope) {
//  this.$scope = $scope;
//}
//
//Phaser.Tilemap.prototype.getKey = function(x,y) {
//  return x + ':' + y;	
//}
//
//Phaser.Tilemap.prototype.isWall = function(x,y) {
// //console.log('checking x = ' + x + ' y = ' + y);
//  //var t = this.layers[0].data[x][y].index;
//  var t = this.getTile(x,y,0).index;
//  return this.wall_tiles.indexOf(t) != -1;	
//}
//
//Phaser.Tilemap.prototype.getOpenTile = function() {
//  var t;	
//  
//  for (var y = 0; y < this.layers[0].height; y++) {
//    for (var x = 0; x < this.layers[0].width; x++) {
//      t = this.getTile(x,y,0).index;
//      console.log('t = ' + t);
//      if ( (this.floor_tiles.indexOf(t) != -1) && (this.objects.getObjects(x,y) == undefined) ){
//    	  return({x:x,y:y});
//      }     	
//    }
//  }
//}
//
//Phaser.Tilemap.prototype.getRandomOpenTile = function() {
//  var t;	
//  var count = 0;
//  var x;
//  var y;
//  var key;
//  var tried = {};
//
//  // get the tile keys of each tile in the openTiles map
//  var keys = Object.keys(this.openTiles);
//  var numOpen = keys.length;
//  console.log(numOpen);
//  
//  if (numOpen > 0) {
//    key = keys[game.rnd.integerInRange(0, numOpen - 1)];
//    console.log('open key = ' + key);
//	return this.openTiles[key];
//  }
//
//}
//
//Phaser.Tilemap.prototype.randomDungeon = function(width=20,height=20) {
//  this.pfGrid = new PF.Grid(width,height);
//  this.pathfinder = new PF.AStarFinder();
//  this.floor_tiles = [1];
//  this.wall_tiles = [2]
//  this.wall_percent = 20;
//  this.objects = new ObjectMap();
//  this.openTiles = {};
//  var tile_key = null;  	    
////	 //  Creates a layer from the World1 layer in the map data.
////	 //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
////	 floor_layer = map.createLayer('Floor');
////	 wall_layer = map.createLayer('Walls');
//  
//  
////
////	 //  This resizes the game world to match the layer dimensions
////	 wall_layer.resizeWorld();
////  floor_layer.resizeWorld();
//  this.layer0 = this.create('level1', width, height, 16, 16);
//  this.layer0.resizeWorld();
//  this.debugLayer = this.createBlankLayer('debugLayer',width, height, 16, 16);
//
// var t; // tile index
//
// for (var y = 0; y < this.layers[0].height; y++) {
//   for (var x = 0; x < this.layers[0].width; x++) {
//	 if (y == 0 || y == (this.layers[0].height - 1) || x == 0 || x == (this.layers[0].width -1) ) {
//		 t = 2;
//	 } 
//	 else {
//		 t = game.rnd.integerInRange(1, 100) <= this.wall_percent?2:1;
//	 }
//     this.putTile(t, x,y,0);
//     this.pfGrid.setWalkableAt(x,y,this.wall_tiles.indexOf(t) == -1); // set walkable to false for wall tiles
//     
//     // if t is a floor tile, add it to the open tiles
//     if (this.wall_tiles.indexOf(t) == -1) {
//       this.openTiles[this.getKey(x,y)] = {x:x,y:y};    	 
//     }
//   }
// }
// 
// 
//}