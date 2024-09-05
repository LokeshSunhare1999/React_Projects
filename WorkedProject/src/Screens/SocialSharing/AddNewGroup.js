import React from 'react'
import redCross from "../../assets/images/CommonComponent/redCross.svg"
import tick from "../../assets/images/CommonComponent/tick.svg"
import Profil from "../../assets/images/CommonComponent/Profil.png";
import whiteTick from "../../assets/images/socialSharing/whiteTick.svg";
import AppContainer from '../../components/AppContainer/AppContainer';
import { useNavigate } from 'react-router-dom';
import './AddNewGroup.scss';

const AddNewGroup = (props) => {
    const { history } = props;
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(-1);
    };
    return (
        <>
            <AppContainer history={history}>
                <div className="event-content">
                    <div className='AddNewGroup container-fluid d-flex align-items-stretch'>
                        <div className="row">
                            <div className="col-3 chatListColumn ">
                                <div className="chatListHeader d-flex align-items-center pl-3">
                                    <h4 className='mb-0'>Chat List</h4>
                                </div>
                                <div className="selectAllDiv ">

                                    <div className='groupDiv d-flex align-items-center'>
                                        <img src={Profil} className="profilImage mr-3 ml-3" alt="Avatar" />
                                        <h5 className=''>Default Group Default Group</h5>
                                    </div>
                                    <div className='Seperator ml-3 mr-3'></div>
                                    <div className='groupDiv d-flex align-items-center'>
                                        <div className='gropIcon mr-3 ml-3'>
                                            <img src={whiteTick} className="" alt="Avatar" width="20px" height="14px" />
                                        </div>
                                        <h5 className=''>Default Group Default Group</h5>
                                    </div>
                                    <div className='Seperator ml-3 mr-3'></div>
                                    <div className='groupDiv d-flex align-items-center'>
                                        <img src={Profil} className="profilImage mr-3 ml-3" alt="Avatar" />
                                        <h5 className=''>Default Group Default Group</h5>
                                    </div>
                                    <div className='Seperator ml-3 mr-3'></div>
                                    <div className='groupDiv d-flex align-items-center'>
                                        <img src={Profil} className="profilImage mr-3 ml-3" alt="Avatar" />
                                        <h5 className=''>Default Group Default Group</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9 addNewColumn p-0 ">
                                <div className="addNewHeader d-flex justify-content-between align-items-center pl-3">
                                    <h6 className='mb-0'>Group Name:</h6>
                                    <div className='col d-flex'>
                                        <div className="pr-0 TitleDiv">
                                            <input type="text"
                                                className="form-control Title"
                                                id="exampleFormControlInput1"
                                                placeholder="Enter Group Name"
                                                name='title'
                                            />
                                        </div>
                                    </div>
                                    <div className='btnsDiv'>
                                        <button type="button" className="btn btn-danger redButton" onClick={() => { handleNavigate() }}>
                                            <img className="mainIcon mb-1" src={redCross} alt="" width="22px" height="22px" />
                                            CANCEL</button>
                                        <button type="submit" className="btn btn-success greenButton ">
                                            <img className="mainIcon mb-1" src={tick} alt="" width="16px" height="16px" />
                                            CREATE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </AppContainer >
        </>
    )

}

export default AddNewGroup
