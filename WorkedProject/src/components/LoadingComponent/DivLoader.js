import React from 'react';
import loaderImag from '../../assets/images/CommonComponent/PepperyMedium.gif'

const DivLoader = () => {
    return (
        <div className='divLoad'>
            <img
                src={loaderImag}
                alt=""
                className="loaderIconCss"
            />
        </div>
    )
}
export default DivLoader;