import { actionTypes } from './actions';

const defaultState = {
  isRequestInProgress: false,
  error: false,
  cities: [],
};

const CitiesReducer = (state = defaultState, { type = '', payload = {} }) => {
  const { searchedCity, error, city } = payload;
  switch (type) {
    case actionTypes.SEARCH_CITY_REQ_START:
      return {
        ...state,
        error: '',
        isRequestInProgress: true,
      };
    case actionTypes.SEARCH_CITY_REQ_SUCCESS:
      return {
        ...state,
        searchedCity,
        isRequestInProgress: false,
      };
    case actionTypes.SEARCH_CITY_REQ_ERROR:
      return {
        ...state,
        error,
        isRequestInProgress: false,
      };
    case actionTypes.ADD_TO_FAVORITE:
      return {
        ...state,
        cities: state.cities.findIndex((el) => el.id === city.id) > 0 ? state.cities : state.cities.concat(city),
      };
    case actionTypes.REMOVE_FROM_FAVORITE:
      return {
        ...state,
        cities: state.cities.filter((c) => c.id !== city.id),
      };
    default:
      return state;
  }
};

export default CitiesReducer;
