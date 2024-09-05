import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    FormGroup,
    Label,
} from "reactstrap";
import Select from "react-select";
import { useSelector, useDispatch } from 'react-redux';
import AppContainer from '../../../components/AppContainer/AppContainer';
import { viewGuestListProgram } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import dummyGuestProfile from '../../../assets/images/CommonComponent/dummyGuestProfile.png';
import './ViewGuestListProgramDetail.scss';

const ViewGuestListProgramDetail = (props) => {
    const location = useLocation();
    const { history } = props;
    const [guestList, setGuestList] = useState([]);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [levelData, setLevelData] = useState({ value: 'Active', label: 'Active' });

    const viewGuestListRes = useSelector(state => state.viewGuestListProgram.viewGuestListPro);
    const { selectedProgramId } = location.state;

    useEffect(() => {
        if (props) {
            const sendRequest = {
                "program_id": selectedProgramId,
                "guest_type": "1",
                "search_text": searchText
            };
            dispatch(viewGuestListProgram(sendRequest));
        }
    }, [])

    useEffect(() => {
        if (props) {
            const sendRequest = {
                "program_id": selectedProgramId,
                "guest_type": levelData.value === "All" ? "" : levelData.value === "Active" ? "1" : levelData.value === "Completed" ? "0" : "",
                "search_text": searchText
            };
            dispatch(viewGuestListProgram(sendRequest));
        }
    }, [searchText, levelData])

    useEffect(() => {
        if (viewGuestListRes && viewGuestListRes?.data) {
            setGuestList(viewGuestListRes?.data)
        }
    }, [viewGuestListRes])

    const options = [
        { value: 'All', label: 'All' },
        { value: 'Active', label: 'Active' },
        { value: 'Completed', label: 'Completed' },
    ];

    const handleChangeLevel = (e) => {
        setLevelData(e)
    }

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='mainContainerGuestList'>
                    <div className='headerBox'>
                        <h4 className='pageTitleText'>Guest List</h4>
                        <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 LevelDiv'>
                            <FormGroup className="FormGroup has-float-label class-menu-dropdown ">
                                <Label>Type:</Label>
                                <Select

                                    className="react-select"
                                    classNamePrefix="react-select"
                                    value={levelData}
                                    options={options}
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
                            </FormGroup>
                            <div className="separator"></div>
                            <div className="mr-sm-2 searchDiv class-search ">
                                <input
                                    className="form-control mr-sm-2 class-search"
                                    type="search"
                                    placeholder=" Search Keyword"
                                    aria-label="Search"
                                    onChange={handleChangeSearch}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className='separatorLine'></div>
                    <div className='guestListCards'>
                        {guestList.map(val => {
                            return (
                                <div className='guestListContainerDiv'>
                                    <div className='imgDiv'>
                                        <div className='profileImgDiv'>
                                            <img className="mainIcon" src={dummyGuestProfile} alt="" width="60px" height="60px" />
                                        </div>
                                    </div>
                                    <div className='guestData'>
                                        <div className='guestName'>
                                            <p className='nameText'>{val.first_name}</p>
                                            <p className='lastNameText'>{val.last_name}</p>
                                        </div>
                                        <div className='phoneNoDiv'>
                                            <p className='phoneNoText'>{val.phone_number}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </AppContainer >
    )
}
export default ViewGuestListProgramDetail
