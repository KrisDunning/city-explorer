import React from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import PopUp from './Modal.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      city: '',
      userInput: '',
      error: false,
      errorMsg: '',
      errorCode: '',
      mapImg: '',
    }
  }

  handleOnSubmit = async (event) => {
    event.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ctyxplr_API_KEY}&q=${this.state.userInput}&format=json`;

    try {
      let resultingObj = await axios.get(url);
      this.setState({
        lat: resultingObj.data[0].lat,
        lon: resultingObj.data[0].lon,
        city: resultingObj.data[0].display_name,
        error: false,
      });
    } catch (error) {
      this.setState({
        errorCode: error.code,
        errorMsg: error.message,
        error: true
      });
      console.log(error.toJSON());
      console.log("ERROR CAUGHT!", this.state.errorCode, this.state.errorMsg);
    }
    try {
      let anotherURL=`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ctyxplr_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`;
      let mapResult = await axios.get(anotherURL);
      console.log("MAPIMG: ", this.state.mapImg);
      this.setState({
        mapImg: mapResult,
      });
    }
    catch (error) {
      console.log("MAP GET ERROR!!!!");
    };
  };


handleOnInput = (e) => {
  this.setState({
    userInput: e.target.value,
  });
  console.log(this.state.userInput);
};


render(){
  console.log(this.state);
  let displayThis;
  if (this.state.error) {
    displayThis =
      <PopUp
        errorMsg={this.state.errorMsg}
        errorCode={this.errorCdoe}
      />
    console.log("CALLED MODAL!");
  } else {
    displayThis =
      <SearchResults
        city={this.state.city}
        lat={this.state.lat}
        lon={this.state.lon}
        mapImg={this.state.mapImg}
      />
  }

  return (
    <>
      <div>{displayThis}</div>
      <form onSubmit={this.handleOnSubmit}>
        <label>
          <input type='text' placeholder='Please enter city name...' onChange={this.handleOnInput}></input>
        </label>
        <button > Explore!</button>
      </form>
    </>
  );
}


}
export default Main;