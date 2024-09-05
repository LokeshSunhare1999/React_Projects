import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import * as routes from "../../Router/RoutesURL";
import AppContainer from '../../components/AppContainer/AppContainer';
import WhitePlus from "../../assets/images/CommonComponent/WhitePlus.svg"
import Profil from "../../assets/images/CommonComponent/Profil.png";
import group from "../../assets/images/socialSharing/group.svg";
import addImage from "../../assets/images/socialSharing/addImage.svg";
import RecipeImage from "../../assets/images/RecipeModule/RecipeImage.png";
import redCross from "../../assets/images/CommonComponent/redCross.svg";
import tick from "../../assets/images/CommonComponent/tick.svg";
import Form from 'react-bootstrap/Form';
import './SocialSharing.scss';

const SocialSharing = (props) => {

    const navigate = useNavigate();
    const { history } = props;
    const [show, setShow] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const sendBtn = ["btn btn-secondary ml-2 mr-2", 1 === 1 ? "sendBrownButton" : "sendDisableBtn"]
    const selectGuest = ["d-flex align-items-center", showChat === true ? "groupSelectDiv" : "groupDiv"]

    const handleNavigate = () => {
        navigate(routes.ADD_NEW_GROUP);
    };
    const NavigateToMakeGrp = () => {
        navigate(routes.MAKE_ANNOUNCEMENT);
    };

    const showMakeGrpAnnonce = () => {
        setShow(true)
    };

    const hideMakeGrpAnnonce = () => {
        setShow(false)
    };

    const handleshowChat = () => {
        setShowChat(true)
    };

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='SocialSharingDiv container-fluid d-flex align-items-stretch'>
                    <div className="row">
                        <div class="col-3 chatListColumnDiv">
                            <div className="chatListHeaderDiv d-flex align-items-center justify-content-between pl-3">
                                <h4 className='mb-0'>Chat List</h4>
                                <button type="button" className="btn btn-danger brownButton mr-3" onClick={() => { handleNavigate() }}>
                                    <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />Group</button>
                            </div>

                            <div className="guestListColumn ">
                                <div className={selectGuest.join(' ')} onClick={() => { handleshowChat() }}>
                                    <img src={Profil} className="profilImage mr-3 ml-3" alt="Avatar" />
                                    <h5 className=''>Default Group Default Group</h5>
                                </div>
                                <div className='Seperator ml-3 mr-3'></div>
                                <div className='groupDiv d-flex align-items-center'>
                                    <div className='gropIcon ml-3'>
                                        <img src={group} className="" alt="Avatar" width="20px" height="14px" />
                                    </div>
                                    <h5 className='ml-3'>Default Group Default Group</h5>
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
                        <div class="col chatDashColumn " sx={{ borderRight: show == true ? "1px solid #CCCCCC" : "" }}>
                            <div className="grpNameHeaderDiv d-flex align-items-start flex-column">
                                {showChat == true ?
                                    <div className='chatDashSec d-flex justify-content-between align-items-center'>
                                        <h5 className='ml-3 mb-0'>Group_name02</h5>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div >
                                                {1 == 1 ?
                                                    <h6 className='mb-0 mr-3'>Allow to respond</h6>
                                                    : <h6 className='mb-0 mr-3'></h6>
                                                }
                                            </div>
                                            <div>
                                                <Form.Check
                                                    type="switch"
                                                    id="custom-switch"
                                                    className="text-right"
                                                    label=""
                                                />
                                            </div>
                                            <div className=" mr-sm-2 searchDiv class-search align-items-center">
                                                <input
                                                    className="form-control mr-sm-2 class-search"
                                                    type="search"
                                                    placeholder="Search guest name"
                                                    aria-label="Search"

                                                ></input>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className='chatDashSec d-flex justify-content-end align-items-center'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className=''>
                                                <button type="button" className="btn btn-danger brownButton mr-3" onClick={() => { NavigateToMakeGrp() }}>   <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />Make Announcement</button>
                                            </div>
                                            <div className="mr-sm-2 searchDiv class-search align-items-center">
                                                <input
                                                    className="form-control mr-sm-2 class-search"
                                                    type="search"
                                                    placeholder="Search guest name"
                                                    aria-label="Search"

                                                ></input>
                                            </div>
                                        </div>
                                    </div>}
                                {showChat == true ?
                                    <div className='chatScrollDiv'>
                                        <div className='adminChatTextDiv'>
                                            <div className='pb-1 d-flex' >

                                                <div className='mb-0 chatSenderIcon'>
                                                    <i className="fa fa-font mr-1 ml-1 aIcon"></i>
                                                </div>
                                                <p className='mb-0 chatSenderName ml-1'>(Admin)</p>
                                            </div>
                                            <div className='chatText p-2'>
                                                <p className='mb-0'>
                                                    Here you all receive broadcast message chatText Great. Thanks! Great. Thanks! Great. Thanks! Great. Thanks!Great. <br /> send by Wellness team. send by Wellness team. send by Wellness team. send by Wellness team.send by Wellness team.👍👍👍.
                                                </p>
                                            </div>
                                        </div>
                                        <div className='adminChatTextDiv'>
                                            <div className='pb-1 d-flex' >

                                                <div className='mb-0 chatSenderIcon'>
                                                    <i className="fa fa-font mr-1 ml-1 aIcon"></i>
                                                </div>
                                                <p className='mb-0 chatSenderName ml-1'>(Admin)</p>
                                            </div>
                                            <div className='chatText p-2'>
                                                <p className='mb-0'>
                                                    Here you all receive broadcast message chatText Great. Thanks! Great. Thanks! Great. Thanks! Great. Thanks!Great. <br /> send by Wellness team. send by Wellness team. send by Wellness team. send by Wellness team.send by Wellness team.👍👍👍.
                                                </p>
                                            </div>
                                        </div>
                                        <div className='userChatTextDiv float-right '>
                                            <div className='pb-1 d-flex userImgIconDiv'>
                                                <img src={Profil} className="chatProfilImage " alt="Avatar" width="28px" height="28px" />

                                            </div>
                                            <div className='chatText p-2'>
                                                <p className='mb-0'>
                                                    Great. Thanks!👍👍👍.
                                                </p>
                                            </div>
                                        </div>
                                        <div className='userChatTextDiv float-right '>
                                            <div className='pb-1 d-flex userImgIconDiv'>
                                                <img src={Profil} className="chatProfilImage " alt="Avatar" width="28px" height="28px" />

                                            </div>
                                            <div className='chatText p-2'>
                                                <p className='mb-0'>
                                                    Great. Thanks!👍👍👍.
                                                </p>
                                            </div>
                                        </div>

                                        {1 == 1 ?
                                            <div className='notAllowToResDiv float-right mb-4'>
                                                <div className='notAllowToRes p-2'>
                                                    <p className='mb-0'>
                                                        Allow to respond off
                                                    </p>
                                                </div>
                                            </div>
                                            : ""}

                                    </div>
                                    :
                                    <div className='chatScrollDiv'>
                                        <div className='d-flex justify-content-center'>
                                            <p className='descText'>Select guest or group to view chat.</p>
                                        </div>
                                    </div>
                                }
                                {showChat == true ? <div className='typeDiv mt-auto p-2'>

                                    <div className=''>
                                        {show == false ? <button type="button" className="btn btn-danger brownButton ml-2 mr-3" onClick={() => { showMakeGrpAnnonce() }}>
                                            <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />Make Announcement</button> : ""}
                                    </div>

                                    <div className=" mr-sm-2 textTypeSearch align-items-center">
                                        <input
                                            className="form-control mr-sm-2"
                                            type="search"
                                            placeholder="Text message..."
                                            aria-label="Search"

                                        ></input>
                                    </div>
                                    <div className=''>
                                        <button type="button" className={sendBtn.join(' ')}><i className="fa">&#xf1d8;</i></button>
                                    </div>
                                </div> : ""}
                            </div>
                        </div>
                        {show &&
                            < div className="col-3 makeAnnColumn p-0">
                                <div className=" makeAnnHeaderDiv d-flex align-items-center">
                                    <h5 className='mb-0 ml-3'>Make Group Announcement</h5>
                                </div>
                                <div className='d-flex align-items-start flex-column'>
                                    <div className="makeGrpTextDiv ">
                                        <div className='d-flex makeGrpSendToDiv'>
                                            <div className='sendTodiv'>
                                                Send to:
                                            </div>
                                            <div className='grpMembersName'>&nbsp;
                                                Alfred J. Henderson, Robert Jack,
                                                Alfred J. Henderson, Robert Jack,
                                                Alfred J. Henderson, Robert Jack,
                                                Alfred J. Henderson, Robert Jack,
                                                Alfred J. Henderson, Robert Jack,
                                                Alfred J. Henderson, Robert Jack,
                                                Alfred J. Henderson, Robert Jack,
                                                Alfred J. Henderson, Robert Jack,
                                            </div>
                                        </div>

                                        <div className='makeGrpFormDiv'>
                                            <div className='titleDiv mb-3'>
                                                <input
                                                    className="form-control mr-sm-2 class-search"
                                                    type="search"
                                                    placeholder="Enter Title"
                                                    aria-label="Search"

                                                ></input>
                                            </div>
                                            <div className='titleDiv'>
                                                <textarea className="form-control textArea"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    name='description'
                                                    placeholder="Enter description"

                                                >
                                                </textarea>
                                            </div>

                                            {1 == 1 ?
                                                <div className='titleDiv mt-3'>
                                                    <button type="button" className="btn btn-danger brownButton mr-3">
                                                        <img className="mr-2 mb-1 " src={addImage} alt="" width="14px" height="14px" />Add Attachment</button>
                                                </div> :
                                                <div className='mt-3'>
                                                    <div className='mb-2 attachmentTitel'>
                                                        Attachment
                                                    </div>
                                                    <div className='d-flex '>
                                                        <img className="thumbNailImg" src={RecipeImage} alt="" height="70px" />
                                                        <div className='ml-3 d-flex RemoveDiv align-items-center'>
                                                            <img className="mainIcon mr-1 " src={redCross} alt="" width="22px" height="22px" /> <p className='Remove mt-0 mb-0'>Remove</p>
                                                        </div>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>
                                    <div className='mt-auto d-flex justify-content-center buttonDiv'>

                                        <button type="button" className="btn btn-danger redButton mb-3" onClick={() => { hideMakeGrpAnnonce() }}>
                                            <img className="mainIcon mb-1" src={redCross} alt="" width="22px" height="22px" />
                                            CANCEL</button>

                                        <button type="submit" className="btn btn-success greenButton ">
                                            <img className="mainIcon mb-1" src={tick} alt="" width="16px" height="16px" />
                                            CREATE</button>

                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </AppContainer >
    )
}

export default SocialSharing
