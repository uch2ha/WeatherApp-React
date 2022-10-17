import React, { useState } from 'react';
import CityCard from '../cityCard/CityCard';
import './MainPage.css';

const API_KEY = '?apikey=ExIw1Hbp9pDy8DN7PdxLtPsTi8NYGGlS';

const LOCATION_KEY_API =
    'https://dataservice.accuweather.com/locations/v1/cities/search';

const WEATHER_API =
    'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';

const MainPage = () => {
    const [data, setData] = useState([]);
    const [cityName, setCityName] = useState('');
    const [locationKeyError, setLocationKeyError] = useState(false); // add 2 errotr????

    const getLocationKeyFromAPI = () => {
        return fetch(LOCATION_KEY_API + API_KEY + '&q=' + cityName)
            .then((response) => response.json())
            .then((responseData) => {
                setLocationKeyError(false);
                return responseData[0].Key;
            })
            .catch(() => setLocationKeyError(true));
    };

    const getWeatherDataFromAPI = (key) => {
        return fetch(WEATHER_API + key + API_KEY)
            .then((response) => response.json())
            .then((responseData) => {
                return responseData;
            })
            .catch(() => setLocationKeyError(true));
    };

    const setCityWeatherData = async () => {
        const locationKey = await getLocationKeyFromAPI();
        let cityData = '';
        if (locationKey !== undefined) {
            cityData = await getWeatherDataFromAPI(locationKey);
        }
        if (cityData) {
            cityData['City'] = cityName;
            await setData((prev) => [...prev, cityData]);
            setCityName('');
        }
    };

    return (
        <div className='main-container'>
            <div className='search-bar'>
                <input
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value.toLowerCase())}
                    placeholder='Enter the city name'
                />
                <button onClick={() => setCityWeatherData()}>Find</button>
            </div>
            <div className='citys-card-container'>
                <CityCard />
                <CityCard />
                <CityCard />
            </div>
        </div>
    );
};

export default MainPage;
