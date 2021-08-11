import React, { memo, useEffect, useMemo } from 'react';
import { useLocation, useParams, useRouteMatch, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Slider from 'react-slick';
import getWeatherImage from 'helpers/weatherImage';
import { getForecastCity } from '../api/CityInfo';

const ForecastCity = memo((props) => {
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

  const dispatch = useDispatch();
  const aa = useLocation();
  // console.log(aa);

  // useEffect(() => dispatch(getForecastCity(id)), [id]);

  if (Object.keys(forecast5city).length) {
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
  } else {
    return <Spinner />;
  }
});

export default ForecastCity;
