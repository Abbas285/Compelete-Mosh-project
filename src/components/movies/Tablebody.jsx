import React, { Component } from 'react'
import _ from 'lodash';
export class Tablebody extends Component {
    rendercell=(item,coloumn)=>{
        if(coloumn.content) return coloumn.content(item)

        return _.get(item,coloumn.path)
        
    };
    createkey=(item,columns)=>{
        return item._id +(columns.path||columns.key)

    }
    render() {
        const {data,coloumn}=this.props
        return (
            <tbody>
                
{
    data.map(data=><tr key={data._id}>
        {coloumn.map(col=>
        <td key={this.createkey(data,col)}>{
       this.rendercell(data,col)
        
        }</td>)}
    </tr>)
}


            </tbody>

        )
    }
}

export default Tablebody
