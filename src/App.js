import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getVideoUrl from './components/VideoMapping'; 
import './App.css'; 
import WeatherCard from './components/WeatherCard/WeatherCard';
import WeatherCondition from './components/WeatherCondition/WeatherCondition';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';


const App = () => {
  const [city, setCity] = useState('Jaipur');
  const [forecast, setForecast] = useState(null);
  const [currentHourWeather, setCurrentHourWeather] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; 


  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`
      );
      setForecast(response.data);
      if (response.data && response.data.days && response.data.days.length > 0) {
        const currentHourWeather = getCurrentHourWeather(response.data.days[0].hours);
        setCurrentHourWeather(currentHourWeather);
      }
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const getCurrentHourWeather = (hours) => {
    const currentHour = new Date().getHours();
    let closestHour = hours[0];
    let minDiff = Math.abs(currentHour - parseInt(hours[0].datetime.split(':')[0]));

    hours.forEach((hour) => {
      const hourTime = parseInt(hour.datetime.split(':')[0]);
      const diff = Math.abs(currentHour - hourTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestHour = hour;
      }
    });

    return closestHour;
  };

  const currentCondition = currentHourWeather ? currentHourWeather.conditions : 'default';
  const videoUrl = getVideoUrl(currentCondition); 

  return (
    <>
    <div className="app" >
      <div className='bg-vid-container'>
        <video src={videoUrl} autoPlay loop muted className="bg-vid"></video>
      </div>
      <div className='background'></div>
      <div className='main-container'>
        <div className="content">
          <div className='header-container'>
            <h1>SkyScout</h1>
            <div className='form-container glass'>
              <form style={{display: "flex"}}  onSubmit={handleSubmit}>
                <input 
                  className='search-input'
                  type="text" 
                  value={city} 
                  onChange={handleChange} 
                  placeholder="Enter city name" 
                />
                <button className='search-btn' type="submit"><img className='search-img' src='/assets/icons/search.png' alt='search'/></button>
              </form>
            </div>
          </div>

          {forecast && (
            <>
            <div className='current-weather-app-container'>
              <WeatherCard 
                location={forecast.resolvedAddress}
                temp = {forecast.currentConditions.temp}
                condition = {forecast.currentConditions.conditions}
                data={{
                  ...forecast.days[0],
                  currentHour: {
                    time: currentHourWeather.datetime,
                    temperature: currentHourWeather.temp,
                    conditions: currentHourWeather.conditions
                  }
                }} 
              />

              <div className='other-factors-app-container'>
                <div className='other-factors-app-1'>
                  <WeatherCondition heading = "UV Index" 
                    data={forecast.days[0]}/>
                  <WeatherCondition heading = "Wind Speed" 
                    data={forecast.days[0]}/>
                  <WeatherCondition heading = "Temp Max" 
                    data={forecast.days[0]}/>
                </div>
                <div className='other-factors-app-2'>
                  <WeatherCondition heading = "Humidity" 
                    data={forecast.days[0]}/>
                  <WeatherCondition heading = "Visibility" 
                    data={forecast.days[0]}/>
                  <WeatherCondition heading = "Dew" 
                    data={forecast.days[0]}/>
                </div>
              </div>

            </div>
            <div className='weekly-forecast-container'>
              <WeeklyForecast data={forecast.days}/>
            </div>
            <div className='hourly-forecast-container'>
              <HourlyForecast hourlyData={forecast.days[0].hours} tempmin={forecast.days[0].tempmin} tempmax={forecast.days[0].tempmax}/>
            </div>
            </>
          )}
        </div>

      </div>
    </div>
    </>
  );
};

export default App;





{/* {forecast.days[0].hours.map((hour, index) => {
  console.log('Hour data:', hour); // Detailed log to inspect hour data
  return (
    <div key={index}>
      <p>Time: {convertTo12HourFormat(hour.datetime)}</p>
      <p>Temperature: {hour.temp}°C</p>
      <p>Conditions: {hour.conditions}</p>
    </div>
  );
})} */}
{/* <h2>7-Day Forecast for {forecast.resolvedAddress}</h2>
{forecast.days.map((day, index) => (
  <div key={index}>
    <p>Date: {new Date(day.datetime).toLocaleDateString()}</p>
    <p>Temperature: {day.temp}°C</p>
    <p>Weather: {day.conditions}</p>
  </div>
))} */}