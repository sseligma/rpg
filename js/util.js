 function rnd (max,min=1) {
   if (min > 0) {
     return (min - 1) + Math.ceil(Math.random() * (max - min + 1));	   
   }
   else {
     return Math.floor(Math.random() * (max + 1));	   	   
   }
 }
 
function getMapKey(x,y) {
	  return x + ':' + y;
}