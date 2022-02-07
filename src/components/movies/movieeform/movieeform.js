import React from 'react'
import Joi from 'joi-browser'
import Form from './../../login/form'
// import { getGenres } from '../../../services/fakeGenreService'
// import { getMovie,saveMovie } from '../../../services/fakeMovieService'
import { toast } from 'react-toastify';
import {getMovieid,saveMovie} from '../../../services/getMoviesService';
import {getGenres} from '../../../services/generaService'

export class movieeform extends Form {
 state={
        data:{
                title:"",
                genreId:"",
                numberInStock:"",
                dailyRentalRate:""
            },
            genres:[],
            errors:{}
        };
    
    schema={
        _id: Joi.string(),
        title:Joi.string()
        .required()
        .min(5)
        .label("Title"),
        genreId:Joi.string()
        .required()
        .label("Genre"),
        numberInStock:Joi.number()
        .required()
        .min(0)
        .max(100)
        .label("Number in Stock"),
        dailyRentalRate:Joi.number()
        .required()
        .min(0)
        .max(10)
        .label("Daily Rental Rate")
    }

populateGenres= async()=>{
    const genress=await getGenres()
    this.setState({
        genres:genress.data
    })
}
populatMovies= async()=>{

    const movieId=this.props.match.params.id;
    if(movieId==="new") return;
    try{
        const {data} = await getMovieid(movieId)
        this.setState({
            data:this.mapToViewModel(data)
        }
        )
    }catch(ex){
        if(ex.response && ex.response.status>=400&&ex.response.status<500)
        toast.error('something went wrong')
        this.props.history.replace("/not-found")
    }
}
    async componentDidMount(){
       await this.populateGenres()
       await this.populatMovies()
    }

    mapToViewModel(movie){
        return{
            _id:movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
        };
    }

    dosubmit= async ()=>{
        try {
            await  saveMovie(this.state.data)
            this.props.history.push("/movies")
           }
        catch(ex){
            if(ex.response && ex.response.status>=400&&ex.response.status<500)
            toast.error('something went wrong')
             }  

    }
    render() {
        return (
            <div>
                <h1>Movie form</h1>
                <form onSubmit={this.onsubmithandle}>
                    {this.handleinput("title","Title")}
                    {this.renderSelect("genreId","Genre",this.state.genres)}
                    {this.handleinput("numberInStock",'Number in Stock',"number")}
                    {this.handleinput("dailyRentalRate","Rate")}
                    {this.handlebuttton("Save")}
                       
                </form>
            </div>
        )
    }
}

export default movieeform
