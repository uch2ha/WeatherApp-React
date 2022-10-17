import React from 'react';
import './ScrollableCityCards.css';
import CityCard from '../cityCard/CityCard';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const ScrollableCityCards = ({ data, deleteCityFromData }) => {
    const slideLeft = () => {
        let slider = document.getElementById('scrollable');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        let slider = document.getElementById('scrollable');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <div className='scrollable-container'>
            <MdChevronLeft size={40} onClick={slideLeft} />
            <div id='scrollable' className='citys-cards-container'>
                {data.map((city) => (
                    <CityCard
                        key={city?.id}
                        city={city?.City}
                        day={city?.Day}
                        temperature={city?.Temperature}
                        deleteCity={deleteCityFromData}
                        id={city?.id}
                    />
                ))}
            </div>
            <MdChevronRight size={40} onClick={slideRight} />
        </div>
    );
};

export default ScrollableCityCards;
