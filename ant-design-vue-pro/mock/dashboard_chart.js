
function chart(method){
   let res=[20,40,78,10,30,48].map(()=>Math.floor(100*Math.random()));
   switch(method){
       case 'GET':
           break;

        default:
            res=null;
   }
   return res;
}

module.exports=chart;