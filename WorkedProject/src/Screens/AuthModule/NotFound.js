import React from 'react';
import robotNotFound from '../../assets/images/loginModule/robotNotFound.png'
import LoginImage from '../../assets/images/loginModule/anandaSpaLogo.svg'
import './NotFound.scss'

const NotFound = () => {
    return (
        <div className='notFoundContainer'>
            <div className='imgContainer'>
                <img className='logoImage' src={LoginImage} alt='' />
                <div className='roboDiv'>
                    <img className='roboImage' src={robotNotFound} alt='' />
                </div>
            </div>
            <div className='textContainer'>
                <div className='errorMainDiv'>
                    <h1>Page not found</h1>
                </div>
                <div className='errorSubText'>
                    <p>We're sorry, but the page you're looking for cannot be found.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
