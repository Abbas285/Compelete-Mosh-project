import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export class navebar extends Component {
    render() {
      const curentuser=this.props.user
      let name=curentuser.name
        return (
            <div >
   
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
   
  <NavLink className="navbar-brand" to="/Vidlyproject">Vidly</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" 
  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
  aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/movies">Movies </NavLink>
      </li>
     {!curentuser&&(<React.Fragment><li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Registerform">Registerform</NavLink>
      </li></React.Fragment>) }
      <li className="nav-item">
        <NavLink className="nav-link" to="/customer">Customers</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
      </li>
      {curentuser&&
      <React.Fragment>
          <li className="nav-item">
          <NavLink className="nav-link" to="/Userprofile">{name}</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Logoutuser" >logout</NavLink>
        </li>
        </React.Fragment>
      }
    
     
  
     
    </ul>
  </div>
</nav>
            </div>
        )
    }
}

export default navebar
