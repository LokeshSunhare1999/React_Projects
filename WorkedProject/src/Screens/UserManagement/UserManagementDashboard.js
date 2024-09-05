import React, { useEffect, useState } from 'react'
import * as routes from "../../Router/RoutesURL";
import { useNavigate } from 'react-router-dom';
import AppContainer from '../../components/AppContainer/AppContainer'
import { Tab, Tabs } from 'react-bootstrap';
import GuestUser from "./GuestUser/GuestUser"
import TeamMembers from "./TeamMembers/TeamMembers"
import AccessManagement from "./AccessManagement/AccessManagement"
import UserRole from "./UserRole/UserRole"
import { Button } from 'reactstrap';
import { getPermissionByAppName } from '../../utils/Helper'
import WhitePlus from "../../assets/images/CommonComponent/WhitePlus.svg"
import './UserManagementDashboard.scss'

const UserManagementDashboard=(props)=> {
    const { history } = props;
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        localStorage.setItem('activeTabMasterData', "Programs");
        const activeTabData = localStorage.getItem('activeTabUserManage');
        if (activeTabData) {
            setActiveTab(activeTabData);
        } else {
            setActiveTab("GuestUser");
        }
    }, [])

    const handleClick = (e) => {
        if (activeTab == "GuestUser") {
            navigate(routes.ADD_USER, { state: { activeTab } })
        }
        else if (activeTab == "TeamMembers") {
            localStorage.setItem("add", "add");
            navigate(routes.ADD_MEMBER, { state: { selection: "add" } })
        }
    };

    const handleTabSelect = (index) => {
        localStorage.setItem('activeTabUserManage', index);
        setActiveTab(index);
    };

    const handleSet = () => {
        setShowConfirm(true);
    };


    return (
        <AppContainer history={history}>
            <div className="event-table">
                <div className='UserMangTabsContainer'>
                    <div className='buttonDiv'>
                        {activeTab == "GuestUser" && getPermissionByAppName("Guest User Management") === "write" &&<Button className="btn btn-primary mt-2 addUser" type="submit" onClick={handleClick}>
                            <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />New User
                        </Button>}
                        {activeTab == "TeamMembers" && getPermissionByAppName("Team User Management") === "write" &&<Button className="btn btn-primary mt-2 addUser" type="submit" onClick={handleClick}>
                            <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />New Member
                        </Button>}
                        {activeTab == "UserRole" && getPermissionByAppName("Role User Management") === "write" &&<Button className="btn btn-primary mt-2 addUser" type="submit" onClick={handleSet} >
                            <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />New Role
                        </Button>}
                    </div>
                    <Tabs id="controlled-tab-example"
                        className="TabsDiv"
                        activeKey={activeTab} onSelect={handleTabSelect}
                    >
                        {getPermissionByAppName("Guest User Management") !== "hide" &&<Tab eventKey="GuestUser" title="Guest User" >
                            <GuestUser activeTab={activeTab} permission={getPermissionByAppName("Guest User Management")}/>
                        </Tab>}
                        {getPermissionByAppName("Team User Management") !== "hide" &&<Tab eventKey="TeamMembers" title="Team Members" >
                            <TeamMembers activeTab={activeTab} permission={getPermissionByAppName("Team User Management")}/>
                        </Tab>}
                        {getPermissionByAppName("Role User Management") !== "hide" &&<Tab eventKey="UserRole" title="User Role" >
                            <UserRole showConfirm={showConfirm} setShowConfirm={setShowConfirm} activeTab={activeTab} selection={"add"} permission={getPermissionByAppName("Role User Management")}/>
                        </Tab>}
                        {getPermissionByAppName("Access User Management") !== "hide" &&<Tab eventKey="AccessManagement" title="Access Management" >
                            <AccessManagement activeTab={activeTab} permission={getPermissionByAppName("Access User Management")}/>
                        </Tab>}
                    </Tabs>
                </div>
            </div>
        </AppContainer >
    )
}

export default UserManagementDashboard
