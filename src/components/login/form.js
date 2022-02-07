import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from './Select'
export class form extends Component {
    state={
        data:{},
        errors:{},
    }
    validatehandle=()=>{
        const option={abortEarly:false}
   const {error}=Joi.validate(this.state.data,this.schema,option)

   
   if(!error) return null
   const errors={}
   for(let item of error.details)
   errors[item.path[0]]=item.message;
   return errors;
       }
   
       onsubmithandle=(e)=>{
           e.preventDefault()
   let errormessage=this.validatehandle()
   this.setState({
       errors:errormessage||{}
   })
   if(errormessage) return
   this.dosubmit()
       }

    

 handlevalidation=(data)=>{
   const obj={[data.name]:data.value};
   const schema={[data.name]:this.schema[data.name]}
   const {error}=Joi.validate(obj,schema)
   return error?error.details[0].message:null
       }
       handlechange=({currentTarget:input})=>{
   
           const account={...this.state.data}
           let error=this.handlevalidation(input)
           account[input.name]=input.value
   
           let errordata={...this.state.errors}
           if(error)errordata[input.name]=error
           else delete errordata[input.name]
           this.setState({
               data:account,
               errors:errordata
           })
       }

       handlebuttton=(label)=>{
return <button className='btn btn-primary'disabled={this.validatehandle()}>{label}</button>
       }

       handleinput=(name,lable,type="text")=>{
        const {data,errors}=this.state
           return     <Input
           type={type}
           label={lable}
           name={name}
           value={data[name]} 
           onChange={this.handlechange}
           error={errors[name]}
           />
       }
       renderSelect=(name,label,options)=>{
           const {data,errors}=this.state;
           return(
               <Select
               name={name}
               value={data[name]}
               label={label}
               options={options}
               onChange={this.handlechange}
               error={errors[name]}
               />
           )
       }
}

export default form
