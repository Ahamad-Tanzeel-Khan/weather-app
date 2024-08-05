import React from 'react'
import "./dayforecast.css"

const DayForecast = ({day, icon, tempmax, tempmin}) => {

    const formattedDate = new Date(day).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    let dayy = formattedDate.split(',')[0]
    let dayWeather = icon.split(',')[0]
    tempmax = Math.round((tempmax - 32) * (5 / 9)) - 2
    tempmin = Math.round((tempmin - 32) * (5 / 9)) - 2

    console.log(dayWeather)
    
    return (
        <div className='dayfct-container glass'>
            <span>{dayy}</span>
            <img className='day-weather-icon' src={`/assets/weather-icons/icons/${dayWeather.toLowerCase()}.png`} alt={dayWeather} />
            <span className='day-temp'>{tempmax}°/{tempmin}°</span>
        </div>
    )
}

export default DayForecast