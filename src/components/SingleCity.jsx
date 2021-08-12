import React, { Fragment, memo, useCallback, useMemo } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import getWeatherImage from 'helpers/weatherImage';
import getHumanTime from 'helpers/humanTime';

const SingleCity = memo((props) => {
  const { city, addToFavorite, removeFromFavorite } = props;

  const dispatch = useDispatch();

  const { sys, main, wind, coord, id, weather, name } = city;
  const { country, sunrise, sunset } = sys;

  const dateSunRise = useMemo(() => new Date(sunrise * 1000), [sunrise]);
  const dateSunSet = useMemo(() => new Date(sunset * 1000), [sunset]);
  const todayIs = useMemo(() => new Date().toLocaleDateString(), []);

  const sunRise = useMemo(() => getHumanTime(dateSunRise), [dateSunRise]);
  const sunSet = useMemo(() => getHumanTime(dateSunSet), [dateSunSet]);

  const removeFavorite = useCallback(() => dispatch(removeFromFavorite(city)), [dispatch, city, removeFromFavorite]);

  const addFavorite = useCallback(() => addToFavorite(city), [city, addToFavorite]);

  if (city && Object.keys(city).length) {
    return (
      <div className="single">
        <h2>{name}</h2>
        <img src={getWeatherImage(weather[0].icon)} alt="weather" />
        <p style={{ textAlign: 'center' }}>{weather[0].description}</p>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>t&deg; </td>
              <td>{(main.temp - 273.15).toFixed(0)}&#8451;</td>
            </tr>
            <tr>
              <td>Country:</td>
              <td>{country}</td>
            </tr>
            <tr>
              <td>Today is:</td>
              <td>{todayIs}</td>
            </tr>
            <tr>
              <td>Sunrise:</td>
              <td>{sunRise}</td>
            </tr>
            <tr>
              <td>Sunset:</td>
              <td>{sunSet}</td>
            </tr>
            <tr>
              <td>Humidity:</td>
              <td>{main.humidity}%</td>
            </tr>
            <tr>
              <td>Wind:</td>
              <td>
                {wind.deg ? (
                  <Fragment>
                    direction:&nbsp;
                    {wind.deg < 90 ? <span>North-East</span> : null}
                    {wind.deg >= 90 && wind.deg < 180 ? <span>South-East</span> : null}
                    {wind.deg >= 180 && wind.deg < 270 ? <span>South-West</span> : null}
                    {wind.deg >= 270 && wind.deg < 360 ? <span>North-West</span> : null}, <br />
                  </Fragment>
                ) : null}
                speed: {wind.speed} m/s
              </td>
            </tr>
            <tr>
              <td>Coordinates:</td>
              <td>
                {coord.lat} {coord.lon}
              </td>
            </tr>
          </tbody>
        </Table>
        <Link to={`${id}`}>
          <Button variant="dark">Forecast for 5 days</Button>
        </Link>
        {addToFavorite && <Button onClick={addFavorite}>Add to favorite</Button>}
        {removeFromFavorite && (
          <Button variant="danger" onClick={removeFavorite}>
            Remove from favorite
          </Button>
        )}
      </div>
    );
  }
  return <Spinner animation="grow" />;
});

export default SingleCity;
