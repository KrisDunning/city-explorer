import React from 'react';


class SearchResults extends React.Component{

  render(){

    return (
      <div key='0'>
        <p>The City we found was : {this.props.city} </p>
        <p>The Latitude is : {this.props.lat} </p>
        <p>The Longitude is : {this.props.lon} </p>
        <img src={this.props.mapImgUrl} alt="Map of selected city"/>
      </div>
    );
    
  }
  
}
export default SearchResults;