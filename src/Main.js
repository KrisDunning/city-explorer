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
      returnedWeatherData: {},
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
        error:false,
      });
    }catch (error) {
       this.setState({
        error:true,
        errorCode:error.code,
        errorMsg:error.message
       });
      };
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ctyxplr_API_KEY}&center=${resultingObj.lat},${resultingObj.lon}&zoom=12`;
    this.setState({
      mapImgUrl: mapURL,
    });
    this.handleWeather(this.state.userInput, resultingObj.lat, resultingObj.lon);
  };

  handleOnInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  handleWeather = async (searchQuery, lat, lon) => {
    try {
      let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_weather_API_KEY}&units=I&days=3`;
      let returnedWeather = await axios.get(weatherURL);
      returnedWeather = returnedWeather.data.data;
      console.log('Weather Component setting this to display: ', returnedWeather);
      this.setState({
        returnedWeatherData: returnedWeather,
        showWeather: true,
        error:false,
      });
     //document.getElementById('hidden').style.display = 'block';
      } catch (error) {
        this.setState({
          error:true,
          errorCode:error.code,
          errorMsg:error.message
         });
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
      this.handleError(this.state.errorMsg,this.state.errorCode);
        // <PopUp
        //   errorMsg={this.state.errorMsg}
        //   errorCode={this.state.errorCode}
        // />
    
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