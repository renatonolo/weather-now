import moment from 'moment';
import {
    WEATHER_API_URL,
    WEATHER_API_KEY,
    CACHE_EXPIRATION_MS
} from '../constants';

export default class WeatherApiServices {
    constructor() {
        console.log('WeatherApiServices constructor');
    }

    async getInformationsByCityName(cityName, countryName) {
        let url = `${WEATHER_API_URL}?q=${cityName},${countryName}&units=metric&APPID=${WEATHER_API_KEY}`;
        let response = {};
        
        try {
            let res = await fetch(url, {
                method: 'GET'
            });

            if(res.status == 200) {
                const data = await res.json();
                let now = new moment();
                
                response = {
                    cityName: data.name,
                    countryName: data.sys.country,
                    temp: data.main.temp,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    lastUpdate: {
                        format: now.format('HH:mm:ss'),
                        timestamp: now.unix()
                    }
                };

                this.storeInformationToCache(response.cityName, response.countryName, response);

                return response;
            } else return null;
        } catch(err) {
            return null;
        }
    }

    getInformationsFromCache(cityName, countryName) {
        const index = `${cityName}.${countryName}`;
        
        try {
            let res = localStorage.getItem(index) || null;
            
            if(typeof res == 'string') {
                const data = JSON.parse(res);
                const now = new moment();
                const savedAt = (data.lastUpdate && data.lastUpdate.timestamp) ? new moment(data.lastUpdate.timestamp * 1000) : null;
                
                if(now.diff(savedAt, 'seconds') <= CACHE_EXPIRATION_MS) return data;
            }
            
            return null;
        } catch(err) {
            return null;
        }
    }

    storeInformationToCache(cityName, countryName, data) {
        const index = `${cityName}.${countryName}`;
        const json = (typeof data != 'string') ? JSON.stringify(data) : null;

        try {
            localStorage.setItem(index, json);
            return true;
        } catch(err) {
            return false;
        }
    }
}