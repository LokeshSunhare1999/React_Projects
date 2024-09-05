import React from "react";
import './SideBar.scss';
import * as routes from "../../Router/RoutesURL";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import anandaLogoIcon from '../../assets/images/loginModule/anandaSpaLogo.svg'
import databaseOutline from '../../assets/images/SidebarModule/databaseOutline.svg'
import databaseOutlineBrown from '../../assets/images/SidebarModule/databaseOutlineBrown.svg'
import user from '../../assets/images/SidebarModule/user.svg'
import userBrown from '../../assets/images/SidebarModule/userBrown.svg'
import gallery from '../../assets/images/SidebarModule/gallery.svg'
import galleryBrown from '../../assets/images/SidebarModule/galleryBrown.svg'
import calendarEvent from '../../assets/images/SidebarModule/calendar-event.svg'
import calendarEventBrown from '../../assets/images/SidebarModule/calendar-eventBrown.svg'
import sharing from '../../assets/images/SidebarModule/sharing.svg'
import sharingBrown from '../../assets/images/SidebarModule/sharingBrown.svg'
import notes from '../../assets/images/SidebarModule/notes.svg'
import notesBrown from '../../assets/images/SidebarModule/notesBrown.svg'
import { getPermissionByAppName } from '../../utils/Helper'

const SideBar = ({ isOpen }) => {
    const pathUrl = window.location.pathname;

    return (
        < div className={classNames("sidebar", { "is-open": isOpen })} >
            <div className="SidebarHeader d-flex justify-content-center">
                <img className="mainIcon" src={anandaLogoIcon} alt="" width="200px" height="50px" />
            </div>
            <div className="separator"></div>
            <div className="sideMenu g-0">
                <Nav vertical className="list-unstyled pb-3">
                    {getPermissionByAppName("Master Data") !== "hide" && <NavItem className={pathUrl === '/master-data' || pathUrl === '/master-data/viewassessment' || pathUrl === '/master-data/viewprograms' || pathUrl === '/master-data/addrecipecollection' || pathUrl === '/master-data/recipelist' || pathUrl === '/master-data/viewRecipe' || pathUrl === '/master-data/addrecipe' || pathUrl === '/master-data/editrecipe' || pathUrl === '/master-data/viewguestlist' || pathUrl === '/master-data/viewactivity' || pathUrl === '/master-data/viewinterestedguestlist' || pathUrl === '/master-data/addactivity' || pathUrl === '/master-data/editactivity' ? 'active' : ''}>
                        <NavLink tag={Link} to={routes.MASTERDATA}>
                            {pathUrl === '/master-data' || pathUrl === '/master-data/viewassessment' || pathUrl === '/master-data/viewprograms' || pathUrl === '/master-data/addrecipecollection' || pathUrl === '/master-data/recipelist' || pathUrl === '/master-data/viewRecipe' || pathUrl === '/master-data/addrecipe' || pathUrl === '/master-data/editrecipe' || pathUrl === '/master-data/viewguestlist' || pathUrl === '/master-data/viewactivity' || pathUrl === '/master-data/viewinterestedguestlist' || pathUrl === '/master-data/addactivity' || pathUrl === '/master-data/editactivity' ? <img className="mainIcon mr-3" src={databaseOutlineBrown} alt="" /> : <img className="mainIcon mr-3" src={databaseOutline} alt="" />}
                            Master Data
                        </NavLink>
                    </NavItem>}
                    {getPermissionByAppName("User Management") !== "hide" && <NavItem className={pathUrl === '/user-management' || pathUrl === '/user-management/addmember' || pathUrl === '/user-management/viewmember' || pathUrl === '/user-management/viewuser' || pathUrl === '/user-management/edituser' ? 'active' : ''}>
                        <NavLink tag={Link} to={routes.USER_MANAGEMENT}>
                            {pathUrl === '/user-management' || pathUrl === '/user-management/addmember' || pathUrl === '/user-management/viewmember' || pathUrl === '/user-management/viewuser' || pathUrl === '/user-management/edituser' ? <img className="mainIcon mr-3" src={userBrown} alt="" /> : <img className="mainIcon mr-3" src={user} alt="" />}
                            User Management
                        </NavLink>
                    </NavItem>}

                    {getPermissionByAppName("Content Management") !== "hide" && <NavItem className={pathUrl === '/content-management' || pathUrl === '/content-management/addvideopodcast' || pathUrl === '/content-management/addblogarticle' || pathUrl === '/content-management/viewblogarticle' ? 'active' : ''}>
                        <NavLink tag={Link} to={routes.CONTENT_MANAGEMENT}>

                            {pathUrl === '/content-management' || pathUrl === '/content-management/addvideopodcast' || pathUrl === '/content-management/addblogarticle' || pathUrl === '/content-management/viewblogarticle' ? <img className="mainIcon mr-3" src={galleryBrown} alt="" /> : <img className="mainIcon mr-3" src={gallery} alt="" />}
                            Content Management
                        </NavLink>
                    </NavItem>}
                    <NavItem className={pathUrl === '/event' ? 'active' : ''} disabled>
                        <NavLink tag={Link} to={routes.MASTERDATA} disabled>
                            {pathUrl === '/event' ? <img className="mainIcon mr-3" src={calendarEventBrown} alt="" /> : <img className="mainIcon mr-3" src={calendarEvent} alt="" />}
                            Events
                        </NavLink>
                    </NavItem>
                    <NavItem className={pathUrl === '/testimonials' || pathUrl === '/testimonials/view' ? 'active' : ''}>
                        <NavLink tag={Link} to={routes.TESTIMONIALS}>
                            {pathUrl === '/testimonials' || pathUrl === '/testimonials/view' ? <img className="mainIcon mr-3" src={notesBrown} alt="" /> : <img className="mainIcon mr-3" src={notes} alt="" />
                            }                            Testimonials
                        </NavLink>
                    </NavItem>
                    {getPermissionByAppName("Social Sharing") !== "hide" && <NavItem className={pathUrl === '/socialsharing' || pathUrl === '/socialsharing/makeannouncement' || pathUrl === '/socialsharing/addnewgroup' ? 'active' : ''}>
                        <NavLink tag={Link} to={routes.SOCIAL_SHARING}>
                            {pathUrl === '/socialsharing' || pathUrl === '/socialsharing/makeannouncement' || pathUrl === '/socialsharing/addnewgroup' ? <img className="mainIcon mr-3" src={sharingBrown} alt="" /> : <img className="mainIcon mr-3" src={sharing} alt="" />
                            }
                            Social Sharing
                        </NavLink>
                    </NavItem>}
                </Nav>
            </div>
        </ div>
    )
};


export default SideBar;
