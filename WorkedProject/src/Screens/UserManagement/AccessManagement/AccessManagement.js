import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from '../../../Config/NotificationToast';
import { getAccessManagementList, UpdateAccess } from '../../../redux/actions/UserManagementAction/AccessManagement/AccessManagementAction';
import { getUserRoleList } from '../../../redux/actions/UserManagementAction/TeamMembersAction/TeamMembersAction';
import './AccessManagement.scss';

const AccessManagement = (props) => {
    const { activeTab, permission } = props;
    const dispatch = useDispatch();
    const [userListRole, setUserListRole] = useState(null);
    const [userRoleID, setUserRoleID] = useState();
    const [userRoleTitle, setUserRoleTitle] = useState("");
    const [accessMngData, setAccessMngData] = useState("");
    const [localPermissionArr, setlocalPermissionArr] = useState("");
    const getUserList = useSelector(state => state?.getUserRoleList?.getUserRoleList);
    const getUserListData = getUserList?.data?.user_role_list;
    const getAccessManagementListData = useSelector(state => state?.getAccessManagementList?.getAccessManagementList?.data);
    useEffect(() => {
        if (getAccessManagementListData) {
            setlocalPermissionArr(getAccessManagementListData.filter(item => item.permission.some(p => p.is_selected === 1)).map(item => item.permission.find(p => p.is_selected === 1)))
            setAccessMngData(getAccessManagementListData)
        }
    }, [getAccessManagementListData])

    useEffect(() => {
        if (accessMngData) {
            setlocalPermissionArr(accessMngData.filter(item => item.permission.some(p => p.is_selected === 1)).map(item => item.permission.find(p => p.is_selected === 1)))
        }
    }, [accessMngData])

    useEffect(() => {
        if (activeTab == "AccessManagement") {
            const sendRequest = {
                "pageNo": 1,
                "pageSize": "",
            }
            dispatch(getUserRoleList(sendRequest));
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab == "AccessManagement" && userRoleID != undefined) {
            const sendRequest = {
                "role_id": userRoleID,
            }
            dispatch(getAccessManagementList(sendRequest));
        }
    }, [activeTab, userRoleID])

    useEffect(() => {
        if (getUserListData) {
            const data = getUserListData?.map((item) => ({
                ...item,
                value: item.role_title,
            }));
            setUserListRole(data);
        } else {
            setUserListRole([]);
        }
    }, [getUserListData, userRoleID]);


    const handleChangeRole = (e) => {
        setUserRoleID(e.id)
        setUserRoleTitle(e)
    }

    const handleChangePermission = (e, val) => {
        if (permission === "write") {
            const accessManagementData = accessMngData && accessMngData.map((value, index) => {
                let accessManagementValue = { ...value };
                if (index === e.key) {
                    const arrData = value.permission.map(val => {
                        if (val.view_text === e.value) {
                            return { ...val, is_selected: 1 }
                        } else {
                            return { ...val, is_selected: 0 }
                        }
                    })
                    accessManagementValue = { ...accessManagementValue, permission: arrData }
                } else {
                    accessManagementValue = { ...accessManagementValue }
                }
                return accessManagementValue
            })
            setAccessMngData(accessManagementData);

            const sendRequest = {
                "id": JSON.stringify(val),
                "permission": e.value === "Full Access" ? "full_access" : e.value === "View Only" ? "view" : e.value === "Write Only" ? "write" : e.value === "Hide" ? "hide" : "",
            }
            dispatch(UpdateAccess(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    return (
        <div className='AccessManagement'>
            <div className="card">
                <div className="card-header">
                    <h4>Access Management</h4>
                    <div className='d-flex align-items-center'>
                        <div className=''>
                            <h5 className='UserRole mt-1'>User Role:</h5>
                        </div>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            value={userRoleTitle}
                            required={true}
                            options={userListRole}
                            onChange={handleChangeRole}
                            getOptionLabel={(e) => (
                                <span>{e.role_title}</span>
                            )}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#F5F5F5',
                                    primary: '#74613C',
                                },
                            })}
                        />
                    </div>
                </div>
                <div className="separator"></div>
                <div className="card-body p-4 ml-1">
                    {userRoleID != undefined ? <div className='row cardDiv'>
                        {accessMngData && accessMngData.map((item, i) => {
                            return (
                                <div key={i}>
                                    <div className='row cardDiv'>
                                        <div className='col col-sm-2 col-md-2 col-lg-6 col-xl-5 col-xxl-4 gx-2'>
                                            <h6>{item.app_name}</h6>
                                        </div>
                                        <div className='col col-sm-2 col-md-2 col-lg-5 col-xl-6 col-xxl-6 g-0'>
                                            <div className="form-floating">
                                                <Select
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    value={{ label: localPermissionArr[i]?.view_text, value: localPermissionArr[i]?.view_text, key: i }}
                                                    required={true}
                                                    onChange={(e) => { handleChangePermission(e, item.id) }}
                                                    options={item?.permission?.map((guest) => {
                                                        return {
                                                            label: guest.view_text,
                                                            value: guest.view_text,
                                                            key: i
                                                        };
                                                    })}
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: '#F5F5F5',
                                                            primary: '#74613C',
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                        :
                        <div className='text-center'>
                            <p className='Desc'>
                                Select user role to configure <br />access permissions.
                            </p>
                        </div>
                    }
                </div>
            </div >
        </div>
    )
}

export default AccessManagement
