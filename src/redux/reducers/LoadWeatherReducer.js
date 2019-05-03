import { actionTypes } from '../actions/LoadWeatherAction';

const defaultState = {
	isRequestInProgress: false,
	error: false,
	defaultCity: {},
	searchedCity: {},
	cities: [],
	forecast5city: {},
};

export default function(state = defaultState, { type = '', payload = {} }) {
	const { defaultCity, searchedCity, error, city, forecast5city } = payload;
	switch (type) {
		case actionTypes.GET_DEFAULT_CITY_COORDS_REQ_START:
			return {
				...state,
				error: '',
				searchedCity: {},
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
				cities: [...state.cities, city],
			};
		case actionTypes.REMOVE_FROM_FAVORITE:
			return {
				...state,
				cities: state.cities.filter(c => c.id !== city.id),
			};
		case actionTypes.FORECAST_FIVEDAYS_REQ_START:
			return {
				...state,
				error: '',
				isRequestInProgress: true,
			};
		case actionTypes.FORECAST_FIVEDAYS_REQ_SUCCESS:
			return {
				...state,
				forecast5city,
				isRequestInProgress: false,
			};
		case actionTypes.FORECAST_FIVEDAYS_REQ_ERROR:
			return {
				...state,
				error,
				isRequestInProgress: false,
			};

		default:
			return state;
	}
}
