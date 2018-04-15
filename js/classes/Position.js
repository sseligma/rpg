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
