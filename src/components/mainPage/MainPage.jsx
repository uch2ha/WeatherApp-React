import React, { useEffect, useState } from 'react';
import ErrorMessages from '../errorMessages/ErrorMessages';
import ScrollableCityCards from '../scrollableCityCards/ScrollableCityCards';
import './MainPage.css';

const API_KEY = '2Y2R69TYA0cgP68Jmxt7GAsDbtC2i6SF';

const LOCATION_KEY_API =
    'https://dataservice.accuweather.com/locations/v1/cities/search';

const WEATHER_API =
    'https://dataservice.accuweather.com/forecasts/v1/daily/1day/';

const MainPage = () => {
    const [data, setData] = useState([]);
    const [cityName, setCityName] = useState('');
    const [firstLoad, setFirstLoad] = useState(true);
    const [locationKeyError, setLocationKeyError] = useState(false);
    const [otherError, setOtherError] = useState(false);
    const [duplicateCitiesError, setDuplicateCitiesError] = useState(false);

    useEffect(() => {
        if (firstLoad) {
            const item = localStorage.getItem('weather_data');
            if (item !== undefined) {
                setData(JSON.parse(item));
            }
            setFirstLoad(false);
        }
    }, [data]);

    useEffect(() => {
        if (!firstLoad) {
            localStorage.setItem('weather_data', JSON.stringify(data));
        }
    }, [data]);

    const getLocationKeyFromAPI = () => {
        return fetch(LOCATION_KEY_API + '?apikey=' + API_KEY + '&q=' + cityName)
            .then((response) => response.json())
            .then((responseData) => {
                setLocationKeyError(false);
                return responseData[0].Key;
            })
            .catch(() => setLocationKeyError(true));
    };

    const getWeatherDataFromAPI = (key) => {
        return fetch(WEATHER_API + key + '?apikey=' + API_KEY)
            .then((response) => response.json())
            .then((responseData) => {
                setOtherError(false);
                setDuplicateCitiesError(false);
                return responseData.DailyForecasts[0];
            })
            .catch(() => setOtherError(true));
    };

    const setCityWeatherData = async () => {
        let locationKey = await getLocationKeyFromAPI();
        data?.forEach((city) => {
            if (city.City === cityName) {
                locationKey = undefined; // don't let add duplicates cities
                setDuplicateCitiesError(true);
                setCityName('');
            }
        });
        let cityData = '';
        if (locationKey !== undefined) {
            cityData = await getWeatherDataFromAPI(locationKey);
        }

        if (cityData) {
            cityData['id'] = Date.now(); // add id to each element in the array
            cityData['City'] = cityName;

            setData((prev) => {
                if (prev === undefined || prev === null) {
                    return [cityData];
                }
                return [...prev, cityData];
            });
            setCityName('');
        }
    };

    const deleteCityFromData = (id) => {
        const newCityList = data.filter((city) => city.id !== id);
        setData(newCityList);
    };

    return (
        <div className='main-container'>
            <ErrorMessages
                otherError={otherError}
                locationKeyError={locationKeyError}
                duplicateCitiesError={duplicateCitiesError}
            />
            <div className='search-bar'>
                <input
                    className='input-field'
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value.toLowerCase())}
                    placeholder='Enter the city name'
                    onKeyDown={(e) => e.key === 'Enter' && setCityWeatherData()}
                />
                <button
                    className='btn-search'
                    onClick={() => setCityWeatherData()}
                >
                    Search
                </button>
            </div>
            {data?.length > 0 && (
                <ScrollableCityCards
                    data={data}
                    deleteCityFromData={deleteCityFromData}
                />
            )}
        </div>
    );
};

export default MainPage;
