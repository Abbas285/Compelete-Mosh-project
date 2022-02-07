import React from 'react'
import _ from 'lodash'

 export function paginate(item,pagenumber,pagesize) {
  const statindex= (pagenumber -1)* pagesize;
// _.slice(item,statindex)

return _(item)
       .slice(statindex) 
       .take(pagesize) 
       .value();

}



