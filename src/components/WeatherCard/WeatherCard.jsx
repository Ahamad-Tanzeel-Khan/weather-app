import React from 'react';
import "./weathercard.css"

const WeatherCard = ({ location, temp, condition, data }) => {

  
  // let condition = data.currentHour.conditions.split(',')[0];
  let cond = condition.split(',')[0]

  if(cond === "Overcast"){
    cond = "Partially cloudy"
  }

  const convertTo12HourFormat = (time24) => {
    if (!time24) return 'Invalid Time';
    let [hours] = time24.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    if(min < 10){
      return `${hours}:0${min} ${ampm}`;
    }
    return `${hours}:${min} ${ampm}`;
  };

  const formattedDate = new Date(data.datetime).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  var d = new Date();
  const min = d.getMinutes();

  const isAfterSunset = () => {
    const currentTime = new Date();
    const sunsetTime = new Date(`${currentTime.toDateString()} ${data.sunset}`);
    return currentTime > sunsetTime;
  };

  


  location = location.split(',')[0];

  return (
    <div className='weather-card-container glass'>
      {data && (
        <div className='weather-card-content'>
          {data.currentHour && (
            <div>
              <div className='temp-container'>
                <img className='temp-icon' src={`/assets/weather-icons/icons/${cond.toLowerCase()}.png`} alt={cond.toLowerCase()} />
                <p className='current-temp'>{Math.round((temp - 32) * (5 / 9))}°C</p>
              </div>
              <div className='weathercard-date-container'>
                <div className='weathercard-location-conatiner'>
                  <img src="/assets/icons/location.png" alt="" />
                  <p>{location}</p>
                </div>
                <p>{formattedDate}</p>
              </div>
              <hr />
              <div className='weathercard-bottom-container'>
                <div>
                  <img src='/assets/icons/cloud.png' alt='weather' /> 
                  <p>{condition}</p>
                </div>
                <div>
                  <img 
                    src={isAfterSunset() ? '/assets/icons/sunset.png' : '/assets/icons/sunrise.png'} 
                    alt={isAfterSunset() ? 'sunset' : 'sunrise'} /> 
                  <p style={{margin: "0"}}>{convertTo12HourFormat(data.currentHour.time)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
