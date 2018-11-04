import {
    WEATHER_API_REQUEST,
    WEATHER_API_SUCCESS,
    WEATHER_API_FAILED
} from '../actions/actionTypes';

const initialState = {
    data: null,
    error: ''
};

const weatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case WEATHER_API_REQUEST:
        return parseLoading(action, state);

        case WEATHER_API_SUCCESS:
        return parseSuccess(action, state);

        default:
        return state;
    }
}

function parseLoading(action, state) {
    const index = `${action.data.cityName}.${action.data.countryName}`;
    let data = {};

    if(state.data !== null) data = { ...state.data };

    data[index] = {
        loading: true
    };

    return {
        ...state,
        data: data
    };
}

function parseSuccess(action, state) {
    const index = `${action.data.cityName}.${action.data.countryName}`;
    let data = {};

    if(state.data !== null) data = { ...state.data };

    data[index] = action.data;

    return {
        ...state,
        data: data
    };
}

export default weatherReducer;