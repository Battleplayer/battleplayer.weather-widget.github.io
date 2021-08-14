import { actionTypes } from './actions';

const defaultState = {
  isRequestInProgress: false,
  error: false,
  defaultCity: null,
};

const defaultCityReducer = (state = defaultState, { type = '', payload = {} }) => {
  const { defaultCity, error } = payload;
  switch (type) {
    case actionTypes.GET_DEFAULT_CITY_COORDS_REQ_START:
      return {
        ...state,
        error: '',
        searchedCity: null,
        isRequestInProgress: true,
      };
    case actionTypes.GET_DEFAULT_CITY_COORDS_REQ_SUCCESS:
      return {
        ...state,
        defaultCity,
        isRequestInProgress: false,
      };
    case actionTypes.GET_DEFAULT_CITY_COORDS_REQ_ERROR:
      return {
        ...state,
        error,
        isRequestInProgress: false,
      };
    default:
      return state;
  }
};

export default defaultCityReducer;
