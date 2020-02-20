import React from 'react';
import './App.css';
import Weather from './components/Weather';
import Form from './components/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

const APIKey = 'c6597505667ac1a9d228cfb49e56b3ac';
// api.openweathermap.org/data/2.5/weather?q=London,uk

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      city: '',
      country: '',
      icon: '',
      main: '',
      celsius: '',
      temp_max: '',
      temp_min: '',
      description: '',
      error: false
    };

    this.weatherIcon={
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calCelsius(temp){
    let cell = Math.floor(temp-273.15);
    return cell;
  }

  getWeatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <=232:
        this.setState({icon:icons.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <=321:
        this.setState({icon:icons.Drizzle});
        break;
      case rangeId >= 500 && rangeId <=531:
        this.setState({icon:icons.Rain});
        break;
      case rangeId >= 600 && rangeId <=622:
        this.setState({icon:icons.Snow});
        break;
      case rangeId >= 701 && rangeId <=781:
        this.setState({icon:icons.Atmosphere});
        break;
      case rangeId ===800:
        this.setState({icon:icons.Clear});
        break;
      case rangeId >= 801 && rangeId <=804:
        this.setState({icon:icons.Clouds});
        break;
      default:
        this.setState({icon:icons.Clouds});
    }
  }

  getWeather = async(e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKey}`);
      const response = await api_call.json();
  
      console.log(response);
  
      this.setState({
        city: `${response.name},${response.sys.country}`,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      // setting icons
      this.getWeatherIcon(this.weatherIcon, response.weather[0].id );

    }else{
      this.setState({
        error: true
      })
    }

   
  }

  render(){
    const {
      city,
      country,
      celsius,
      temp_min,
      temp_max,
      description,
      icon,
      error
    } = this.state;
    return(
      <div className="App">
        <Form
          loadWeather={this.getWeather}
          error={error}
          />
        {/* <h1>Weather app</h1> */}
        <Weather
          city={city}
          country={country}
          temp_celsius={celsius}
          temp_min={temp_min}
          temp_max={temp_max}
          description={description}
          weatherIcon={icon}
          
          />
      </div>
    )
  }

}


export default App;
