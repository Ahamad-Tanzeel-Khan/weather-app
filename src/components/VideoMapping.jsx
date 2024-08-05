const VideoMapping = (condition) => {
  const conditions = condition.split(',').map(cond => cond.trim());
  for (let cond of conditions) {
    switch (cond) {
      case 'Clear':
        return '/assets/background/clear-sky.mp4';
      case 'Partly cloudy':
      case 'Partially cloudy':
      case 'Overcast':
        return '/assets/background/partly-cloudy.mp4';
      case 'Mostly cloudy':
        return '/assets/background/cloudy.mp4';
      case 'Rain':
      case 'Light rain':
        return '/assets/background/rain.mp4';
      case 'Heavy rain':
        return '/assets/background/heavy rain.mp4'
      case 'Snow':
      case 'Light snow':
      case 'Heavy snow':
        return '/assets/background/snow.mp4';
      case 'Sleet':
        return '/assets/background/sleet.mp4';
      case 'Fog':
        return '/assets/background/fog.mp4';
      case 'Windy':
        return '/assets/background/windy.mp4';
      case 'Thunderstorm':
        return '/assets/background/thunderstorm.mp4';
      default:
        return '/assets/background/default.mp4';
    }
  }

  return '/assets/background/default.mp4';
};

export default VideoMapping;
