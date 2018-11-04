import React from 'react';

import './weatherCard.scss';

const WeatherCard = (props) => {
    const weather = props.weather;
    let tempClass = '';
    let humidityPressure = null;

    if(weather.temp <= 5) tempClass = '--blue';
    else if(weather.temp > 5 && weather.temp <= 25) tempClass = '--orange';
    else tempClass = '--red';

    if(weather.humidity && weather.pressure) humidityPressure = (
        <div className="humidityPressure">
            <div className="humidity">
                <p>Humidity</p>
                <p>{weather.humidity}<span> %</span></p>
            </div>
            <div className="pressure">
                <p>Pressure</p>
                <p>{weather.pressure}<span> hPa</span></p>
            </div>
        </div>
    );

    return (
        <div className="wn_card">
            <p className="header">{weather.cityName}, {weather.countryName}</p>
            <p className={`temperature temperature${tempClass}`}>{weather.temp}°</p>
            <div className="details">
                { humidityPressure }
                <p className="lastUpdate">Updated at {weather.lastUpdate}</p>
            </div>
        </div>
    );
}

export default WeatherCard;