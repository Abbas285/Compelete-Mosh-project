import React, { Component } from 'react'

export class ListGroup extends Component {

    
    render() {
        const {items,onitemselect,textproperty,valueproperty,curentGenresnum}=this.props
        return   <ul className="list-group" >
            { items.map(item=>{
            return <li onClick={()=>onitemselect(item)} key={item[valueproperty]}
             className={item===curentGenresnum?"list-group-item active":"list-group-item "}>{item[textproperty]}</li>
            
            })
            }
               

                </ul>
    }
}
ListGroup.defaultProps={
    textproperty:"name",
    valueproperty:"_id"
}

export default ListGroup
