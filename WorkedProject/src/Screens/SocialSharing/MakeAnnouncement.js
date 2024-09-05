import React from 'react'
import redCross from "../../assets/images/CommonComponent/redCross.svg"
import tick from "../../assets/images/CommonComponent/tick.svg"
import Profil from "../../assets/images/CommonComponent/Profil.png";
import whiteTick from "../../assets/images/socialSharing/whiteTick.svg";
import addImage from "../../assets/images/socialSharing/addImage.svg";
import AppContainer from '../../components/AppContainer/AppContainer';
import RecipeImage from "../../assets/images/RecipeModule/RecipeImage.png";
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import './MakeAnnouncement.scss';

const MakeAnnouncement = (props) => {

    const { history } = props;
    const navigate = useNavigate()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleNavigate = () => {
        navigate(-1);
    };

    return (
        <>
            <AppContainer history={history}>
                <div className="event-content">
                    <div className='MakeAnnouncement container-fluid d-flex align-items-stretch'>
                        <div className="row">
                            <div className="col-3 guestListColumn ">
                                <div className="guestListHeader d-flex align-items-center pl-3">
                                    <h4 className='mb-0'>Select Guest</h4>
                                </div>
                                <div className="selectAllDiv">
                                    <div className='d-flex align-items-center '>
                                        <Checkbox {...label} defaultChecked color="primary" className='checkDiv' />
                                        <h5 className='mb-0 ml-2'>Select All</h5>
                                    </div>
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
                            <div className="col-9 makeAnnColumn p-0 ">
                                <div className="makeAnnHeader d-flex justify-content-between align-items-center pl-3">
                                    <h4 className='mb-0'>Make Announcement</h4>
                                    <div className='btnsDiv'>
                                        <button type="button" className="btn btn-danger redButton" onClick={() => { handleNavigate() }}>
                                            <img className="mainIcon mb-1" src={redCross} alt="" width="22px" height="22px" />
                                            CANCEL</button>
                                        <button type="submit" className="btn btn-success greenButton ">
                                            <img className="mainIcon mb-1" src={tick} alt="" width="16px" height="16px" />
                                            CREATE</button>
                                    </div>
                                </div>

                                <div className='col d-flex'>
                                    <div className="mb-4 pr-0 TitleDiv">
                                        <input type="text"
                                            className="form-control Title"
                                            id="exampleFormControlInput1"
                                            placeholder="Enter Title"

                                            name='title'

                                        />
                                    </div>
                                </div>
                                <div className="mb-3 DescDiv">
                                    <textarea className="form-control textArea"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        name='description'
                                        placeholder="Enter description"

                                    >
                                    </textarea>
                                </div>
                                <div className="mb-3 attachmentDiv ">

                                    {1 == 1 ? <button type="button" className="btn btn-danger brownButton mr-3">
                                        <img className="mr-2 mb-1 " src={addImage} alt="" width="14px" height="14px" />Add Attachment</button>
                                        :
                                        <div className='mt-3'>
                                            <div className='mb-2 attachmentTitel'>
                                                Attachment
                                            </div>
                                            <div className='d-flex '>
                                                <img className="thumbNailImg" src={RecipeImage} alt="" height="96px" />
                                                <div className=' d-flex RemoveDiv align-items-center'>
                                                    <img className="mainIcon mr-1 " src={redCross} alt="" width="22px" height="22px" /> <p className='Remove mt-0 mb-0'>Remove</p>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </AppContainer >
        </>
    )
}
export default MakeAnnouncement
