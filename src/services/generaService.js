
import http from './httpService'
import configfile from '../configfile.json'
export function getGenres() {
  return  http.get(configfile.allGenera)
  }
  