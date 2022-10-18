import React from 'react';
import './CityCard.css';
import asd from '../../assets/img/1.png';
import { GrClose } from 'react-icons/gr';

const CityCard = ({ city, day, night, temperature, deleteCity, id }) => {
    const fromFtoC = (F) => {
        return ((F - 32) * 5) / 9;
    };

    const getAvgTemperature = (F1, F2) => {
        return ((fromFtoC(F1) + fromFtoC(F2)) / 2).toFixed(0);
    };

    return (
        <div className='card-container'>
            <p className='city-name'>{city}</p>
            <p className='day-night-title'>Day</p>
            <p className='temperature'>
                {getAvgTemperature(
                    temperature.Maximum.Value,
                    temperature.Minimum.Value
                )}
                ° C
            </p>
            <div className='img-container'>
                <img className='img' src={asd} />
            </div>
            <p className='description'>{day?.IconPhrase}</p>
            <button className='btn-delete' onClick={() => deleteCity(id)}>
                <GrClose />
            </button>
        </div>
    );
};

export default CityCard;
