import React from 'react';


class Movies extends React.Component{
  
  
  render(){
    let moviesData=this.props.movies;
    console.log ('Movies Data: ',moviesData);
    let movieDisplay=moviesData.map((movie,idx)=>{
      let posterURL=`https://image.tmdb.org/t/p/w300/${movie.posterPath}`;
     return <div key={idx}>
      <h3>
        {movie.title}
      </h3>
      <img src= {posterURL} alt= {`${movie.title}`}/>
      <p>
        {movie.description}
      </p>
      </div>
    });

    return (
      <>
        <h2>
          Movies Related to your search
        </h2>
        <div>
        {movieDisplay}          
        </div>
      </>
    );
    
  };
  
}
export default Movies;