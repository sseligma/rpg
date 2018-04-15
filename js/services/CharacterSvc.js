app.factory('character_svc', function($rootScope) {
  var character = new Actor();

  return {
	setName:function(text){
	  character.name = text;
    },
		          
	get:function(attr) {
	  return character[attr];	  
	},

	set:function(attr,value) {
	  character[attr] = value;  
	},

	getCharacter:function(){
	  return character;
	},
	    
	setCharacter:function(_character){
	  character = _character;
    }

  }

});