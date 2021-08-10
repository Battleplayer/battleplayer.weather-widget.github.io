import React, { memo, useEffect, useMemo } from 'react';
import { useLocation, useParams, useRouteMatch, withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
// import { getForecastCity } from '../redux/actions/LoadWeatherAction';
import Slider from 'react-slick';
import { getForecastCity } from '../api/CityInfo';
import { useStore } from 'react-redux';

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

  const { forecast5city } = useStore().getState();

  const dispatch = useDispatch();
  const aa = useLocation();
  console.log(aa);

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
              <img src={`{REACT_WEATHER_IMG_URL${city.weather[0].icon}.png`} alt="weather" />
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
