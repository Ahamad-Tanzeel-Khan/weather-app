import React from 'react'
import "./weathercondition.css"

const WeatherCondition = ({heading, data}) => {
  const headingLower = heading.split(' ').join('').toLowerCase();
  let value = data[headingLower];
  if (headingLower === "tempmax"){
    value = `${Math.round((value - 32) * (5 / 9)) - 2}°C`
  }

  return (
    <div className='other-factors-container glass'>
      <div style={{display: "flex", gap: "8px"}}>
          <img className='other-factors-img' src={`/assets/icons/${headingLower}.png`} alt="" />
          <span className='other-factors-title'>{heading}</span>
      </div>
      <span className='other-factors-data'>{value}</span>
    </div>
  )
}

export default WeatherCondition