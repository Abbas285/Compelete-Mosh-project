import React, { Component } from "react";
import {getMovies,deleteNovies} from "../../services/getMoviesService";
import {getGenres} from '../../services/generaService'
import Pagination from './pagination'
import {paginate} from './../../utilities/paginate'
import ListGroup from './ListGroup'
import MoveTable from'./movietable'
import { toast } from 'react-toastify';
import _ from 'lodash' 


class Movies extends Component {
  state = {
    movies: [],
    pagesize:4,
    curentpage:1,
    genres:[],
    searchQuery:"",
    curentGenres:null,
    sortedcolum:{path:'title',order:'asc'}
  };

async componentDidMount (){
  const {data}=await getGenres()
  const allgenrs=[{_id:"",name:"All Genres"},...data]
  const datamovies=await getMovies()
  
this.setState({
  genres:allgenrs,
  movies:datamovies.data
})
}

  handleDelete  = async movie => {
const orignalmovies=this.state.movies
const movies=orignalmovies.filter(mov=>mov._id!==movie._id)
    this.setState({ 
      movies
     });
try{
await deleteNovies(movie._id)
}
catch(ex){
// if(ex.response && ex.response.status===404)
// toast.error('This movies has already been deleted')
if(ex.response && ex.response.status>=400&&ex.response.status<500)
toast.error('something went wrong')
this.setState({
  movies:orignalmovies
})

}


  };
  clicked=(movie)=>{
    
 const movies =[...this.state.movies];
 const index =movies.indexOf(movie)
 movies[index]={...movies[index]}
 movies[index].liked=!movies[index].liked
 this.setState({
  movies:movies
 })
  }

pagehandle=(page)=>{

this.setState({

  curentpage:page
})
  }

  onsorthandle=(path)=>{
    // const sortcolumn={...this.state.sortedcolum}
    // if(sortcolumn.path===path){
    //   sortcolumn.order=sortcolumn.order==="asc"?"desc":"asc"
    // }
    // else{
    //   sortcolumn.path=path
    //   sortcolumn.order='asc'
    // }
this.setState({
  sortedcolum:path
});
   

  }

  handleGenresSelect=(values)=>{
    this.setState({
      curentGenres:values,
      curentpage:1,
      searchQuery:""
    })
  }
  
  
  handleSearch=(query)=>{
    this.setState({
     searchQuery:query,curentGenres:null,curentpage:1
    })
  }
 
  render() {
   
    const {sortedcolum,searchQuery} =this.state
   
let filtered=this.state.movies
if(searchQuery)
filtered=this.state.movies.filter(m=>
  m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  )

  else if(this.state.curentGenres && this.state.curentGenres._id)
  filtered=this.state.movies.filter(m=>m.genre._id===this.state.curentGenres._id)

  else  filtered=this.state.movies

    // const filterdmovies=this.state.curentGenres && this.state.curentGenres._id ?
    //  this.state.movies.filter(m=>m.genre._id===this.state.curentGenres._id)
    // :this.state.movies


 const sorted   =_.orderBy(filtered,[sortedcolum.path],[sortedcolum.order])
     const moviess=paginate(sorted,this.state.curentpage,this.state.pagesize)
     
    return (
      <div className="row">
      <div className="col-3 mt-3">
       <ListGroup 
        items={this.state.genres}
        onitemselect={this.handleGenresSelect}
        textproperty="name"
        valueproperty="_id"
        curentGenresnum={this.state.curentGenres}
        />
        </div>
        <div className="col-9">
        <MoveTable
        currentuser={this.props.currentuser}
        movielength={filtered}
        totalmovies={this.state.movies}
        movielist={moviess}
        sortedcolum={sortedcolum}
        onlikeclick={this.clicked}
        ondelete={this.handleDelete}
        onsort={this.onsorthandle}
        handleSearch={this.handleSearch}
        searchQuery={searchQuery}
        />
        <Pagination 
        pagecount={filtered.length}
        pagesize={this.state.pagesize} 
        onpageHandle={this.pagehandle}
        curentpages={this.state.curentpage}
        />

        </div>

      </div >
    );
  }
}

export default Movies;
