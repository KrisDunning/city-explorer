import React from 'react';


class SearchResults extends React.Component{
  // constructor(props){
  //   super(props)
  // }

  render(){

    return (
      <>
        <p>The City we found was : {this.props.city} </p>
        <p>The Latitude is : {this.props.lat} </p>
        <p>The Longitude is : {this.props.lon} </p>
        <img src={this.props.mapImg} alt="Map of selected city"/>
      </>
    );
    
  }
  
}
export default SearchResults;