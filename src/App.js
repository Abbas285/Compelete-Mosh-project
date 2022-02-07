import React, { Component } from "react";
import Movies from './components/movies/movies';
import Navebar from './components/Navebar/Navebar.js'
import Rental from './components/Rentals/Rentals.js'
import Userprofile from'./components/curentuser/curentuser'
import Logoutuser from './components/curentuser/logoutuser'
import Vidlyproject from './components/Vidly/Vidly.js'
import {Route,Switch,Redirect} from 'react-router-dom'
import Notfoundpage from './components/notfound'
import Login from './components/login/login'
import Registerform from "./components/RegisterForm/Registerform";
import Movieeformupdate from './components/movies/movieeform/movieeform'
import  {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import auth from './services/authservice'
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes'
import "./App.css";
class App extends Component {
 state={
   user:""
 }
 componentDidMount(){
const user =auth.getcurentuser()

this.setState({
  user
})

 }
  render() {
    const user =auth.getcurentuser()

    // const {user}=this.state
    return (<React.Fragment>
      <ToastContainer/>
        <Navebar
        user={user}/>
      <main className="container-fluid">
<Switch>
  
  <ProtectedRoutes  path="/movies/:id"  
   component={Movieeformupdate} />
   
  <Route path="/Registerform" component={Registerform}/> 
  <Route path="/movies" render={(props)=>{
    return <Movies currentuser={user}  {...props}/>
  }}/>
  <Route path="/rentals"component={Rental}/>
  <Route path="/Userprofile" render={(props)=>{
    return <Userprofile user={user} {...props} />
  }}/>
  <Route path="/Logoutuser" component={Logoutuser}/>
  <Route path="/not-found"component={Notfoundpage}/>
 <Route path="/login" component={Login} />
 <Route path="/Vidlyproject" Component={Vidlyproject}/>
  <Redirect  from="/" exact to="/movies"/>
  <Redirect  to="/not-found"/>
</Switch>

      </main>
      </React.Fragment> );
  }
}

export default App;
