import React from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import PopUp from './Modal.js';
import Weather from './Weather.js';
import Movies from './Movies.js';
import './Main.css'



class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityObj: {},
      userInput: '',
      // error: false,
      // errorMsg: '',
      // errorCode: '',
      goodResults:false,
      mapImgUrl: '',
      weatherData: [],
      movieData: [],
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
      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ctyxplr_API_KEY}&center=${resultingObj.lat},${resultingObj.lon}&zoom=12`;
      this.setState({
        mapImgUrl: mapURL,
        cityObj: resultingObj,
      });
    } catch (error) {
      this.handleError(error.message,error.code);
      console.log(error.message);
     
    };
    this.handleWeather(resultingObj.lat, resultingObj.lon);
  };


  handleWeather = async (lat, lon) => {
    let backendURL = `${process.env.REACT_APP_NODE_SERVER}/weather?lat=${lat}&lon=${lon}`
    try {
      let returnedWeatherData = await axios.get(backendURL);
      // console.log("This is WX date from backed: ", returnedWeatherData.data);
      this.setState({
        weatherData:returnedWeatherData.data
      });
    } catch (error) {
      this.handleError(error.message,error.code);
      console.log(error.message);
    }
    this.handleMovies(this.state.userInput);
  };

  handleMovies = async (searchQuery) => {
    let backendURL = `${process.env.REACT_APP_NODE_SERVER}/movies?city=${searchQuery}`;
    try {
      let returnedMovieData = await axios.get(backendURL);
      // console.log('This is the returnedMovieData: ', returnedMovieData.data);
      this.setState({
        movieData: returnedMovieData.data,
        goodResults:true,
      });
    } catch (error) {
      this.handleError(error.message,error.code);
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
    if (this.state.goodResults===false) {
      displayThis ='';
    } else {
      displayThis =[
        <SearchResults key='0'
          city={this.state.cityObj.display_name}
          lat={this.state.cityObj.lat}
          lon={this.state.cityObj.lon}
          mapImgUrl={this.state.mapImgUrl}          
        />,
        <Weather key='1'
        weather={this.state.weatherData}
        />,
        <Movies key='2'
        movies={this.state.movieData}
        />
      ]
    };

    return (
      <div className='main'>
        <form onSubmit={this.handleOnSubmit}>
          <label>
            <input type='text' placeholder='Please enter city name...' onChange={this.handleOnInput}></input>
          </label>
          <button > Explore!</button>
        </form>
        <div>{displayThis}</div>
      </div>
    );

  };


}
export default Main;