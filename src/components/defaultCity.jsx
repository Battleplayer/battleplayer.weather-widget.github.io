import React, { memo, useCallback, useMemo } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import getWeatherImage from 'helpers/weatherImage';
import getHumanTime from 'helpers/humanTime';
import { addToFavorite, removeFromFavorite } from 'modules/citiesModule/actions';

const DefaultCity = memo(() => {
  const dispatch = useDispatch();

  const myCity = useSelector((state) => state.defaultCity.defaultCity);
  const cities = useSelector((state) => state.savedCities.cities);

  const {
    sys: { country, sunrise, sunset },
    main,
    wind,
    coord,
    weather,
    name,
    id,
  } = myCity;

  const dateSunRise = useMemo(() => new Date(sunrise * 1000), [sunrise]);
  const dateSunSet = useMemo(() => new Date(sunset * 1000), [sunset]);
  const todayIs = useMemo(() => new Date().toLocaleDateString(), []);

  const sunRise = useMemo(() => getHumanTime(dateSunRise), [dateSunRise]);
  const sunSet = useMemo(() => getHumanTime(dateSunSet), [dateSunSet]);

  const removeFavorite = useCallback(() => dispatch(removeFromFavorite(myCity)), [dispatch, myCity]);

  const canRemove = useMemo(() => cities.findIndex((el) => el.id === id) > 0, [cities, id]);

  const addFavorite = useCallback(() => {
    if (cities.findIndex((el) => el.id === id) > 0) return;
    dispatch(addToFavorite(myCity));
  }, [cities, dispatch, myCity, id]);

  const getDirection = useCallback((direction) => {
    switch (true) {
      case direction < 90:
        return 'North-East';
      case direction >= 90 && direction < 180:
        return 'South-East';
      case direction >= 180 && direction < 270:
        return 'South-West';
      case direction >= 270 && direction < 360:
        return 'North-West';
      default:
        return 'Checking';
    }
  }, []);

  if (!myCity) return <Spinner animation="grow" />;
  return (
    <div className="my-city">
      <h2>Weather in your city: {name}</h2>
      <img src={getWeatherImage(weather[0].icon)} alt="weather" />
      <p style={{ textAlign: 'center' }}>{weather[0].description}</p>
      <div className="my-city--row my-city--row__name">
        <span>t&deg;</span>
        <span>Country:</span>
        <span>Today is:</span>
        <span>Sunrise:</span>
        <span>Sunset:</span>
        <span>Humidity:</span>
        <span>Wind:</span>
        <span>Coordinates:</span>
      </div>
      <div className="my-city--row my-city--row__details">
        <span>{(main.temp - 273.15).toFixed(0)}&#8451;</span>
        <span>{country}</span>
        <span>{todayIs}</span>
        <span>{sunRise}</span>
        <span>{sunSet}</span>
        <span>{main.humidity}%</span>
        <span>
          {getDirection(wind.deg)}
          <br />
          speed: {wind.speed} m/s
        </span>

        <span>
          {coord.lat} {coord.lon}
        </span>
      </div>
      <Button variant="dark" className="mb-3 mt-3">
        Forecast for 5 days
      </Button>
      {canRemove ? (
        <Button variant="danger" onClick={removeFavorite}>
          Remove from favorite
        </Button>
      ) : (
        <Button onClick={addFavorite}>Add to favorite</Button>
      )}
    </div>
  );
});

export default DefaultCity;
