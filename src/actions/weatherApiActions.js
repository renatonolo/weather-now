import WeatherApiServices from '../services/weatherApiServices';
import {
    WEATHER_API_REQUEST,
    WEATHER_API_SUCCESS,
    WEATHER_API_FAILED
} from './actionTypes';

export const weatherApiActions = {
    getByCities
};

let weatherApiServices = new WeatherApiServices();

function getByCities(city) {
    return async dispatch => {
        console.log('Calling infos');
        let response = [];

        dispatch(sendingRequest(city));

        let cached = weatherApiServices.getInformationsFromCache(city.cityName, city.countryName);
        if(cached) dispatch(success(cached));

        try {
            let res = await weatherApiServices.getInformationsByCityName(city.cityName, city.countryName);
            
            if(res) dispatch(success(res));
            else dispatch(fail(city));
        } catch(err) {
            dispatch(fail(city));
        }
    }
}

function sendingRequest(city) {
    return { type: WEATHER_API_REQUEST, data: city };
}

function success(data) {
    return { type: WEATHER_API_SUCCESS, data: data };
}

function fail(data) {
    return { type: WEATHER_API_FAILED, data: data };
}