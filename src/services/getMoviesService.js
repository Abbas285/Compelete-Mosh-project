import http from './httpService'

import configfile from '../configfile.json'
export function getMovies() {
    return http.get(configfile.allMovies)
  }
  export function deleteNovies(movieid){
return http.delete(getMoviesurl(movieid))
  }

  function getMoviesurl(id){
     return  `${configfile.allMovies}/${id}`
  }
  export function getMovieid(movieid){
      return http.get(getMoviesurl(movieid))
  }
  export function saveMovie(movieid){
   if(!movieid._id){
    return http.post(configfile.allMovies,movieid)
   }
   else{
    const body={
        ...movieid
          }
       delete body._id
          return http.put(configfile.allMovies+'/'+movieid._id,body)
   }

  }