import React from 'react'
import Joi from 'joi-browser'
import Form from './form'
import auth from './../../services/authservice'
import { Redirect } from 'react-router-dom'
export class login extends Form {
   data={
        username:'',
        password:''
    }
    constructor(){
        super()
       this.state={
            data:this.data,
            errors:{},
            getpath:""
        }
    }

    schema={
        username:Joi.string()
        .required()
        .email()
        .label("User Name"),
        password:Joi.string().required().label("Password")
       }

    dosubmit=async()=>{
        try{
await auth.login(this.state.data.username,this.state.data.password)
const {state}=this.props.location
window.location=state?state.from.pathname:'/'
        }
        catch(ex){
            if(ex.response && ex.response.status===400){
                const errors={...this.state.errors}
                errors.username=ex.response.data
                this.setState({
                    errors
                }) } }
    }

    render() {
        if(auth.getcurentuser()) return<Redirect to='/'/>

        return (
           <div className="d-flex  flex-column justify-content-center ">
               <h1 className='text-center mt-4'>
                   LoginForm
                </h1>
           
            <form onSubmit={this.onsubmithandle}>

         {  this.handleinput("username","User Name",)}    
         { this.handleinput("password","Password","password") }
         {this.handlebuttton("Login")}  
      
          </form>
          </div>
        )
    }
}

export default login
