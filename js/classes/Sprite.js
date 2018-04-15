function Sprite(params){
  this.img = params.img != undefined?params.img:null;
  this.width = params.width != undefined?params.width:0;
  this.height = params.height != undefined?params.height:0;
  this.frameIndex = params.frameIndex != undefined?params.frameIndex:0;
  this.ctx = params.ctx != undefined?params.ctx:null;
  this.position = params.position != undefined?params.position:null;
  
  if (this.width != undefined) {
    this.framesWide = this.img.width / this.width;
    this.dx = this.position.x * this.width;
  }

  if (this.height != undefined) {
    this.framesHigh = this.img.height / this.height;
    this.dy = this.position.y * this.height;
  }
  
}

Sprite.prototype.draw = function() {
  gY = Math.floor(this.frameIndex / this.framesWide);
  gX = this.frameIndex - (gY * this.framesHigh); 
  sx = gX * this.width; 
  sy = gY * this.height;
  this.ctx.drawImage(this.img, sx, sy, this.width, this.height, this.dx,this.dy,this.width,this.height);
}

Sprite.prototype.move = function(position) {
  this.ctx.clearRect(this.dx,this.dy,this.width,this.height);
  this.position = position;
  this.dx = this.position.x * this.width;
  this.dy = this.position.y * this.height;
  this.draw();
}
 