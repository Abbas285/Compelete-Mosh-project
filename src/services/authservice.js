import http from './httpService'
import configfile from '../configfile.json'
import jwtDecode from 'jwt-decode'
const keytoken="token"
export async function  login(email,password){
const {data:jwt}=await http.post(configfile.authuser,{email,password})
localStorage.setItem("token",jwt)
}
http.setJwt(getJwt())
export function logout(){
    localStorage.removeItem(keytoken)
}
export function getcurentuser(){
    let curentuser=""
    try{
        const jwt = localStorage.getItem(keytoken);
        curentuser=jwtDecode(jwt)
        return curentuser
    }
    catch(ex){
       return curentuser 
    } 
}

export   function  loginWithJwt(jwt){
   return localStorage.setItem(keytoken,jwt)
}

export function getJwt(){
    return localStorage.getItem(keytoken);
}
export default {
    login,
    logout,
    getcurentuser,
    loginWithJwt,
    getJwt
}