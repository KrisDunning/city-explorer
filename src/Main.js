import React from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import PopUp from './Modal.js';
//import Weather from './weather.js'

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
      showWeather: false,
      returnedWeatherData: [],
      returnedMovieData: [],
    }
  }

  handleOnSubmit = async (event) => {
    event.preventDefault();
    this.handleLocation(this.state.userInput); 
  };

  handleOnInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  handleLocation = async (city) => {
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ctyxplr_API_KEY}&q=${city}&format=json`;
    let resultingObj = {};
    try {
      resultingObj = await axios.get(url);
      resultingObj = resultingObj.data[0];
      console.log('resulting obj: '.resultingObj);
      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ctyxplr_API_KEY}&center=${resultingObj.lat},${resultingObj.lon}&zoom=12`;
      this.setState({
        mapImgUrl: mapURL,
        cityObj: resultingObj,
      },console.log("city obj set to state",this.state.cityObj)
      );
    } catch (error) {
      console.log(error.message);
    };
    this.handleWeather(resultingObj.lat, resultingObj.lon);
  };


  handleWeather = async (lat, lon) => {
    console.log('handleWeather lat/lon: ', lat, lon);
    let backendURL = `${process.env.REACT_APP_NODE_SERVER}/weather?lat=${lat}&lon=${lon}`
    try {
      let returnedWeatherData = axios.get(backendURL);
      returnedWeatherData = returnedWeatherData.data;
      console.log("This is WX date from backed: ", returnedWeatherData);
    } catch (error) {
      console.log(error.message);
    }
    this.handleMovies(this.state.userInput);
  };

  handleMovies = async (searchQuery) => {
    let backendURL = `${process.env.REACT_APP_NODE_SERVER}/movies?city=${searchQuery}`;
    try {
      let returnedMovieData = axios.get(backendURL);
      console.log('This is the returnedMovieData: ', returnedMovieData);
      this.setState({
        movieData: returnedMovieData,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleError = (errorMsg, errorCode) => {
    return <PopUp
      errorMsg={errorMsg}
      errorCode={errorCode}
    />
  }



  render() {
    let displayThis;
    if (this.state.error) {
      displayThis =
        this.handleError(this.state.errorMsg, this.state.errorCode);

    } else {
      displayThis =
        <SearchResults
          city={this.state.cityObj.display_name}
          lat={this.state.cityObj.lat}
          lon={this.state.cityObj.lon}
          mapImgUrl={this.state.mapImgUrl}
        />
    };

    return (
      <>
        <div>{displayThis}</div>
        <form onSubmit={this.handleOnSubmit}>
          <label>
            <input type='text' placeholder='Please enter city name...' onChange={this.handleOnInput}></input>
          </label>
          <button > Explore!</button>
        </form>
        {/* <div id='hidden'><Weather returnedWeatherData={this.state.returnedWeatherData}/></div> */}
      </>
    );

  };


}
export default Main;