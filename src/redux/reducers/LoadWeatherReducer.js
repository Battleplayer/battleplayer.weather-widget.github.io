import {actionTypes} from '../actions/LoadWeatherAction';

const defaultState = {
    defaultName: '',
    defaultCoords: ''
};

export default function (state = defaultState, {type = '', payload = {}}) {
    const {defaultName, defaultCoords} = payload;
    switch (type) {
        case actionTypes.GET_MY_CITY_NAME:
            return {
                ...state,
                defaultName
            };
        case actionTypes.GET_MY_CITY_COORDS:
            return {
                ...state,
                defaultCoords
            };

        default:
            return state;
    }
}