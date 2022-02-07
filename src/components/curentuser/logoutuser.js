import React, { Component } from 'react';
import auth from './../../services/authservice'
class logoutuser extends Component {
    componentDidMount(){
        auth.logout()
       window.location="/"
    }
    render() {
        return (
            <div>
               
            </div>
        );
    }
}

export default logoutuser;