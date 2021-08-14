import { actionTypes } from './actions';

const defaultState = {
  isRequestInProgress: false,
  error: false,
  forecast5city: null,
};

const Forecast5DaysReducer = (state = defaultState, { type = '', payload = {} }) => {
  const { error, forecast5city } = payload;
  switch (type) {
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
};

export default Forecast5DaysReducer;
