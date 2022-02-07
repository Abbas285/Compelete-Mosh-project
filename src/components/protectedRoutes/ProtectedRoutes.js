import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom'
import auth from './../../services/authservice'
class ProtectedRoutes extends Component {
  
    render() {
          const user=auth.getcurentuser()
          const { component:Component,render,...rest,}=this.props
        return (
            <Route {...rest} render={(props)=>{
                if(!user)
                  return  <Redirect to={{
                      pathname:'/login',
                      state:{from:props.location}
                  }
                    }/>
                return Component? <Component  {...props}/>:render(props);
              }} />)      
}
}

export default ProtectedRoutes;