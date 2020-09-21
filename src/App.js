import React , {Component} from 'react';
import './App.css';
import Form from './Component/Form';
import Weather from './Component/Weather';

// http://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=e36ed364400282e43250b6c4c0274d44
const API_KEY = '929044d104fafae10a60a71b30c7bc00'

class App extends Component{
  state = {
    tempreatuser :'',
    city :'',
    country :'',
    humidity :'',
    description :'',
    error :'',
  }

  getWeather = async (e) =>{
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api.json();
    if (city&&country){
      this.setState({
        tempreatuser :data.main.temp,
        city :data.name,
        country :data.sys.country,
        humidity :data.main.humidity,
        description :data.weather[0].description,
        error :'',
      })
    }else{
      this.setState({
        tempreatuser :'',
        city :'',
        country :'',
        humidity :'',
        description :'',
        error :'Please Enter Data',
      })
    }
  }
  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <Form getWeather={this.getWeather}/>
          <Weather
            tempreatuser ={this.state.tempreatuser}
            city ={this.state.city}
            country ={this.state.country}
            humidity ={this.state.humidity}
            description ={this.state.description}
            error ={this.state.error}
            />
          </div>
      </div>
    )
  }
}

export default App;
