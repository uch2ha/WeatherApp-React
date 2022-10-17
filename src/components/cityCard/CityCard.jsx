import React from 'react';
import './CityCard.css';

const CityCard = ({ city, day, temperature, deleteCity, id }) => {
    return (
        <div className='card-container'>
            <p>{city}</p>
            <p>7C</p>
            <p>img</p>
            <p>{day?.IconPhrase}</p>
            <button onClick={() => deleteCity(id)}>del</button>
        </div>
    );
};

export default CityCard;
