import React, { useEffect, useState } from 'react'
import * as routes from "../../Router/RoutesURL";
import { ToastContainer } from 'react-toastify';
import AppContainer from '../../components/AppContainer/AppContainer'
import { Tab, Tabs } from 'react-bootstrap';
import Programs from "./Programs/Programs"
import Assessment from "./Assessment/Assessment"
import RecipeCollection from "./RecipeCollection/RecipeCollection"
import Activity from "./Activity/Activity"
import { Button } from 'reactstrap';
import WhitePlus from "../../assets/images/CommonComponent/WhitePlus.svg"
import { useNavigate } from 'react-router-dom';
import { getPermissionByAppName } from '../../utils/Helper';
import './MasterDataDashboard.scss'

const MasterDataDashboard = (props) => {
    const { history } = props;
    const [activeTab, setActiveTab] = useState("");
    const navigate = useNavigate();
    const handleTabSelect = (index) => {
        localStorage.setItem('activeTabMasterData', index);
        setActiveTab(index);
    };

    const handleNavigate = () => {
        if (activeTab == "Recipe") {
            localStorage.setItem("add", "add");
            navigate(routes.ADD_RECIPE_COLLECTION, { state: { selection: "add" } })
        }
        else if (activeTab == "Activity") {
            localStorage.setItem("add", "add");
            navigate(routes.ADD_ACTIVITY, { state: { selection: "add" } })
        }
    };

    useEffect(() => {
        localStorage.setItem('activeTabUserManage', "GuestUser");
        const activeTabData = localStorage.getItem('activeTabMasterData');
        if (activeTabData) {
            setActiveTab(activeTabData);
        } else {
            setActiveTab("Programs");
        }
    }, [])
    return (
        <AppContainer history={history}>
            <div className="event-table">
                <div className='MasterTabsContainer'>
                    <div className='MasterButtonDiv'>
                        {activeTab == "Recipe" && getPermissionByAppName("Recipe Master") === "write" && <Button className="btn btn-primary mt-2 addUser" type="submit" onClick={handleNavigate}>
                            <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />New Collection
                        </Button>}
                        {activeTab == "Activity" && getPermissionByAppName("Activity Master") === "write" && <Button className="btn btn-primary mt-2 addUser" type="submit" onClick={handleNavigate}>
                            <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />New Activity
                        </Button>}
                    </div>
                    <Tabs id="controlled-tab-example" className="TabsDiv" activeKey={activeTab} onSelect={handleTabSelect}>
                        {getPermissionByAppName("Program Master") !== "hide" && <Tab eventKey="Programs" title="Programs" >
                            <Programs permission={getPermissionByAppName("Program Master")} />
                        </Tab>}
                        {getPermissionByAppName("Assessment Master(Section + Question)") !== "hide" && <Tab eventKey="Assessment" title="Assessment" >
                            <Assessment activeTab={activeTab} permission={getPermissionByAppName("Assessment Master (Section + Question)")} />
                        </Tab>}
                        {getPermissionByAppName("Activity Master") !== "hide" && <Tab eventKey="Activity" title="Activity">
                            <Activity activeTab={activeTab} permission={getPermissionByAppName("Activity Master")} />
                        </Tab>}
                        {getPermissionByAppName("Recipe Master") !== "hide" && <Tab eventKey="Recipe" title="Recipe Collection">
                            <RecipeCollection activeTab={activeTab} permission={getPermissionByAppName("Recipe Master")} />
                        </Tab>}
                    </Tabs>
                </div>
                <ToastContainer />
            </div >
        </AppContainer >
    )
}

export default MasterDataDashboard
