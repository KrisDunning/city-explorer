import React from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import PopUp from './Modal.js';
import Weather from './weather.js'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityObj: {},
      userInput: '',
      error: false,
      errorMsg: '',
      errorCode: '',
      mapImgUrl: '',
    }
  }

  handleOnSubmit = async (event) => {
    event.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ctyxplr_API_KEY}&q=${this.state.userInput}&format=json`;
    let resultingObj = {};
    try {
      resultingObj = await axios.get(url);
      resultingObj = resultingObj.data[0];
      this.setState({
        cityObj: resultingObj,
        error: false,
      });
    } catch (error) {
      this.setState({
        errorCode: error.code,
        errorMsg: error.message,
        error: true
      });
      console.log("ERROR CAUGHT!", error.message);
    }

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ctyxplr_API_KEY}&center=${resultingObj.lat},${resultingObj.lon}&zoom=12`;
    this.setState({
      mapImgUrl: mapURL,
    });
  };

  handleOnInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };


  render() {
    let displayThis;
    let weatherDisplay;
    console.log(this.state);
    if (this.state.error) {
      displayThis =
        <PopUp
          errorMsg={this.state.errorMsg}
          errorCode={this.state.errorCode}
        />
    } else {
      displayThis =
        <SearchResults
          city={this.state.cityObj.display_name}
          lat={this.state.cityObj.lat}
          lon={this.state.cityObj.lon}
          mapImgUrl={this.state.mapImgUrl}
        />

      weatherDisplay=
      <Weather
        city={this.state.cityObj.display_name}
        lat={this.state.cityObj.lat}
        lon={this.state.cityObj.lon}
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
      <div>{weatherDisplay}</div>
      </>
    )

  }


}
export default Main;