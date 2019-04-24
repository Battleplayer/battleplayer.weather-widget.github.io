export const actionTypes = {
    GET_MY_CITY_NAME: 'GET_MY_CITY_NAME',
    GET_MY_CITY_COORDS: 'GET_MY_CITY_COORDS'
};


export const myCityName = data => ({
    type: actionTypes.GET_MY_CITY_NAME,
    payload: {
        data,
    }
});
export const myCityCoords = data => ({
    type: actionTypes.GET_MY_CITY_COORDS,
    payload: {
        data,
    }
});


