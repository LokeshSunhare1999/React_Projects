import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as routes from "../../../Router/RoutesURL";
import playOutlineFilled from '../../../assets/images/CommonComponent/playOutlineFilled.png';
import dummyVideoThumbnail from '../../../assets/images/CommonComponent/dummyVideoThumbnail.png';
import Geentick from '../../../assets/images/CommonComponent/Geentick.svg';
import redCross from '../../../assets/images/CommonComponent/redCross.svg';
import Select from "react-select";
import AppContainer from '../../../components/AppContainer/AppContainer';
import { createNotification } from '../../../Config/NotificationToast';
import { viewProgram, updateIsActiveStatus, updateProgramRequest } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import Modal from 'react-bootstrap/Modal';

import './ViewProgram.scss';

const ViewProgram = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [viewProgramMainData, setViewProgramMainData] = useState('');
    const [programId, setPorgramId] = useState('');
    const [programTitle, setPorgramTitle] = useState('');
    const [newLevel, setNewLevel] = useState('');
    const [newDuration, setNewDuration] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [showBtns, setShowBtns] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isActivePrepDiet, setIsActivePrepDiet] = useState(false);
    const [isActiveSelfAssessment, setIsActiveSelfAssessment] = useState(false);
    const viewProgramDataRes = useSelector(state => state.viewProgram?.viewProgram?.data);

    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    const Leveloptions = [
        { value: 'Comprehensive', label: 'Comprehensive' },
        { value: 'Foundation & Comprehensive', label: 'Foundation & Comprehensive' },
    ];

    const { selectedProgramId, permission } = location.state;
    const { history } = props;

    useEffect(() => {
        const sendRequest = {
            "programId": selectedProgramId
        };
        dispatch(viewProgram(sendRequest));
    }, []);

    useEffect(() => {
        setSelectedStatus(viewProgramDataRes && viewProgramDataRes?.status);
        setViewProgramMainData(viewProgramDataRes && viewProgramDataRes);
        setPorgramId(viewProgramDataRes?.program_id);
        setPorgramTitle(viewProgramDataRes?.title);
        setNewLevel({ value: viewProgramDataRes?.level, label: viewProgramDataRes?.level });
        setNewDuration(viewProgramDataRes?.duration);
        setNewDescription(viewProgramDataRes?.description);
        setIsActivePrepDiet(viewProgramDataRes?.is_preparatory_diet_enabled === 0 ? false : true);
        setIsActiveSelfAssessment(viewProgramDataRes?.is_self_assessment_enabled === 0 ? false : true);
    }, [viewProgramDataRes])

    const payload = { "program_id": programId, "title": programTitle, "level": newLevel, "duration": newDuration, "description": newDescription, "is_preparatory_diet_enabled": isActivePrepDiet? 1 : 0, "is_self_assessment_enabled": isActiveSelfAssessment? 1 : 0 }

    const toggleButton = () => {
        setIsActivePrepDiet(!isActivePrepDiet);
        setShowBtns(true);
    };

    const toggleSelfAssessmentButton = () => {
        setIsActiveSelfAssessment(!isActiveSelfAssessment);
        setShowBtns(true);
    };

    const handlePublish = () => {
        const sendRequest = {
            "feature_type": "program",
            "payload": payload,
            "name": programTitle
        };
        dispatch(updateProgramRequest(sendRequest));
        setShowDeleteModal(false);
    }

    const viewGuestList = () => {
        if (viewProgramMainData && selectedProgramId) {
            localStorage.setItem("viewProgramTitle", JSON.stringify(viewProgramMainData.title));
            navigate(routes.VIEW_GUEST_LIST_PROGRAM, { state: { selectedProgramId } })
        }
    };

    const handleChangeOption = (e, id) => {
        if(permission === "write"){
            setSelectedStatus(e.value === "Active" ? 1 : 0);
            if (e.value === "Active") {
                setViewProgramMainData(viewProgramMainData.status = 1)
            } else {
                setViewProgramMainData(viewProgramMainData.status = 0)
            }
            setViewProgramMainData(viewProgramMainData)
            const sendRequest = {
                "feature_type": "programs",
                "id": id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        }else{
            createNotification('warning', "Access Restricted");
        }
    }

    const cancelWarnModal = () => {
        setNewLevel({ value: viewProgramDataRes?.level, label: viewProgramDataRes?.level });
        setNewDuration(viewProgramDataRes?.duration);
        setNewDescription(viewProgramDataRes?.description);
        setShowDeleteModal(false);
        setShowBtns(false);
        setIsActivePrepDiet(viewProgramDataRes?.is_preparatory_diet_enabled === 0 ? false : true);
        setIsActiveSelfAssessment(viewProgramDataRes?.is_self_assessment_enabled === 0 ? false : true);
    }

    const handleOpenModal = () => {
        if(permission === "write"){
            setShowDeleteModal(true);
        }else{
            createNotification('warning', "Access Restricted");
        }
    }

    const handleChangeLevel = (e) => {
        setNewLevel(e)
        setShowBtns(true)
    }

    const handleChangeDuration = (e) => {
        setNewDuration(e.target.value);
        setShowBtns(true)
    }

    const handleChangeDesc = (e) => {
        setNewDescription(e.target.value);
        setShowBtns(true)
    }

    return (
        <>
            <AppContainer history={history}>
                <div className="event-content">
                    <div className='ViewPrograms'>
                        {viewProgramDataRes && viewProgramMainData && <div className="card">
                            <div className="card-header">
                                <h4 className='programTitle'>{viewProgramMainData.title}</h4>
                                <div className=' d-flex'>
                                    <div>
                                        <button type="button" className="selButton" onClick={handleOpenModal}>Request For Edit</button>
                                    </div>
                                    <div>
                                        <Select
                                            className={viewProgramMainData.status === 1 ? "react-select" : "react-selectChange"}
                                            classNamePrefix="react-select"
                                            onChange={(e) => { handleChangeOption(e, viewProgramMainData.program_id) }}
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
                                        <li className="list-group-item">LEVEL:</li>
                                        <li className="list-group-item">DURATION:</li>
                                        <li className="list-group-item">CREATED ON:</li>
                                        <li className="list-group-item">USAGE:</li>
                                        <li className="list-group-item">Is Preparatory Diet Enabled:</li>
                                        <li className="list-group-item">Is Self Assessment Enabled:</li>
                                        <li className="list-group-item">DESCRIPTION:</li>
                                    </ul>
                                    <ul className="list-group SecondGroup">
                                        <li className="list-group-item levelText">{viewProgramMainData.level}</li>
                                        <li className="list-group-item">{viewProgramMainData.duration}</li>
                                        <li className="list-group-item">{viewProgramMainData.created_on}</li>
                                        <li className="list-group-item">{viewProgramMainData.usage}<span className="viewLink" onClick={() => { viewGuestList() }}>  View Guest List</span></li>
                                        <li className="list-group-item">{viewProgramDataRes?.is_preparatory_diet_enabled === 0 ? "No" : "Yes"}</li>
                                            <li className="list-group-item">{viewProgramDataRes?.is_self_assessment_enabled === 0 ? "No" : "Yes"}</li>
                                        <li className="list-group-item">{viewProgramMainData.description}</li>
                                    </ul>
                                </div>
                                <div className='DecDiv'>
                                    <ul className="list-group FirstGroup">
                                        <li className="list-group-item">CONTENT: </li>
                                    </ul>
                                    <div className='LastGroupDiv'>
                                        {viewProgramMainData && viewProgramMainData.contents.map((val, index) => (
                                            <ul className="list-group LastGroup" key={index}>
                                                <li className="list-group-item">
                                                    <img className="videoPlayIcon" src={playOutlineFilled} alt="" width="70px" height="70px" />
                                                    <img className="mainIcon" src={dummyVideoThumbnail} alt="" width="70px" height="70px" />
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div >}
                    </div>

                    <Modal className=" POPUPS br-8" show={showDeleteModal} onHide={() => { setShowDeleteModal(false) }} centered={false} >
                        <Modal.Header>
                            <Modal.Title>Request For Edit</Modal.Title>
                            {showBtns == true && newDuration != "" && newDescription != "" ?
                                <div className='btnsDiv'>
                                    <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelWarnModal}>
                                        <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                        CANCEL</button>
                                    <button type="submit" className="btn btn-success greenButton" onClick={handlePublish} >
                                        <img className="mainIcon mr-2" src={Geentick} alt="" width="16px" height="16px" />
                                        SUBMIT REQUEST</button>
                                </div>
                                : " "}
                        </Modal.Header>
                        <div className='proTitleDiv'>
                            <div className="mb-3 pr-0 ml-2">
                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Level</label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    value={newLevel}
                                    required={true}
                                    options={Leveloptions}
                                    onChange={handleChangeLevel}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#F5F5F5',
                                            primary: '#74613C',
                                        },
                                    })}
                                />
                            </div>
                            <div className="mb-3 pr-0 ml-2">
                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Duration</label>
                                <input
                                    className="form-control Title"
                                    type="text"
                                    name='firstName'
                                    value={newDuration}
                                    placeholder="Enter first name"
                                    onChange={(event) => handleChangeDuration(event)}

                                />
                            </div>
                            <div className="mb-1 pr-0 ml-2 mr-2">
                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Description</label>
                                <div className='titleDiv'>
                                    <textarea className="textArea"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        name='description'
                                        placeholder="Enter description"
                                        value={newDescription}
                                        onChange={(event) => handleChangeDesc(event)}
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className="mb-3 pr-0 ml-2 mr-2">
                            <div className="mb-3 pr-0 ml-2 toggleDiv">
                                <label htmlFor="exampleFormControlInput1" className="form-label Label toggleTitle">Is Preparatory Diet Enabled:
                                </label>
                                <label className={`slider-toggle-button ${isActivePrepDiet ? 'active' : ''}`} htmlFor="toggle">
                                    <input type="checkbox" id="toggle" checked={isActivePrepDiet} onChange={toggleButton} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="mb-3 pr-0 ml-2 toggleDiv">
                                <label htmlFor="exampleFormControlInput" className="form-label Label toggleTitle">Is Self Assessment Enabled:
                                </label>
                                <label className={`slider-toggle-button ${isActiveSelfAssessment ? 'active' : ''}`} htmlFor="selfAssessmentToggle">
                                    <input type="checkbox" id="selfAssessmentToggle" checked={isActiveSelfAssessment} onChange={toggleSelfAssessmentButton} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            </div>

                        </div>
                    </Modal>
                </div >
            </AppContainer >
        </>
    )
}

export default ViewProgram
