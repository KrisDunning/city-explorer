import React from 'react';


class SearchResults extends React.Component{
  // constructor(props){
  //   super(props)
  // }

  render(){

    return (
      <>
      {/* console.log({this.props.lat}, {this.props.lon}, {this.props.city}); */}
        <p>The City we found was : {this.props.city} </p>
        <p>The Latitude is : {this.props.lat} </p>
        <p>The Longitude is : {this.props.lon} </p>

      </>
    );
    
  }
  
}
export default SearchResults;