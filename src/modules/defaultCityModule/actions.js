export const actionTypes = {
  GET_DEFAULT_CITY_COORDS_REQ_START: 'GET_DEFAULT_CITY_COORDS_REQ_START',
  GET_DEFAULT_CITY_COORDS_REQ_SUCCESS: 'GET_DEFAULT_CITY_COORDS_REQ_SUCCESS',
  GET_DEFAULT_CITY_COORDS_REQ_ERROR: 'GET_DEFAULT_CITY_COORDS_REQ_ERROR',
};

export const requestDefaultCity = () => ({
  type: actionTypes.GET_DEFAULT_CITY_COORDS_REQ_START,
});

export const requestDefaultCitySuccess = (defaultCity) => ({
  type: actionTypes.GET_DEFAULT_CITY_COORDS_REQ_SUCCESS,
  payload: {
    defaultCity,
  },
});
export const requestDefaultCityError = (error) => ({
  type: actionTypes.GET_DEFAULT_CITY_COORDS_REQ_ERROR,
  payload: {
    error,
  },
});
