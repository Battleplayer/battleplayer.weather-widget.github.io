export const actionTypes = {
  FORECAST_FIVEDAYS_REQ_START: 'FORECAST_FIVEDAYS_REQ_START',
  FORECAST_FIVEDAYS_REQ_SUCCESS: 'FORECAST_FIVEDAYS_REQ_SUCCESS',
  FORECAST_FIVEDAYS_REQ_ERROR: 'FORECAST_FIVEDAYS_REQ_ERROR',
};

export const requestForecast5City = () => ({
  type: actionTypes.FORECAST_FIVEDAYS_REQ_START,
});

export const requestForecast5CitySuccess = (forecast5city) => ({
  type: actionTypes.FORECAST_FIVEDAYS_REQ_SUCCESS,
  payload: {
    forecast5city,
  },
});
export const requestForecast5CityError = (error) => ({
  type: actionTypes.FORECAST_FIVEDAYS_REQ_ERROR,
  payload: {
    error,
  },
});
