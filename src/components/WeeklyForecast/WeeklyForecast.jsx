import React, { useState } from 'react'
import "./weeklyforecast.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DayForecast from './DayForecast/DayForecast';


const WeeklyForecast = ({data}) => {

  const [showDots, setShowDots] = useState(false);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1450 },
      items: 7,
    },
    largeDesktop: {
      breakpoint: { max: 1449, min: 1201 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1200, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  

  const weeklyData = data.slice(0, 7);

  return (
    <div className="CarouselSlider">
      <h1>Weekly Forecast</h1>
      <Carousel
        itemClass="carousel-item" 
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        showDots={true}
      >
        {/* {data && (
        )} */}
        {weeklyData.map((day, index) => {
          return (
            <DayForecast day={day.datetime} icon={day.conditions} tempmax={day.tempmax} tempmin={day.tempmin} />
          );
        })}
      </Carousel>
    </div>
  );
}

export default WeeklyForecast