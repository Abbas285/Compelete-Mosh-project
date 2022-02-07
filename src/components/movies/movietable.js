import React,{ Component } from 'react'
import Like from './Like'
import TableHeader from './TableHeader';
import Tablebody from './Tablebody'; 
import  {Link} from 'react-router-dom'
import SearchBox from "./SearchBox";
import auth from './../../services/authservice'
export class movietable extends Component {

  columns=[
    { path:'title',label:'Title',content:movie=> <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    { path:'genre.name',label:'Genre' },
    { path:'numberInStock',label:'Stock' },
    { path:'dailyRentalRate',label:'Rate' },
    {key:'like' ,
 content: movie=><Like liked={movie.liked} 
 onclicked={()=>this.props.onlikeclick(movie)}/>
     },
    
  ];
deleteColumn={
  key:'delete',
  content: movie=><button
  onClick={() =>this.props. ondelete(movie)}
  className="btn btn-danger btn-sm"
>
  Delete
</button>

}

constructor(){
  super()
  const user=auth.getcurentuser();
  if(user&&user.isAdmin) this.columns.push(this.deleteColumn)
}


  handlenewMovie=()=>{
    this.props.history.push('/movies/:new')
  }
  render() {

    const {movielength,movielist,sortedcolum,onsort,handleSearch,searchQuery,currentuser,totalmovies} =this.props;
    return (<div>
    {totalmovies.length>0?
    
    <div>
    {
      currentuser&& <div className=' col '>
      <Link to="/movies/new"
      className='btn btn-primary'
      style={{marginBottom:20,marginTop:10}}>
      New Movies
      </Link>
                   </div>
    }
          

  <p>Showing {movielength.length} movies in the database.</p>

  <SearchBox  value={searchQuery} onChange={handleSearch}/>

  <table className="table">
    <TableHeader
    sortedcolum={sortedcolum}
    columns={this.columns}
    onsort={onsort}
    />
    <Tablebody
    data={movielist}
    coloumn={this.columns}
    />
   
  </table>
  </div>:<p>There are no movies in the database.</p>
  }
     
     </div> )
  }
}

export default movietable


