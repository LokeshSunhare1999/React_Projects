import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as routes from "../../../Router/RoutesURL";
import * as moment from 'moment';
import { createNotification } from '../../../Config/NotificationToast';
import Select from "react-select";
import AppContainer from '../../../components/AppContainer/AppContainer';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { viewActivityDetails } from '../../../redux/actions/MasterDataAction/ActivityAction/ActivityAction';
import './ViewActivity.scss';

const ViewProgram = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [viewActivityMainData, setViewActivityMainData] = useState('');
    const [selectedStatus, setSelectedStatus] = useState();
    const [selectedActivityId, setSelectedActivityId] = useState("");
    const [activityTitle, setActivityTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [repeatActivity, setRepeatActivity] = useState("");
    const [frequency, setFrequency] = useState(null);


    const viewActivityDataRes = useSelector(state => state?.viewActivityDetails?.viewActivityDetails?.data);

    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    const { activityId, permission } = location.state;
    const { history } = props;

    useEffect(() => {
        const sendRequest = {
            "activity_id": activityId
        };
        dispatch(viewActivityDetails(sendRequest));
    }, []);


    useEffect(() => {
        setSelectedStatus(viewActivityDataRes && viewActivityDataRes?.is_active);
        setActivityTitle(viewActivityDataRes && viewActivityDataRes?.title);
        setSelectedActivityId(viewActivityDataRes && viewActivityDataRes?.id);
        setViewActivityMainData(viewActivityDataRes && viewActivityDataRes);
        setSelectedDate(moment(viewActivityDataRes?.activity_datetime).format('MM/DD/YYYY'));
        setSelectedTime(moment(viewActivityDataRes?.activity_datetime).format('HH:mm:ss'));
        setRepeatActivity(viewActivityDataRes?.is_repeated)
        setFrequency(viewActivityDataRes && viewActivityDataRes?.frequency && JSON.parse(viewActivityDataRes?.frequency))
    }, [viewActivityDataRes])


    const handleChangeOption = (e, id) => {
        if(permission === "write"){
        setSelectedStatus(e.value === "Active" ? 1 : 0);
        if (e.value === "Active") {
            setViewActivityMainData(viewActivityMainData.is_active = 1)
        } else {
            setViewActivityMainData(viewActivityMainData.is_active = 0)
        }
        setViewActivityMainData(viewActivityMainData)
        const sendRequest = {
            "feature_type": "daily_activity",
            "id": id,
            "status": e.value === "Active" ? 1 : 0
        };
        dispatch(updateIsActiveStatus(sendRequest));
        }else{
            createNotification('warning', "Access Restricted");
        }
    }

    const handleViewGuestList = () => {
        if (viewActivityDataRes && activityId) {
            localStorage.setItem("viewProgramTitle", JSON.stringify(activityTitle));
            navigate(routes.VIEW_INTERESTED_GUEST_LIST_ACTIVITY, { state: { selectedActivityId, activityTitle } })
        }
    };

    return (
        <>
            <AppContainer history={history}>
                <div className="event-content">
                    <div className='ViewActivity'>
                        {viewActivityDataRes && viewActivityMainData && <div className="card">
                            <div className="card-header">
                                <h4 className='activityTitle'>{viewActivityMainData.title}</h4>
                                <div className=' d-flex'>
                                    <div>
                                        <Select
                                            className={viewActivityMainData.is_active === 1 ? "react-select" : "react-selectChange"}
                                            classNamePrefix="react-select"
                                            onChange={(e) => { handleChangeOption(e, viewActivityMainData.id) }}
                                            value={selectedStatus === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
                                            isSearchable={false}
                                            options={options}
                                            theme={(theme) => ({
                                                ...theme,
                                                isFocused: "#74613C",
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#F5F5F5',
                                                    primary: '#f6f4f0',

                                                },
                                            })}
                                            getOptionLabel={(row) => (
                                                <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"}
                                                >
                                                    {row.label}
                                                </span>
                                                    {row.status === 1 && (
                                                        <div

                                                        ></div>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="separator"></div>
                            <div className="card-body">
                                <div className='DecDiv'>
                                    <ul className="list-group FirstGroup">
                                        <li className="list-group-item boldText">ACTIVITY TITLE:</li>
                                        <li className="list-group-item boldText">CAPACITY:</li>
                                        <li className="list-group-item boldText">BOOKED USER:</li>
                                        <li className="list-group-item boldText">VENUE:</li>
                                        <li className="list-group-item boldText">DATE:</li>
                                        <li className="list-group-item boldText">REPEAT ACTIVITY:</li>
                                        {
                                            viewActivityMainData?.is_repeated === '1'? 
                                            <li className="list-group-item boldText">FREQUENCY:</li>
                                            :
                                            null
                                        }
                                        <li className="list-group-item boldText">TIME:</li>
                                        <li className="list-group-item boldText">DURATION:</li>
                                        <li className="list-group-item boldText">NOTES:</li>
                                    </ul>
                                    <ul className="list-group SecondGroup">
                                        <li className="list-group-item levelText">{viewActivityMainData.title}</li>
                                        <li className="list-group-item">{viewActivityMainData.no_of_capacity}</li>
                                        <li className="list-group-item">{viewActivityMainData.booked_user} <span className="viewLink" onClick={() => { handleViewGuestList() }}>View Guest List</span></li>
                                        <li className="list-group-item">{viewActivityMainData.venue}</li>
                                        {selectedDate?<li className="list-group-item">{selectedDate}</li>:""}
                                        <li className="list-group-item">{viewActivityMainData?.is_repeated === '1' ? "Yes" : "No"}</li>
                                        {
                                            viewActivityMainData?.is_repeated === '1'? 
                                            <li className="list-group-item text-capitalize">
                                                {frequency?.key} &nbsp;
                                                {
                                                    frequency?.key === "weekly"
                                                    ?
                                                    <>
                                                        
                                                        [{
                                                            frequency?.value.map((item, index)=>(
                                                                <React.Fragment>
                                                                    {item.value ? item.day : null}
                                                                    {item.value && index !== frequency?.value.length-1 ? ", " : null}
                                                                </React.Fragment>
                                                            ))
                                                        }]
                                                    </>
                                                    :
                                                    null
                                                }
                                            </li>
                                            :
                                            null
                                        }

                                        {selectedTime?<li className="list-group-item">{selectedTime}</li>:""}
                                        <li className="list-group-item">{viewActivityMainData.duration} Minutes</li>
                                        <li className="list-group-item">{viewActivityMainData.notes}</li>
                                    </ul>
                                </div>
                            </div>
                        </div >}
                    </div>

                </div >
            </AppContainer >
        </>
    )
}

export default ViewProgram
