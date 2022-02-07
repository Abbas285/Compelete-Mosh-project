import React, { Component } from 'react'

export class TableHeader extends Component {
    onsorthandle=(path)=>{
        let sortedcolum={...this.props.sortedcolum}
         if(sortedcolum.path===path){
           sortedcolum.order=sortedcolum.order==="asc"?"desc":"asc"
         }
         else{
           sortedcolum.path=path
           sortedcolum.order='asc'
         }
         this.props.onsort(sortedcolum)
       }
       renderSortIcon=column=>{
         if(column.path!==this.props.sortedcolum.path) return null
         if(this.props.sortedcolum.order==='asc') return <i
         className="fa fa-sort-asc"></i>
          return <i className="fa fa-sort-desc"></i>;

       }
       
    render() {
      
        return (
           <thead>
               <tr>

               {
        this.props.columns.map(column=>(
        <th key={column.path||column.key} onClick={()=>this.onsorthandle(column.path)} className="clickable">
            {column.label} {this.renderSortIcon(column)}

            </th>

                   ))
               }
               </tr>
           </thead>
        )
    }
}

export default TableHeader
