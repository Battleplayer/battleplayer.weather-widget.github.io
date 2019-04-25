import axios from 'axios';

export const actionTypes = {
    GET_DEFAULT_CITY_COORDS_REQ_START: 'GET_DEFAULT_CITY_COORDS_REQ_START',
    GET_DEFAULT_CITY_COORDS_REQ_SUCCESS: 'GET_DEFAULT_CITY_COORDS_REQ_SUCCESS',
    GET_DEFAULT_CITY_COORDS_REQ_ERROR: 'GET_DEFAULT_CITY_COORDS_REQ_ERROR',
    SEARCH_CITY_REQ_START: 'SEARCH_CITY_REQ_START',
    SEARCH_CITY_REQ_SUCCESS: 'SEARCH_CITY_REQ_SUCCESS',
    SEARCH_CITY_REQ_ERROR: 'SEARCH_CITY_REQ_ERROR',
    ADD_TO_FAVORITE: 'ADD_TO_FAVORITE',
    REMOVE_FROM_FAVORITE: 'REMOVE_FROM_FAVORITE'
};

let _url = 'http://api.openweathermap.org/data/2.5/weather';
let _apiID = '3476f426c6d8f97027e143c1f5b3b21e';


export const requestDefaultCity = () => ({
    type: actionTypes.GET_DEFAULT_CITY_COORDS_REQ_START
});


export const requestDefaultCitySuccess = defaultCity => ({
    type: actionTypes.GET_DEFAULT_CITY_COORDS_REQ_SUCCESS,
    payload: {
        defaultCity,
    },
});
export const requestDefaultCityError = error => ({
    type: actionTypes.GET_DEFAULT_CITY_COORDS_REQ_ERROR,
    payload: {
        error,
    },
});
export const requestSearchCity = () => ({
    type: actionTypes.SEARCH_CITY_REQ_START
});


export const requestSearchCitySuccess = searchedCity => ({
    type: actionTypes.SEARCH_CITY_REQ_SUCCESS,
    payload: {
        searchedCity,
    },
});
export const requestSearchCityError = error => ({
    type: actionTypes.SEARCH_CITY_REQ_ERROR,
    payload: {
        error,
    },
});
export const addToFavorite = city => ({
    type: actionTypes.ADD_TO_FAVORITE,
    payload: {
        city,
    },
});export const removeFromFavorite = city => ({
    type: actionTypes.REMOVE_FROM_FAVORITE,
    payload: {
        city,
    },
});

export const getDefaultCity = (lat, lng) => async dispatch => {
    dispatch(requestDefaultCity());
    await axios
        .get(`${_url}?lat=${lat}&lon=${lng}&APPID=${_apiID}`)
        .then(({data}) => {
            dispatch(requestDefaultCitySuccess(data));
        })
        .catch(({message}) => dispatch(requestDefaultCityError(message)));
};
export const getSearchedCity = (name) => async dispatch => {
    dispatch(requestSearchCity());
    await axios
        .get(`${_url}?q=${name}&APPID=${_apiID}`)
        .then(({data}) => {
            dispatch(requestSearchCitySuccess(data));
        })
        .catch(({message}) => dispatch(requestSearchCityError(message)));
};