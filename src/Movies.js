import React from 'react';


class Movies extends React.Component{
  
  
  render(){
    let moviesData=this.props.movies;
    let movieDisplay=moviesData.map((movie,idx)=>{
    let posterURL=`https://image.tmdb.org/t/p/w200/${movie.posterPath}`;
     return <section key={idx}>
      <h3>
        {movie.title}
      </h3>
      <img src= {posterURL} alt= {`${movie.title}`}/>
      <p>
        {movie.description}
      </p>
      </section>
    });

    return (
      <>
      <h2>
          Movies Related to your search
        </h2>
      <div className='movie-display'>
        {movieDisplay}          
      </div>
      </>
    );
    
  };
  
}
export default Movies;