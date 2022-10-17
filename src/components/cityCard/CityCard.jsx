import React from 'react';
import './CityCard.css';
import asd from '../../assets/img/1.png';

const CityCard = ({ city, day, night, temperature, deleteCity, id }) => {
    const fromFtoC = (F) => {
        return (((F - 32) * 5) / 9).toFixed(0);
    };

    return (
        <div className='card-container'>
            <div className='title'>
                <p>{city}</p>
            </div>
            <div className='day-night'>
                <div>
                    <p className='day-night-title'>Day</p>
                    <img src={asd} />
                    <p className='test-styles'>{day?.IconPhrase}</p>
                </div>
                <div>
                    <p className='day-night-title'>Night</p>
                    <img src={asd} />
                    <p>{night?.IconPhrase}</p>
                </div>
            </div>
            <div className='min-max'>
                <div>
                    <p className='day-night-title'>Min</p>
                    <p>{fromFtoC(temperature.Minimum.Value)}° C</p>
                </div>
                <div>
                    <p className='day-night-title'>Max</p>
                    <p>{fromFtoC(temperature.Maximum.Value)}° C</p>
                </div>
            </div>

            <button className='btn' onClick={() => deleteCity(id)}>
                del
            </button>
        </div>
    );
};

export default CityCard;
