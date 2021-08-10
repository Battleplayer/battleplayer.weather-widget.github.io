import React, { Fragment, memo, useCallback, useMemo } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleCity = memo((props) => {
  const { city, addToFavorite, removeFromFavorite } = props;

  const dispatch = useDispatch();

  const { sys, main, wind, coord, id, weather, name } = city;
  const { country, sunrise } = sys;

  const date = useMemo(() => new Date(sunrise * 1000), [sunrise]);
  const todayIs = useMemo(() => date.toLocaleDateString(), [date]);

  let sunRise = '';
  let sunSet = '';

  if (city && Object.keys(city).length) {
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let seconds = '0' + date.getSeconds();
    sunRise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    sunSet = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  const removeFavorite = useCallback(() => dispatch(removeFromFavorite(city)), [dispatch, city, removeFromFavorite]);

  const addFavorite = useCallback(() => dispatch(addToFavorite(city)), [dispatch, city, addToFavorite]);

  if (city && Object.keys(city).length) {
    return (
      <div className="single">
        <h2>{name}</h2>
        <img src={`https://openweathermap.org/img/w/${weather[0].icon}.png`} alt="weather" />
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
