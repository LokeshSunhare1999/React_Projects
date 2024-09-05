import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Select from "react-select";
import AppContainer from '../../../components/AppContainer/AppContainer';
import { createNotification } from '../../../Config/NotificationToast';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import {
    viewContentDetails
} from '../../../redux/actions/ContentManagementAction/VideoPodcasts/VideoPodcastsAction';
import { options } from '../../../utils/Helper'
import './ViewBlogsArticles.scss';
import ReactQuill from 'react-quill';

const ViewBlogsArticles = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [viewContentDetailsData, setViewContentDetailsData] = useState('');
    const [selectedStatus, setSelectedStatus] = useState();
    const viewContentDetailRes = useSelector(state => state?.viewContentDetails?.viewContent);

    const { id, status, permission } = location.state;
    const { history } = props;

    useEffect(() => {
        const sendRequest = {
            "content_id": id
        };
        dispatch(viewContentDetails(sendRequest));
    }, []);

    useEffect(() => {
        setSelectedStatus(status);
        setViewContentDetailsData(viewContentDetailRes && viewContentDetailRes?.data?.[0]);
    }, [viewContentDetailRes])

    const handleChangeOption = (e, id) => {
        if (permission === "write") {
            setSelectedStatus(e.value === "Active" ? 1 : 0);
            if (e.value === "Active") {
                setViewContentDetailsData(viewContentDetailsData.status = 1)
            } else {
                setViewContentDetailsData(viewContentDetailsData.status = 0)
            }
            setViewContentDetailsData(viewContentDetailsData)
            const sendRequest = {
                "feature_type": "content",
                "id": viewContentDetailsData.id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='ViewBlogArticles'>
                    {viewContentDetailRes && viewContentDetailsData && <div className="card">
                        <div className="card-header">
                            <div className='titleMainDiv'>
                                <h4 className='BlogArticleTitle'>{viewContentDetailsData.title}</h4>
                                <div className='publishedNameDate'>
                                    <p className='publisherName'>Published By: {viewContentDetailsData.publish_by}</p>
                                    <p className='publishedDate'>Published Date: {viewContentDetailsData.added_on}</p>
                                </div>
                            </div>
                            <div className=''>
                                <Select
                                    className={selectedStatus === 1 ? "react-select" : "react-selectChange"}
                                    classNamePrefix="react-select"
                                    onChange={(e) => { handleChangeOption(e, viewContentDetailsData.program_id) }}
                                    value={selectedStatus === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
                                    options={options}
                                    isSearchable={false}
                                    theme={(theme) => ({
                                        ...theme,
                                        isFocused: "#74613C",
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#F5F5F5',
                                            primary: '#f6f4f0',

                                        },
                                    })}
                                    getOptionLabel={(row) => (
                                        <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"}                                        >
                                            {row.label}
                                        </span>
                                            {row.status === 1 && (
                                                <div

                                                ></div>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="card-body">
                            <div className='DecDiv'>
                                {viewContentDetailsData.media?<div className="contentImgDiv">

                                    <img className="contentImg" src={viewContentDetailsData.media} alt="image" width="70px" height="70px" />

                                </div>:<div className='noVideoDiv'>
                                <p className='textNoVideo'>Image not uploaded</p>
                                </div>}

                                <div className='quilDiv'>
                                    <ReactQuill
                                        className='quillMainDiv'
                                        theme="snow"
                                        value={viewContentDetailsData?.description}
                                        placeholder='Enter Description'
                                    /></div>
                            </div>
                        </div>
                    </div >}
                </div>
            </div>
        </AppContainer >
    )
}

export default ViewBlogsArticles
