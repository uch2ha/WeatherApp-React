import React, { useState } from 'react';
import './CityCard.css';
import img1 from '../../assets/img/1.png';
import img2 from '../../assets/img/2.png';
import img3 from '../../assets/img/3.png';
import img4 from '../../assets/img/4.png';
import img5 from '../../assets/img/5.png';
import img6 from '../../assets/img/6.png';
import img7 from '../../assets/img/7.png';
import img8 from '../../assets/img/8.png';
import img11 from '../../assets/img/11.png';
import img12 from '../../assets/img/12.png';
import img13 from '../../assets/img/13.png';
import img14 from '../../assets/img/14.png';
import img15 from '../../assets/img/15.png';
import img16 from '../../assets/img/16.png';
import img17 from '../../assets/img/17.png';
import img18 from '../../assets/img/18.png';
import img19 from '../../assets/img/19.png';
import img20 from '../../assets/img/20.png';
import img21 from '../../assets/img/21.png';
import img22 from '../../assets/img/22.png';
import img23 from '../../assets/img/23.png';
import img24 from '../../assets/img/24.png';
import img25 from '../../assets/img/25.png';
import img26 from '../../assets/img/26.png';
import img29 from '../../assets/img/29.png';
import img32 from '../../assets/img/32.png';
import img33 from '../../assets/img/33.png';
import img34 from '../../assets/img/34.png';
import img35 from '../../assets/img/35.png';
import img36 from '../../assets/img/36.png';
import img37 from '../../assets/img/37.png';
import img38 from '../../assets/img/38.png';
import img39 from '../../assets/img/39.png';
import img40 from '../../assets/img/40.png';
import img41 from '../../assets/img/41.png';
import img42 from '../../assets/img/42.png';
import img43 from '../../assets/img/43.png';
import img44 from '../../assets/img/44.png';
import { GrClose } from 'react-icons/gr';

const IMAGES = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    null,
    null,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
    img24,
    img25,
    img26,
    null,
    null,
    img29,
    null,
    null,
    img32,
    img33,
    img34,
    img35,
    img36,
    img37,
    img38,
    img39,
    img40,
    img41,
    img42,
    img43,
    img44,
];

const CityCard = ({ city, day, night, temperature, deleteCity, id }) => {
    const [isDayData, setIsDayData] = useState(true);

    const fromFtoC = (F) => {
        return (((F - 32) * 5) / 9).toFixed(0);
    };

    return (
        <div className='card-container'>
            <div
                className={[
                    'flipped-container',
                    isDayData ? 'day' : 'night',
                ].join(' ')}
                onClick={() => setIsDayData((prev) => !prev)}
            >
                <p className='city-name'>{city}</p>
                {isDayData ? (
                    <p className='day-night-title'>Day</p>
                ) : (
                    <p className='day-night-title'>Night</p>
                )}
                {isDayData ? (
                    <p className='temperature'>
                        {fromFtoC(temperature.Maximum.Value)}° C
                    </p>
                ) : (
                    <p className='temperature'>
                        {fromFtoC(temperature.Minimum.Value)}° C
                    </p>
                )}

                {isDayData ? (
                    <>
                        <div className='img-container'>
                            <img className='img' src={IMAGES[day.Icon - 1]} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className='img-container'>
                            <img className='img' src={IMAGES[night.Icon - 1]} />
                        </div>
                    </>
                )}
                {isDayData ? (
                    <p className='description'>{day?.IconPhrase}</p>
                ) : (
                    <p className='description'>{night?.IconPhrase}</p>
                )}
            </div>
            <button className='btn-delete' onClick={() => deleteCity(id)}>
                <div className='btn-div'>
                    <GrClose />
                </div>
            </button>
        </div>
    );
};

export default CityCard;
