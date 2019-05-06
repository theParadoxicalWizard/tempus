import React from 'react';
import Weather from "./components/weather";
import Form from "./components/form";
import Titles from "./components/titles";


var keys = new  Array('5407b053b20d3baaf842e05fdae09c6a',
               '8a6116e9261a0ecf1dd502f917bbd2a0',
               'd3d25d7a74044542b00be829e5f06680');

var currentkey = Math.floor(Math.random() * keys.length);
const Api_Key = keys[currentkey];


class App extends React.Component{

     state = {

    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
    

    getWeather = async (e) => {
     
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;
      e.preventDefault();   
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
      const response = await api_call.json();
      console.log(response);
      if(city && country){
      this.setState({
        temperature: response.main.temp -273,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }else{
      this.setState({
        error: "Please input search values..."
      })
    }
  
     }
   render(){
     
    return(
      
<div>
 <div className="wrapper">
  <div className="main">
   <div className="container">
    <div className="row">
      
      <div className="col-xs-7 form-container">
        <Form loadWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
     </div>
    </div>
   </div>
  </div>
</div>
   )
  }
}

export default App;
