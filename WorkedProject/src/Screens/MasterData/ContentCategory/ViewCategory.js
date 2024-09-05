import React from 'react'
import './ViewCategory.scss';
import dummyVideo from '../../../assets/images/CommonComponent/dummyVideo.png';
import Select from "react-select";

const ViewCategory = () => {
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];
    return (
        <div className='ViewCategory'>
            <div className="card">
                <div className="card-header">
                    <h4>Videos</h4>
                    <div className=''>
                        <Select
                            placeholder="Active"
                            className="react-select"
                            classNamePrefix="react-select"

                            value="Level"
                            options={options}
                        />
                    </div>
                </div>
                <div className="separator"></div>
                <div className="card-body">
                    <div className='DecDiv'>
                        <ul className="list-group FirstGroup">
                            <li className="list-group-item">COUNT:</li>
                            <li className="list-group-item">FREE / PAID:</li>
                            <li className="list-group-item">CONTENT:</li>
                        </ul>
                        <ul className="list-group">
                            <li className="list-group-item">29</li>
                            <li className="list-group-item">18 / 11 Nights</li>
                            <li className="list-group-item">
                                <img className="mainIcon" src={dummyVideo} alt="" width="70px" height="70px" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default ViewCategory
