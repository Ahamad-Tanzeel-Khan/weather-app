import React from 'react'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import "./hourlyforecast.css"


const HourlyForecast = ({ hourlyData, tempmin, tempmax}) => {

    tempmax = Math.round((tempmax - 32) * (5 / 9)) - 2
    tempmin = Math.round((tempmin - 32) * (5 / 9)) - 2

    const filteredHourlyData = hourlyData.filter(hour => {
        const hourTime = parseInt(hour.datetime.split(':')[0]);
        return hourTime >= 0 && hourTime <= 23;
    });

    // Format the X-axis labels to display the time correctly
    const labels = filteredHourlyData.map(hour => {
        let [hours, minutes] = hour.datetime.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes ? minutes.padStart(2, '0') : '00';
        return `${hours}:${minutes} ${ampm}`;
    });


    const data = {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: hourlyData.map(hour => Math.round((hour.temp - 32) * (5 / 9))),
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
        },
      ],
    };
  
    const options = {
        scales: {
            x: {
                title: {
                display: true,
                text: 'Time',
                },
                ticks: {
                    color: 'white', // Set Y-axis values to white
                },
            },
            y: {
                title: {
                display: true,
                text: 'Temperature (°C)',
                },
                min: tempmin - 2,
                max: tempmax + 4, 
                ticks: {
                    color: 'white', // Set Y-axis values to white
                },
            },
        },
    };
  
    return (
      <div className="chart-container">
        <h1>Hourly Forecast</h1>
        <Line data={data} options={options} />
      </div>
    );
  };
  
  export default HourlyForecast;