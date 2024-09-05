import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Profil from "../../assets/images/CommonComponent/Profil.png";
import User from "../../assets/images/header/user.svg"
import * as routes from "../../Router/RoutesURL";
import HelpCenter from "../../assets/images/header/HelpCenter.svg"
import LogOut from "../../assets/images/header/LogOut.svg"
import Notification from "../../assets/images/CommonComponent/Notibell.svg";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import downArrow from '../../assets/images/CommonComponent/downArrow.svg';
import { getPermissionByAppName } from '../../utils/Helper'
import { logout } from '../../redux/actions/AuthAction/logoutAction';

import './Header.scss';

const Header = () => {
    const dispatch = useDispatch();
    const pathUrl = window.location.pathname;
    const logoutData = useSelector(state => state.logout);
    const userData = JSON.parse(localStorage.getItem('UserData'));
    const programTitle = JSON.parse(localStorage.getItem('viewProgramTitle'));
    const [isOpen, SetIsOpen] = useState(false)
    const contentActiveTabData = localStorage.getItem('activeTabContent');

    const show = () => {
        SetIsOpen(true)
    }
    const hide = () => {
        SetIsOpen(false)
    }

    useEffect(() => {
        if (logoutData?.logout.statusCode === 200) {
            localStorage.clear();
            window.location.href = routes.LOG_IN;
        }
    }, [logoutData]);

    const handleLogOut = () => {
        dispatch(logout());
    }
    const navigate = useNavigate()

    const handleClick = (e) => {
        navigate("/profile")
    };
    const goBack = (e) => {
        navigate("/master-data")
    };
    const goBackUserManage = (e) => {
        navigate("/user-management")
    };

    const goToUserMangment = (e) => {
        navigate("/user-management")
    };
    const goBackContentManage = (e) => {
        navigate("/content-management")
    };
    const goToRecipeList = (e) => {
        navigate(-1)
    };

    const goBackTestimonial = (e) => {
        navigate(-1)
    };

    useEffect(() => {
        localStorage.getItem('add')
    }, [localStorage.getItem('add')]);

    return (
        <div className='HeaderDiv'>
            <nav className="navbar bg-body-tertiary HeaderNav">
                <div className="container-fluid MasterContainer">
                    <div className=''>
                        {pathUrl === '/master-data' ? <span className="navbar-brand h1">Master Data</span> : ''}

                        {pathUrl === '/master-data/viewassessment'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBack}>Assessment</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">View Section Details</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/master-data/viewactivity'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBack}>Activity</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">View Activity Details</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/master-data/viewinterestedguestlist'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackTestimonial}>View Activity</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                {programTitle && <span className="navbar-brand lastBread">{programTitle}</span>}
                            </>
                            :
                            ''}
                        {pathUrl === '/master-data/addactivity'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackTestimonial}>Activity</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Add Activity</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/master-data/editactivity'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackTestimonial}>Activity</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Edit Activity</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/content-management' ? <span className="navbar-brand h1">Content Management</span> : ''}
                        {pathUrl === '/master-data/viewprograms'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBack}>Programs</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">View Program</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/master-data/addrecipecollection' && getPermissionByAppName("Recipe Master") === "write" ? <span className="navbar-brand h1" onClick={goBack}>Master Data</span> : ''}
                        {pathUrl === '/master-data/addrecipe'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBack}>Recipe Collection</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Add Recipe</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/master-data/recipelist'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBack}>Recipe Collection</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Recipes List</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/master-data/editrecipe'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBack}>Recipe Collection</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Edit Recipe</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/master-data/viewRecipe'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBack}>Recipe Collection</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goToRecipeList}>Recipes List</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">View Recipes details</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/user-management/addmember'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">User Management</span>
                                <i class="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goToUserMangment}>Team Member</span>
                                <i class="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread"> {localStorage.getItem("add") == "add" ? "Add Member" : "Edit Member"}</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/user-management/viewmember'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">User Management</span>
                                <i class="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goToUserMangment}>Team Member</span>
                                <i class="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">View Member</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/user-management' ? <span className="navbar-brand h1">User Management</span> : ''}
                        {pathUrl === '/master-data/viewguestlist'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Master Data</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBack}>Programs</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                {programTitle && <span className="navbar-brand lastBread">{programTitle}</span>}
                            </>
                            :
                            ''}

                        {pathUrl === '/user-management/adduser'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">User Management</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackUserManage}>Guest User</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Add User</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/user-management/edituser'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">User Management</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackUserManage}>Guest User</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Edit User</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/user-management/viewuser'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">User Management</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackUserManage}>Guest User</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">View User</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/content-management/addblogarticle'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Content Management</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackContentManage}>

                                    {`${contentActiveTabData && contentActiveTabData === "VideoPodcasts" ? "Video & Podcast" : "Blogs & Articles"}`}
                                </span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Add / Update Content</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/content-management/addvideopodcast'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Content Management</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackContentManage}>

                                    {`${contentActiveTabData && contentActiveTabData === "VideoPodcasts" ? "Video & Podcast" : "Blogs & Articles"}`}
                                </span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">Add / Update Content</span>
                            </>
                            :
                            ''}

                        {pathUrl === '/event' ? <span className="navbar-brand h1">Events</span> : ''}

                        {pathUrl === '/content-management/viewblogarticle'
                            ?
                            <>
                                <span className="navbar-brand firstBread mr-1">Content Management</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand h1 mr-1" onClick={goBackContentManage}>

                                    {`${contentActiveTabData && contentActiveTabData === "VideoPodcasts" ? "Video & Podcast" : "Blogs & Articles"}`}
                                </span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">View Content</span>
                            </>
                            :
                            ''}
                        {pathUrl === '/testimonials' ? <span className="navbar-brand h1">Testimonials</span> : ''}
                        {pathUrl === '/testimonials/view'
                            ?
                            <>
                                <span className="navbar-brand h1 mr-1" onClick={goBackTestimonial}>Testimonials</span>
                                <i className="material-icons iconBread">keyboard_arrow_right</i>
                                <span className="navbar-brand lastBread">View</span>
                            </>
                            :
                            ''}

                        {pathUrl === '/socialsharing' || pathUrl === '/socialsharing/makeannouncement' || pathUrl === '/socialsharing/addnewgroup' ? <span className="navbar-brand h1">Social Sharing & Engagement</span> : ''}

                        {pathUrl === '/profile' ? <span className="navbar-brand h1">Admin Profile</span> : ''}
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex'>
                            <div className="MasterDiv d-flex">

                                <div className='Notification'>

                                    <img src={Notification} className="mr-2" alt="Avatar" width="22px" />
                                    <span className='Notification'>Notification</span>
                                </div>
                            </div>
                        </div>
                        <UncontrolledDropdown nav inNavbar className="DropDownDiv" isOpen={isOpen} onMouseOver={show} onMouseLeave={hide}>
                            <DropdownToggle nav className='fontletter'>
                                <img src={Profil} className="rounded-circle profilImage mr-2" alt="Avatar" />
                                {userData.first_name} {userData.last_name}
                                <img src={downArrow} className='arrowIcon' height="10" width="15" alt="CoolBrand" />
                            </DropdownToggle>
                            <DropdownMenu className='px-2' onMouseOver={show} onMouseLeave={hide}>
                                <DropdownItem className='DropdwonItem'>
                                    <div className='displayFlex' onClick={handleClick}>
                                        <img src={User} className="" alt="Avatar" height="18" width="14" />
                                        <span className='dropListText ml-3'>View Profile</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem className='DropdwonItem'>
                                    <div className='displayFlex'>
                                        <img src={HelpCenter} className="" alt="Avatar" height="18" width="14" />
                                        <span className='dropListText ml-3'>Help Center</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem className='DropdwonItem'>
                                    <div className='displayFlex' onClick={handleLogOut}>
                                        <img src={LogOut} className="" alt="Avatar" height="18" width="14" />
                                        <span className='dropListText ml-3'>Log out</span>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Header
