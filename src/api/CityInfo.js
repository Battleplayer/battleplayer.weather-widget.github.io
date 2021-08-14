import { requestSearchCity, requestSearchCityError, requestSearchCitySuccess } from 'modules/citiesModule/actions';
import {
  requestDefaultCity,
  requestDefaultCityError,
  requestDefaultCitySuccess,
} from 'modules/defaultCityModule/actions';
import {
  requestForecast5City,
  requestForecast5CityError,
  requestForecast5CitySuccess,
} from 'modules/forecast5DaysModule/actions';

import Api from './Api';

export const getDefaultCity = (lat, lng) => async (dispatch) => {
  dispatch(requestDefaultCity());
  await Api.client
    .get(`/weather?lat=${lat}&lon=${lng}`)
    .then(({ data }) => {
      dispatch(requestDefaultCitySuccess(data));
    })
    .catch(({ message }) => {
      dispatch(requestDefaultCityError(message));
    });
};

export const getSearchedCity = (name) => async (dispatch) => {
  dispatch(requestSearchCity());
  await Api.client
    .get(`/weather?q=${name}`)
    .then(({ data }) => {
      dispatch(requestSearchCitySuccess(data));
    })
    .catch(({ message }) => dispatch(requestSearchCityError(message)));
};

export const getForecastCity = (id) => async (dispatch) => {
  if (!id) return;
  dispatch(requestForecast5City());
  await Api.client
    .get(`/forecast?id=${id}`)
    .then(({ data }) => {
      dispatch(requestForecast5CitySuccess(data));
    })
    .catch(({ message }) => dispatch(requestForecast5CityError(message)));
};
