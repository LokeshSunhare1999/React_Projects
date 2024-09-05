import React from 'react'
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header'
import SideBar from '../SiderBar/SideBar'
import './AppContainer.scss'


const AppContainer = ({ children, history }) => {
    return (
        <>
            <div className="dashboard-main-wrapper admin-dashboard">
                <SideBar history={history} />
                <Header history={history} />
                {children}
                <ToastContainer />
            </div>
        </>
    )
}
AppContainer.propTypes = {
    children: PropTypes.object,
    history: PropTypes.object,
};

export default AppContainer
