import http from './httpService'
import configfile from '../configfile.json'



export function registerUser(user){
 
    return http.post(configfile.userApi,{
email:user.username,
password:user.password,
name:user.name
    })
}