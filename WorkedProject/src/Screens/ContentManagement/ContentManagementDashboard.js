import React, { useEffect, useState } from 'react'
import * as routes from "../../Router/RoutesURL";
import { useNavigate } from 'react-router-dom';
import AppContainer from '../../components/AppContainer/AppContainer'
import { Tab, Tabs } from 'react-bootstrap';
import VideoPodcastsTable from './VideosPodcasts/VideoPodcasts';
import BlogsArticlesTable from './BlogsArticles/BlogsArticles';
import { Button } from 'reactstrap';
import { getPermissionByAppName } from '../../utils/Helper'
import WhitePlus from "../../assets/images/CommonComponent/WhitePlus.svg"
import './ContentManagementDashboard.scss'

const ContentManagementDashboard = (props) => {
    const { history } = props;
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const activeTabData = localStorage.getItem('activeTabContent');
        if (activeTabData) {
            setActiveTab(activeTabData);
        } else {
            setActiveTab("VideoPodcasts");
        }
    }, [])

    const handleClick = () => {
        if (activeTab == "VideoPodcasts") {
            navigate(routes.ADD_VIDEO_PODCASTS, { state: { activeTab, selection: "add" } })
        }
        else if (activeTab == "BlogsArticles") {
            navigate(routes.ADD_BLOG_ARTICLE, { state: { activeTab, selection: "add" } })
        }
    };

    const handleTabSelect = (index) => {
        localStorage.setItem('activeTabContent', index);
        setActiveTab(index);
    }
    return (
        <AppContainer history={history}>
            <div className="event-table">
                <div className='ContentTabsContainer'>
                    <div className='buttonDiv'>
                        {activeTab == "VideoPodcasts" && getPermissionByAppName("Content Management") === "write" && <Button className="btn btn-primary mt-2 addContent" type="submit" onClick={handleClick}>
                            <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />Video Or Podcast
                        </Button>}
                        {activeTab == "BlogsArticles" && getPermissionByAppName("Content Management") === "write" && <Button className="btn btn-primary mt-2 addContent" type="submit" onClick={handleClick}>
                            <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />Blog Or Article
                        </Button>}
                    </div>
                    <Tabs id="controlled-tab-example"
                        className="TabsDiv"
                        activeKey={activeTab}
                        onSelect={handleTabSelect}
                    >
                        {getPermissionByAppName("Content Management") !== "hide" && <Tab eventKey="VideoPodcasts" title="Videos & Podcasts">
                            <VideoPodcastsTable activeTab={activeTab} permission={getPermissionByAppName("Content Management")} />
                        </Tab>}
                        {getPermissionByAppName("Content Management") !== "hide" && <Tab eventKey="BlogsArticles" title="Blogs & Articles">
                            <BlogsArticlesTable activeTab={activeTab} permission={getPermissionByAppName("Content Management")} />
                        </Tab>}
                    </Tabs>
                </div>
            </div>
        </AppContainer >
    )
}

export default ContentManagementDashboard
