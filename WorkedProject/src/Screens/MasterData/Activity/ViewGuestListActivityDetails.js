import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppContainer from '../../../components/AppContainer/AppContainer';
import dummyGuestProfile from '../../../assets/images/CommonComponent/dummyGuestProfile.png';
import { getInterestedGuestList } from '../../../redux/actions/MasterDataAction/ActivityAction/ActivityAction';
import './ViewGuestListActivityDetails.scss';

const ViewGuestListProgramDetail = (props) => {
    const location = useLocation();
    const { history } = props;
    const [InterestedGuestList, setInterestedGuestList] = useState([]);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const { selectedActivityId } = location.state;
    const viewActivityGuestListRes = useSelector(state => state?.getInterestedGuestList?.getInterestedGuestList);

    useEffect(() => {
        if (props) {
            const sendRequest = {
                "activity_id": selectedActivityId,
                "search_text": searchText
            };
            dispatch(getInterestedGuestList(sendRequest));
        }
    }, [])

    useEffect(() => {
        if (props) {
            const sendRequest = {
                "activity_id": selectedActivityId,
                "search_text": searchText
            };
            dispatch(getInterestedGuestList(sendRequest));
        }
    }, [searchText])

    useEffect(() => {
        if (viewActivityGuestListRes && viewActivityGuestListRes?.data) {
            setInterestedGuestList(viewActivityGuestListRes?.data)
        }
    }, [viewActivityGuestListRes])

    const handleSearchGuest = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='mainActivityContainerGuestList'>
                    <div className='headerBox'>
                        <h4 className='pageTitleText'>Guest List</h4>
                        <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 LevelContainer'>
                            <div className="separator"></div>
                            <div className="mr-sm-2 searchDiv class-search ">
                                <input
                                    className="form-control mr-sm-2 class-search"
                                    type="search"
                                    placeholder=" Search Keyword"
                                    aria-label="Search"
                                    onChange={handleSearchGuest}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className='separatorLine'></div>
                    <div className='guestListCards'>
                        {InterestedGuestList.map(val => {
                            return (
                                <div className='guestListContainerDiv'>
                                    <div className='imgDiv'>
                                        <div className='profileImgDiv'>
                                            {val.profile_pic !== "" ?
                                                <img className="mainIcon" src={val.profile_pic} alt="image" width="60px" height="60px" />
                                                :
                                                <img className="mainIcon" src={dummyGuestProfile} alt="" width="60px" height="60px" />
                                            }
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
