import React from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';


class Main extends React.Component{
 constructor(props){
  super(props);
  this.state={
    lat:'',
    lon:'',
    city:'',
    userInput:'',
    error:false,
    errorMsg:'',
  }
 }
 
handleOnSubmit= async (event)=>{
event.preventDefault();
let url=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ctyxplr_API_KEY}&q=${this.state.userInput}&format=json`;
let resultingObj= await axios.get(url);
this.setState({
  lat:resultingObj.data[0].lat,
  lon:resultingObj.data[0].lon,
  city:resultingObj.data[0].display_name,
});
// console.log(resultingObj);
// console.log(resultingObj.data[0].lat, resultingObj.data[0].lon, resultingObj.data[0].display_name);
};

handleOnInput=(e) => {
  this.setState({
    userInput:e.target.value,
  });
  console.log(this.state.userInput);
};


 render(){ 
   return(
     <>
     <SearchResults 
      city={this.state.city} 
      lat={this.state.lat}
      lon={this.state.lon}
     />
     <form onSubmit={this.handleOnSubmit}>
     <label>
     <input type='text' placeholder='Please enter city name...' onChange={this.handleOnInput}></input>
     </label>
     <button > Explore!</button>
     </form>    
     </>
     
   );
  };



}
export default Main;