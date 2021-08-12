import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Slider from 'react-slick';
import getWeatherImage from 'helpers/weatherImage';

const ForecastCity = memo(() => {
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 5,
    }),
    []
  );

  const forecast5city = useSelector((state) => state.forecast5city);

  if (!forecast5city) return null;

  return (
    <div>
      <h2>Forecast for 5 day for city {forecast5city.city.name}</h2>
      <Slider {...settings} className="forecast">
        {forecast5city.list.map((city) => (
          <div key={city.dt} className="forecast__item">
            <h4>{new Date(city.dt * 1000).toLocaleString().replace(/:[^:]*$/, '')}</h4>
            <h5>{(city.main.temp - 273.15).toFixed(0)}&#8451;</h5>
            <img src={getWeatherImage(city.weather[0].icon)} alt="weather" />
            <p>{city.weather[0].description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
});

export default ForecastCity;
