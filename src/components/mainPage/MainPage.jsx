import React, { useState } from 'react';
import ScrollableCityCards from '../scrollableCityCards/ScrollableCityCards';
import './MainPage.css';

const API_KEY = '?apikey=ExIw1Hbp9pDy8DN7PdxLtPsTi8NYGGlS';

const LOCATION_KEY_API =
    'https://dataservice.accuweather.com/locations/v1/cities/search';

const WEATHER_API =
    'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';

const MainPage = () => {
    const [data, setData] = useState([]);
    const [cityName, setCityName] = useState('');
    const [locationKeyError, setLocationKeyError] = useState(false);
    const [otherError, setOtherError] = useState(false);

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
                setOtherError(false);
                return responseData;
            })
            .catch(() => setOtherError(true));
    };

    const setCityWeatherData = async () => {
        const locationKey = await getLocationKeyFromAPI();
        let cityData = '';
        if (locationKey !== undefined) {
            cityData = await getWeatherDataFromAPI(locationKey);
        }
        if (cityData) {
            cityData['id'] = Date.now(); // add id to each element  in the array
            cityData['City'] = cityName;
            await setData((prev) => [...prev, cityData]);
            setCityName('');
        }
    };

    return (
        <div className='main-container'>
            {otherError && <div className='error-message'>OTHER ERROR</div>}
            {locationKeyError && (
                <div className='error-message'>LOCATION KEY ERROR</div>
            )}
            <div className='search-bar'>
                <input
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value.toLowerCase())}
                    placeholder='Enter the city name'
                />
                <button onClick={() => setCityWeatherData()}>Find</button>
            </div>
            <ScrollableCityCards />
        </div>
    );
};

export default MainPage;
