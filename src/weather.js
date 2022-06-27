import React from 'react';


class Weather extends React.Component {


  render() {
    let weathers=this.props.weather;
    console.log ('Weathers: ',weathers);
    let weatherReport=weathers.map((day,idx)=>{
     return <div key={idx}>
      <h3>
        {day.time}
      </h3>
      <p>
        {day.forecast}
      </p>
      </div>
    });

    return (
      <>
      <h2>
        Here is your 3 day Forecast
      </h2>
      <div>
        {weatherReport}
      </div>
      </>
    );

  };

}
export default Weather;