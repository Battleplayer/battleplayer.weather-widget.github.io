import React, { useState, useEffect, memo, Fragment, useCallback } from 'react';
import { Container, Row, Alert, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultCity } from 'api/CityInfo';

import ForecastCity from 'components/ForecastCity';
import SingleCity from 'components/SingleCity';
import DefaultCity from 'components/defaultCity';
import { addToFavorite } from 'modules/citiesModule/actions';

const CitiesContainer = memo(() => {
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [defaultCity, setDefaultCity] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  const dispatch = useDispatch();

  const myCity = useSelector((state) => state.defaultCity.defaultCity);

  const error = useSelector((state) => state.savedCities.error);
  const searchedCity = useSelector((state) => state.savedCities.searchedCity);
  const cities = useSelector((state) => state.savedCities.cities);

  const displayLocationInfo = useCallback((position) => {
    setLng(position.coords.longitude.toFixed(2));
    setLat(position.coords.latitude.toFixed(2));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
  }, [displayLocationInfo]);

  useEffect(() => {
    if (lat && lng && !defaultCity) {
      dispatch(getDefaultCity(lat, lng));
      setDefaultCity(myCity);
    }
  }, [defaultCity, dispatch, lat, lng, myCity]);

  const pushToArray = (city) => {
    let arr = cities;
    const index = arr.findIndex((e) => e.id === city.id);
    if (index === -1) {
      dispatch(addToFavorite(city));
    } else {
      arr[index] = city;
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 4000);
    }
  };

  return (
    <Fragment>
      <Container fluid>
        <Row>
          {isAdded && <Alert variant="success">This city has been already added to favorite!</Alert>}
          {error && (
            <Alert variant="danger">
              {error === 'Request failed with status code 401' && <span>Bad access key.</span>}
              {error === 'Request failed with status code 404' && <span>Error, wrong city code using saved data.</span>}
              {error === 'Request failed with status code 429' && (
                <span>You are using free tariff, try again in one minute.</span>
              )}
            </Alert>
          )}
        </Row>
        {myCity && (
          <Row>
            <Col>
              <DefaultCity />
            </Col>
          </Row>
        )}
      </Container>

      <Container>
        <Row>
          {searchedCity && (
            <Col>
              <h2>Searched city</h2>
              <SingleCity city={searchedCity} addToFavorite={pushToArray} />
            </Col>
          )}
        </Row>

        {cities.length > 0 && (
          <Row>
            <Col md={12}>
              <h2>Favorite cities</h2>
            </Col>
            <div className="cities-list">
              {cities.map((city) => (
                <Col md={4} key={city.id}>
                  <SingleCity city={city} canRemove />
                </Col>
              ))}
            </div>
          </Row>
        )}

        <ForecastCity />
      </Container>
    </Fragment>
  );
});

export default CitiesContainer;
