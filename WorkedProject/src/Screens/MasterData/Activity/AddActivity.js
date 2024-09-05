import React, { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css'
import DatePicker from 'react-datepicker'
import { format, setDay } from "date-fns";
import Select from "react-select";
import * as textMessage from "../../../Config/Constant";
import redCross from "../../../assets/images/CommonComponent/redCross.svg";
import calendarIcon from '../../../assets/images/CommonComponent/calendarIcon.png';
import historyIcon from '../../../assets/images/CommonComponent/history.svg';
import greenPlus from '../../../assets/images/CommonComponent/greenPlus.svg';
import AppContainer from '../../../components/AppContainer/AppContainer';
import { addActivity } from '../../../redux/actions/MasterDataAction/ActivityAction/ActivityAction';
import { getUserRoleList } from '../../../redux/actions/UserManagementAction/TeamMembersAction/TeamMembersAction';
import { useDispatch } from 'react-redux';
import { createNotification } from '../../../Config/NotificationToast';
import * as moment from 'moment';
import {
    durationOptions,
    frequencyOptions,
    weekdays
} from '../../../utils/Helper';
import './AddActivity.scss';
import { Checkbox } from '@mui/material';

const AddActivity = (props) => {
    const { history } = props;
    const [title, setTitle] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');
    const [venue, setVenue] = useState('');
    const [capacity, setCapacity] = useState();
    const [date, setDate] = useState('');
    const [selectedTime, setSelectedTime] = useState("");
    const [notes, setNotes] = useState('');
    const [showBtns, setShowBtns] = useState(false);
    const [repeatActivity, setRepeatActivity] = useState(false);
    const [selectedFrequency, setSelectedFrequency] = useState(null);
    const [selectedDays, setSelectedDays] = useState(weekdays);

    const dispatch = useDispatch();
    const customStyles = {
        singleValue: (provided, state) => ({
            ...provided,
            fontWeight: 400
        }),
    };

    useEffect(() => {
        const sendRequest = {
            "pageNo": 1,
            "pageSize": "",
        }
        dispatch(getUserRoleList(sendRequest));
    }, []);

    useEffect(() => {
        if (title !== "" && venue !== "" && capacity !== "" && selectedTime !== "" && date !== "" && notes !== "" && selectedDuration !== "" && ((repeatActivity && selectedFrequency !==null) || !repeatActivity)) {
            setShowBtns(true);
        } else {
            setShowBtns(false);
        }
    }, [title, venue, capacity, selectedTime, date, notes, selectedDuration, selectedDays, repeatActivity, selectedFrequency])


    const cancelSubmit = () => {
        setShowBtns(false);
        setTitle('');
        setVenue('');
        setCapacity('');
        setSelectedTime("");
        setDate('');
        setNotes('');
        setSelectedDuration('');
        selectedDays(weekdays);
        setSelectedFrequency('');
        setRepeatActivity(false)
    };

    const submitData = () => {
        if (title !== "" || notes !== "" || date !== "" || selectedTime !== "" || venue !== "" || capacity !== "" || selectedDuration !== "" && ((repeatActivity && selectedFrequency !== null) || !repeatActivity)) {
            const validEmail = textMessage.PHONE_REGEX;
            if (!validEmail.test(capacity)) {
                createNotification('warning', 'Capacity must be Number*');
                return false;
            }
            const dateTimeString = `${date}T${selectedTime}`;
            const localDate = new Date(dateTimeString);
            const utcDate = localDate.toISOString().split('T')[0]; // UTC date in format "YYYY-MM-DD"
            const utcTime = localDate.toISOString().split('T')[1].slice(0, 8); // UTC time in format "HH:mm:ss"

            let frequency = selectedFrequency?.value === 'daily' 
                ? {"key" : "daily",  "value" : ""}
                : selectedFrequency?.value === 'weekly'
                    ? {"key" : "weekly",  "value" : [...selectedDays]}
                    : selectedFrequency?.value === 'monthly'
                        ? {"key" : "monthly",  "value" : utcDate + " " + utcTime}
                        :null

            const sendRequest = {
                "title": title,
                "notes": notes,
                "activity_datetime": utcDate + " " + utcTime,
                "venue": venue,
                "no_of_capacity": Number(capacity),
                "duration": selectedDuration.value,
                "is_repeated": + repeatActivity,
                "frequency": JSON.stringify(frequency)
            };
            dispatch(addActivity(sendRequest));
            setShowBtns(false);
            setTitle('');
            setVenue('');
            setCapacity('');
            setSelectedTime("");
            setDate('');
            setNotes('');
            setSelectedDuration('');
            setSelectedFrequency(null)
            setRepeatActivity(false)
            setSelectedDays(weekdays)

        }
    }

    const handleChange = (val) => {
        setSelectedDuration(val)
    }
    const handleFrequencyChange = (val)=>{
        setSelectedDays(weekdays)   
        setSelectedFrequency(val)
    }

    const handleSelectDays = (e)=>{
        if(e.target.checked){
            setSelectedDays((prev)=>{
                return [...prev.filter(item => item.day !== e.target.value), {value: 1, day: e.target.value}]
            })
        }else{
            setSelectedDays((prev)=>{
                return [...prev.filter(item => item.day !== e.target.value), {value: 0, day: e.target.value}]
            })
        }
    }

    const handleChangeCapacity = (val) => {
        const regexName = textMessage.PHONE_REGEX;
        const nameFormat = regexName.test(val);
        if (val === "") {
            setCapacity(val);
        } else if (nameFormat && val.length < 12) {
            setCapacity(val);
        }
    }

    const handleChangeStartDate = (val) => {
        const formattedDate = format(val, "yyyy-MM-dd");
        setDate(formattedDate)
    }

    const SetTime = (date) => {
        setSelectedTime(moment(date).format("HH:mm:ss"));
    }

    const handleRepeatActivity = (e)=>{
        if(date){
            setRepeatActivity((prev)=> !prev)
            if(!e.target.checked){
                setSelectedDays(weekdays)
                setSelectedFrequency(null)
            }
        }
    }

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='add-activity'>
                    <div className="card">
                        <div className="card-header">
                            <h4 className='mb-0'>Add New Activity</h4>
                            {showBtns && (<div className=''>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelSubmit}>
                                    <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL</button>
                                <button type="button" className="btn btn-success greenButton " onClick={submitData}>
                                    <img className="mainIcon mr-2" src={greenPlus} alt="" width="16px" height="16px" />
                                    ADD</button>
                            </div>)}
                        </div>
                        <div className="separator"></div>
                        <div className="card-body ">
                            <div className='row cardDiv'>
                                <div className='col'>
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Title*</label>
                                            <input
                                                className="form-control Title"
                                                type="text"
                                                value={title}
                                                placeholder="Enter title"
                                                onChange={(e) => { setTitle(e.target.value) }}
                                            />
                                        </div>
                                        <div className="mb-3 d-flex ml-4">
                                            <div className="mb-3 pr-0">
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Venue*</label>
                                                <input
                                                    className="form-control Title"
                                                    type="text"
                                                    placeholder="Enter venue"
                                                    value={venue}
                                                    onChange={(e) => { setVenue(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Capacity*</label>
                                            <div className="mb-3 pr-0 d-flex phoneNoInput">
                                                <input
                                                    className="form-control Title"
                                                    type="text"
                                                    placeholder="Enter capacity"
                                                    value={capacity}
                                                    onChange={(event) => handleChangeCapacity(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex ml-4">
                                            <div className="mb-3 pr-0 d-flex align-items-end justify-content-between activity-date-div">
                                                <div>
                                                    <label htmlFor="exampleFormControlInput1" className="form-label Label">Date*</label>
                                                    <div className='dateBlock'>
                                                        {date == "" ?
                                                            <div className="dayDateTextDiv" ><p className="dayDateTextPlaceholder">Select date</p></div>
                                                            : <div className="dayDateTextDiv" ><p className="dayDateText">{date}</p></div>
                                                        }
                                                        <div className='datePickerDiv'>
                                                            <DatePicker
                                                                minDate={new Date()}
                                                                onChange={date => { handleChangeStartDate(date) }}
                                                                customInput={
                                                                    <img src={calendarIcon} className="calIcon" alt="" />
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center mb-1'>
                                                    <div>
                                                        <Checkbox
                                                        checked={repeatActivity}
                                                        onChange={handleRepeatActivity}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                        size="small"
                                                            sx={{
                                                                color: "#74613C",
                                                                '&.Mui-checked': {
                                                                color: "#74613C",
                                                                },
                                                            }}
                                                            />
                                                    </div>
                                                    <div>Repeat activity</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        repeatActivity
                                        &&
                                        <div className='d-flex'>
                                            <div className="mb-3 pr-0">
                                                <label htmlFor="frequency" className="form-label Label">Frequency*</label>
                                                <div className='frequencyBlock'>
                                                    <Select
                                                        placeholder="Select"
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        onChange={handleFrequencyChange}
                                                        value={selectedFrequency}
                                                        options={frequencyOptions}
                                                        styles={customStyles}
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            isFocused: "#74613C",
                                                            colors: {
                                                                ...theme.colors,
                                                                primary25: '#F5F5F5',
                                                                primary: '#74613C',
                                                            },
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 d-flex ml-4 align-items-end">
                                                <div className="mb-3 pr-0">
                                                    {
                                                        selectedFrequency?.value === "weekly" && 
                                                            <div className='weekly-frequency'>
                                                                <div className="check-box-input d-flex">
                                                                    {
                                                                        weekdays?.length && weekdays.map((item, index)=>(
                                                                            <div className="check-box" key={index}>
                                                                                <input type="checkbox" name='day' value={item.day} 
                                                                                    checked={selectedDays.filter(e => e.day === item.day)[0].value}
                                                                                    onChange={(e)=>{handleSelectDays(e, item)}}
                                                                                />
                                                                                <label htmlFor={item.day}> {item.day}</label>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Time*</label>
                                            <div className="mb-3 pr-0 d-flex phoneNoInput">
                                                <div className="dateSubBlock">
                                                    {selectedTime == "" ?
                                                        <div className="dayDateTextDiv" >
                                                            <p className="dayDateTextPlaceholder">Select time</p></div>
                                                        : <div className="dayDateTextDiv" >
                                                            <p className="dayDateText">{selectedTime}</p>
                                                        </div>
                                                    }
                                                    <DatePicker
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        className='timeCal'
                                                        selected={new Date()}
                                                        onChange={date => { SetTime(date) }}
                                                        timeFormat={"HH:mm"}
                                                        timeIntervals={15}
                                                        customInput={<img src={historyIcon} className="remIcon" alt="" width="18" height="18" />}
                                                        timeCaption="Hour"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex ml-4">
                                            <div className="mb-3 pr-0">
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Duration*</label>
                                                <div className='durationBlock'>
                                                    <Select
                                                        placeholder="Duration"
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        onChange={handleChange}
                                                        value={selectedDuration}
                                                        options={durationOptions}
                                                        styles={customStyles}
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            isFocused: "#74613C",
                                                            colors: {
                                                                ...theme.colors,
                                                                primary25: '#F5F5F5',
                                                                primary: '#74613C',
                                                            },
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Notes*</label>
                                            <textarea className="form-control textArea" id="exampleFormControlTextarea1" rows="3" placeholder="Enter notes"
                                                value={notes}
                                                onChange={(e) => { setNotes(e.target.value) }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </AppContainer >
    )
}
export default AddActivity
