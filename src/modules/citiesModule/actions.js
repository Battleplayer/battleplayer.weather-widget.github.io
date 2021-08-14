export const actionTypes = {
  SEARCH_CITY_REQ_START: 'SEARCH_CITY_REQ_START',
  SEARCH_CITY_REQ_SUCCESS: 'SEARCH_CITY_REQ_SUCCESS',
  SEARCH_CITY_REQ_ERROR: 'SEARCH_CITY_REQ_ERROR',
  ADD_TO_FAVORITE: 'ADD_TO_FAVORITE',
  REMOVE_FROM_FAVORITE: 'REMOVE_FROM_FAVORITE',
};

export const requestSearchCity = () => ({
  type: actionTypes.SEARCH_CITY_REQ_START,
});

export const requestSearchCitySuccess = (searchedCity) => ({
  type: actionTypes.SEARCH_CITY_REQ_SUCCESS,
  payload: {
    searchedCity,
  },
});
export const requestSearchCityError = (error) => ({
  type: actionTypes.SEARCH_CITY_REQ_ERROR,
  payload: {
    error,
  },
});
export const addToFavorite = (city) => ({
  type: actionTypes.ADD_TO_FAVORITE,
  payload: {
    city,
  },
});
export const removeFromFavorite = (city) => ({
  type: actionTypes.REMOVE_FROM_FAVORITE,
  payload: {
    city,
  },
});
