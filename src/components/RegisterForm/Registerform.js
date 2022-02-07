import React, { Component } from 'react'
import Form from '../login/form'
import Joi from 'joi-browser'
import * as userService from './../../services/userService'
import auth  from './../../services/authservice'
import { toast } from 'react-toastify';
export class Registerform extends Form{
    data={
        username:'',
        password:'',
        name:''
    }
    constructor(){
        super()
       this.state={
            data:this.data,
            errors:{},
        }
    }
    schema={
        username:Joi.string()
        .required()
        .email()
        .label("User Name"),
        password:Joi.string()
        .required()
        .min(5)
        .label("Password"),
        name:Joi.string().
        required().label("Name")
       }
    dosubmit=async()=>{
        try{
           const {headers}= await userService.registerUser(this.state.data)
           auth.loginWithJwt(headers["x-auth-token"])
            toast("New user save successfully")
            window.location='/'
        }
        catch(ex){
           if(ex.response && ex.response.status===400){
               const errors={...this.state.errors}
               errors.username=ex.response.data
               this.setState({
                errors
               })
           }
        }
    }
    render() {
        return (
            <div className="d-flex  flex-column justify-content-center ">
                <h1 className='text-center mt-3'> Registration Form</h1>
                    <form onSubmit={this.onsubmithandle} autocomplete="off">

         {  this.handleinput("username","User Name",)}   
         { this.handleinput("password","Password","password") }
         {  this.handleinput("name","Name",)}   
         {this.handlebuttton("Register")}  
                    </form>
            </div>
        )
    }
}

export default Registerform

