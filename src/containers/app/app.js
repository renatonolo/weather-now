import React from 'react'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'

import Topbar from '../../components/topbar';
import WeatherCard from '../../components/weatherCard';

import { weatherApiActions } from '../../actions/weatherApiActions';

import './app.scss'

class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.cities = [
            { cityName: 'Nuuk', countryName: 'GL', showHumidityPressure: false },
            { cityName: 'Urubici', countryName: 'BR', showHumidityPressure: true },
            { cityName: 'Nairobi', countryName: 'KE', showHumidityPressure: false }
        ];

        autoBind(this);
        
        this.getTemperatures();
    }

    getTemperatures() {
        let { dispatch } = this.props;
        
        this.cities.forEach(city => {
            dispatch(weatherApiActions.getByCities(city));
        });

        window.setTimeout(this.getTemperatures, CACHE_EXPIRATION_MS);
    }

    buildCards() {
        let cards = [];

        for(let i = 0; i < this.cities.length; i++) {
            const city = this.cities[i];
            const index = `${city.cityName}.${city.countryName}`;
            let card = <WeatherCard key={i} weather={{
                cityName: city.cityName,
                countryName: city.countryName
            }}/>;

            if(this.props.data && this.props.data[index]) {
                let data = this.props.data[index];
                const lastUpdate = (data.lastUpdate && data.lastUpdate.format) ? data.lastUpdate.format : '';

                card = <WeatherCard 
                key={i} 
                weather={{
                    cityName: city.cityName,
                    countryName: city.countryName,
                    temp: data.temp || 0,
                    humidity: data.humidity || null,
                    pressure: data.pressure || null,
                    lastUpdate: lastUpdate
                }}
                showHumidityPressure={city.showHumidityPressure}
                loading={data.loading || false}/>;
            } else {
                card = <WeatherCard 
                key={i} 
                weather={{
                    cityName: city.cityName,
                    countryName: city.countryName
                }}
                showHumidityPressure={city.showHumidityPressure}
                loading={true}/>;
            }

            cards.push(card);
        }

        return cards;
    }

    render() {
        return (
            <div className="wn_app">
                <Topbar />
                <main>
                    {this.buildCards()}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);