app.factory('asset_svc', function() {
  var assets = {};
  
  return {
    add:function(key,asset){
	  assets[key] = asset;
    }, 
    get:function(key){
      return assets[key];	
    }
  }
});
