import React, { Component } from 'react'


export class input extends Component {
    render() { 
        const {label,name,error ,...rest}=this.props
        return (
            <div className="form-group ">
            <label htmlFor='username'>{label}</label>
            <input 
            {...rest}
             id={name}
            name={name}
            className='form-control'
         
            />
          {error&&
                <div className='alert alert-danger'>
{
    error
}
                </div>
          }
     
        </div>
        )
    }
}

export default input
