import React, { Component } from 'react'
import _ from "lodash"
import PropTypes from  'prop-types'
export class pagination extends Component {
  
    render() {
        const {pagecount,pagesize,onpageHandle,curentpages} =this.props
        const pagecounts= Math.ceil(pagecount/pagesize) ;
        if(pagecounts===1) return null
       
        const pages=_.range(1,pagecounts + 1)

        return (
            <nav>
                <ul className="pagination">
                   {
                       pages.map(page=>{
                           return <li key={page} className={page===curentpages? 'page-item active':'page-item'} >
                                 <a className="page-link" onClick={()=>onpageHandle(page)}>{page}</a>
                                  </li>
                           
                      
                       })
                   }
                </ul>
            </nav>
        )
    }
}
pagination.PropTypes={
    pagecount:PropTypes.number.isRequired,
    
    pagesize:PropTypes.number.isRequired
    ,onpageHandle:PropTypes.func.isRequired
    ,curentpages:PropTypes.number.isRequired

}
export default pagination
