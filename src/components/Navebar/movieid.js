import React from 'react'

function movieid({match,history}) {
  
    return (
        <div>
            <h1>Movie Form {match.params.id} </h1>
            <button onClick={()=>history.push('/movies')}>
             back
            </button>
        </div>
    )
}

export default movieid
