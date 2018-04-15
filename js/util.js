 function rnd (max,min=1) {
   if (min > 0) {
     return Math.ceil(Math.random() * max);	   
   }
   else {
     return Math.floor(Math.random() * (max + 1));	   	   
   }
 }