import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import Select from "react-select";
import { FormGroup } from "reactstrap";
import { createNotification } from '../../../Config/NotificationToast';
import * as routes from "../../../Router/RoutesURL";
import { useSelector, useDispatch } from 'react-redux';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { deleteMasterDataModule, getRecipeList } from '../../../redux/actions/MasterDataAction/RecipeCollection/RecipeCollectionAction';
import Delete from "../../../assets/images/CommonComponent/trash.svg";
import Modal from 'react-bootstrap/Modal';
import {
    stableSort,
    getComparator,
    rowOptions,
    options,
} from '../../../utils/Helper'
import AppContainer from '../../../components/AppContainer/AppContainer';
import WhitePlus from "../../../assets/images/CommonComponent/WhitePlus.svg"
import './RecipeList.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))


const headCells = [
    {
        id: 'recipe_title',
        disablePadding: true,
        label: 'RECIPE',
    },
    {
        id: 'dosha',
        disablePadding: false,
        label: 'DOSHA',
    },
    {
        id: 'minutes',
        disablePadding: false,
        label: 'MINUTES',
    },
    {
        id: 'calories',
        disablePadding: false,
        label: 'CALORIES',
    },
    {
        id: 'is_active',
        disablePadding: false,
        label: 'STATUS',
    },
    {
        id: 'action',
        disablePadding: false,
        label: 'ACTION',
    },
];

const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort, recipeCollectionName } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) =>
                (<TableCell
                    key={headCell.id}
                    align='left'
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>)
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { pageNos, rowsPerPageNos, recipeCollectionId, recipeData, recipeCollectionName, AciveStatus, aboutDesc, backCollectionName, collectionID, permission } = props;
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState(AciveStatus);
    const [recipeCollectionMainData, setRecipeCollectionMainData] = useState('');
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate()
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];
    const recipeCollectionListStatus = useSelector(state => state?.getRecipeCollectionList?.getRecipeCollectionList?.data?.recipe_list);

    useEffect(() => {
        const sendRequest = {
            "pageNo": pageNos,
            "pageSize": 10,
            "filter_text": "",
            "collection_id": recipeCollectionId == undefined ? collectionID : recipeCollectionId
        };
        dispatch(getRecipeList(sendRequest));
    }, [recipeCollectionListStatus]);

    const handleSearchRecipe = (event) => {
        setSearchText(event.target.value)
        if (event.target.value.length > 0) {
            let value = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "filter_text": event.target.value,
                "collection_id": recipeCollectionId == undefined ? collectionID : recipeCollectionId
            };
            dispatch(getRecipeList(value));
        }
        else if (event.target.value.length == 0) {
            let value = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "filter_text": "",
                "collection_id": recipeCollectionId == undefined ? collectionID : recipeCollectionId
            };
            dispatch(getRecipeList(value));
        }
    };



    useEffect(() => {
        if (recipeCollectionListStatus) {
            recipeCollectionListStatus.map((value, index) => {
                if (value.id === recipeCollectionId || collectionID) {
                    setSelectedStatus(recipeCollectionListStatus[index].is_active);
                }
            })
            setRecipeCollectionMainData(recipeCollectionListStatus && recipeCollectionListStatus);
        }
    }, [recipeCollectionListStatus])

    const handleChangeOption = (e) => {
        if (permission === "write") {
            setSelectedStatus(e.value === "Active" ? 1 : 0);
            const sendRequest = {
                "feature_type": "recipe_collection",
                "id": recipeCollectionId == undefined ? collectionID : recipeCollectionId,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    const handleNavigate = () => {
        if (permission === "write") {
            navigate(routes.ADD_RECIPE, { state: { recipeCollectionId, recipeCollectionName, selectionType: "add" } })
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    return (
        <>
            <Toolbar sx={{
                display: 'grid',
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },

            }}
            >
                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex AboutDiv' >
                    <div className='About col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3'>
                        <MainHeading
                            sx={{ flex: '1 1 100%', }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                            textTransform="capitalize"
                        >
                            {recipeCollectionName || backCollectionName}
                        </MainHeading>
                    </div>
                    <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 RecipeDiv'>
                        <Select
                            className={recipeCollectionMainData.is_active === 1 || selectedStatus === 1 ? "react-select" : "react-selectChange"}
                            classNamePrefix="react-select"
                            onChange={(e) => { handleChangeOption(e) }}
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
                                <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"} >
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

                <Divider sx={{ mr: { sm: 1 } }} />

                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex AboutDiv' >
                    <div className='About col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 AboutTitle'>
                        ABOUT COLLECTION:
                    </div>
                    <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 AboutDesc' >
                        {aboutDesc}
                    </div>
                </div>

                <Divider sx={{ mr: { sm: 1 } }} />

                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex AboutDiv' >
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-3'>
                        <MainHeading
                            sx={{ flex: '1 1 100%', }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Recipe List
                        </MainHeading>
                    </div>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 LevelDiv'>
                        <button type="button" className="btn btn-secondary selButton" onClick={handleNavigate}> <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />New Recipe</button>
                        <div className="separator"></div>

                        <div className="mr-sm-2 searchDiv class-search ">
                            <input
                                className="form-control mr-sm-2 class-search"
                                type="search"
                                placeholder=" Search Keyword"
                                aria-label="Search"
                                onChange={(event) => { handleSearchRecipe(event); setSearchText(event.target.value); }}
                            ></input>
                        </div>
                    </div>
                </div>
            </Toolbar >
            <Divider />
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const RecipeTable = (props) => {
    const { history } = props;
    const { activeTab } = props;
    const location = useLocation();
    const {permission} = location.state;
    const recipeCollectionId = location?.state?.recipeCollectionId
    const collectionID = location?.state?.collectionID
    const recipeCollectionName = location?.state?.collectionName
    const backCollectionName = location?.state?.recipeCollectionName
    const AciveStatus = location?.state?.status

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [recipeId, setRecipeId] = useState();
    const [recipeMainData, setRecipeMainData] = useState('');
    const [aboutDesc, setAboutDesc] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const navigate = useNavigate()
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]
    const dispatch = useDispatch();
    const getRecipeListData = useSelector(state => state?.getRecipeList?.getRecipeList);
    const recipeData = useSelector(state => state?.getRecipeList);

    useEffect(() => {
        if (recipeData.error !== "No data found" && recipeData.error !== 400) {
            setAboutDesc(getRecipeListData?.data?.about_collection?.description)
            setRecipeMainData(getRecipeListData && getRecipeListData?.data?.recipe_list_data?.recipe_list);
            if (getRecipeListData?.data?.recipe_list_data?.current_page_no === 1) {
                setShowPrev(false)
            } else {
                setShowPrev(true)
            }

            if (getRecipeListData?.data?.recipe_list_data?.current_page_no === getRecipeListData?.data?.recipe_list_data?.total_pages) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        } else {
            setAboutDesc('')
            setRecipeMainData('');
        }

    }, [getRecipeListData, recipeData])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = getRecipeListData && recipeMainData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePageNext = (newPage) => {
        setPage(newPage);
        const sendRequest = {
            "pageNo": getRecipeListData?.data?.recipe_list_data?.current_page_no + 1,
            "pageSize": rowsPerPage,
            "filter_text": "",
            "collection_id": recipeCollectionId
        };
        dispatch(getRecipeList(sendRequest));
    };

    const handleChangePagePrev = (newPage) => {
        setPage(newPage);

        const sendRequest = {
            "pageNo": getRecipeListData?.data?.recipe_list_data?.current_page_no - 1,
            "pageSize": rowsPerPage,
            "filter_text": "",
            "collection_id": recipeCollectionId
        };
        dispatch(getRecipeList(sendRequest));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.value);
        setPage(page);
        const sendRequest = {
            "pageNo": 1,
            "pageSize": event.value,
            "filter_text": "",
            "collection_id": recipeCollectionId
        };
        dispatch(getRecipeList(sendRequest));
    };



    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getRecipeListData && recipeMainData?.length) : 0;



    const handleChangeOption = (e, id) => {
        if (permission === "write") {
            if (e.value === "Active") {
                recipeMainData.find(v => v.id === id).is_active = 1;
            } else {
                recipeMainData.find(v => v.id === id).is_active = 0;
            }
            setRecipeMainData(recipeMainData)
            const sendRequest = {
                "feature_type": "recipe",
                "id": id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    const handleChangeViewRecipe = (recipeId) => {
        navigate(routes.VIEW_RECIPE, { state: { recipeId, recipeCollectionName, permission } })
    };

    const handleNavigate = (recipeId, recipeCollectionTitle) => {
        if (permission === "write") {
            navigate(routes.EDIT_RECIPE, { state: { recipeId, recipeCollectionTitle, recipeCollectionName } })
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    const handleDeleteRecipe = (id) => {
        if (permission === "write") {
            setRecipeId(id)
            setShowDeleteModal(true);
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    const closeDeleteModal = () => {
        const sendRequest = {
            "feature_type": "recipe",
            "ids": recipeId
        };
        dispatch(deleteMasterDataModule(sendRequest));
        setShowDeleteModal(false);
        setTimeout(() => {
            const sendRequest = {
                "pageNo": getRecipeListData?.data?.recipe_list_data?.current_page_no,
                "pageSize": 10,
                "filter_text": "",
                "collection_id": recipeCollectionId
            };
            dispatch(getRecipeList(sendRequest));
        }, 1000);
    }

    const cancelWarnModal = () => {
        setShowDeleteModal(false);
    }

    return (
        <>
            <AppContainer history={history}>
                <div className="event-content">
                    <div className="ProBox">
                        <Box sx={{ width: '100%' }} className="RecipeListBox">
                            <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                                <EnhancedTableToolbar
                                    numSelected={selected.length}
                                    pageNos={page}
                                    rowsPerPageNos={rowsPerPage}
                                    activeTab={activeTab}
                                    recipeCollectionId={recipeCollectionId}
                                    recipeData={recipeData}
                                    recipeCollectionName={recipeCollectionName}
                                    AciveStatus={AciveStatus}
                                    aboutDesc={aboutDesc}
                                    backCollectionName={backCollectionName}
                                    collectionID={collectionID}
                                    permission={permission}
                                />
                                {recipeMainData && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
                                    <Table
                                        sx={{ minWidth: 750 }}
                                        aria-labelledby="tableTitle"
                                        size='small'
                                    >
                                        <EnhancedTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={getRecipeListData && recipeMainData?.length}
                                        />
                                        <TableBody>
                                            {
                                                stableSort(recipeMainData, getComparator(order, orderBy))
                                                    .slice((rowsPerPage * (page - 1)), (rowsPerPage * (page) + rowsPerPage))
                                                    .map((row, index) => {

                                                        const labelId = `enhanced-table-checkbox-${index}`;
                                                        return (
                                                            <TableRow hover onClick={(event) => handleClick(event, row.title)} role="checkbox"

                                                                tabIndex={-1}
                                                                key={row.title}

                                                            >
                                                                <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.recipe_title}</TableCell>
                                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.dosha}</TableCell>
                                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.minutes}</TableCell>
                                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.calories}</TableCell>
                                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>
                                                                    <Select
                                                                        className="react-select"
                                                                        classNamePrefix="react-select"
                                                                        onChange={(e) => { handleChangeOption(e, row.id) }}
                                                                        value={row.is_active === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
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
                                                                            <><span
                                                                                className={row.label === "Active" ? "ActiveClass" : "InactiveClass"} >
                                                                                {row.label}
                                                                            </span>
                                                                                {row.is_active === 1 && (
                                                                                    <div

                                                                                    ></div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="left" className='View' >
                                                                    <ul className="list-group d-flex flex-row ">
                                                                        <li className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"}
                                                                            onClick={row.is_active == 1 ? () => { handleChangeViewRecipe(row.id, row.is_active) } : ""}><i className="fas fa-eye mr-1"></i> View</li>
                                                                        <li
                                                                            className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"} onClick={row.is_active == 1 ? () => { handleNavigate(row.id, row.recipe_title) } : ""}><i className="fa fa-pen mr-1"></i> Edit</li>
                                                                        <li className="list-group-item Delete p-0" onClick={() => { handleDeleteRecipe(row.id) }}><img src={Delete} className="mr-1 mb-1" alt="Avatar" width="14px" height="16px" /> Delete</li>
                                                                    </ul>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                            {emptyRows > 0 && (
                                                <TableRow

                                                >
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>}
                            </Paper>
                            <div className='paginationBlock'>
                                <div className='textData'><p>Items per page: </p></div>
                                <FormGroup className="FormGroup has-float-label rowsSelect class-menu-dropdown ">
                                    <Select
                                        placeholder={rowsPerPage}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        value={rowsPerPage}
                                        options={rowOptions}
                                        menuPlacement="top"
                                        menuPosition="fixed"
                                        isSearchable={false}
                                        onChange={handleChangeRowsPerPage}
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary25: '#F5F5F5',
                                                primary: '#74613C',
                                            },
                                        })}
                                    />
                                </FormGroup>
                                {getRecipeListData?.data && <p className='endText'>   {getRecipeListData?.data?.recipe_list_data?.start} - {getRecipeListData?.data?.recipe_list_data?.end} of {getRecipeListData?.data?.recipe_list_data?.total}</p>}
                                <p>
                                    <button className={btnPrev.join(' ')} onClick={() => { handleChangePagePrev(page) }}>
                                        <ArrowBackIosNewSharpIcon className='iconBtn' />
                                    </button>
                                    <button className={btnNext.join(' ')} onClick={() => { handleChangePageNext(page) }}>
                                        <ArrowForwardIosSharpIcon className='iconBtn' />
                                    </button></p>
                            </div>
                        </Box>
                    </div>
                    <Modal centered className="TeamMember-modal-warning br-8" show={showDeleteModal} onHide={() => { setShowDeleteModal(false) }}>
                        <Modal.Header>
                            <div className="modalText pb-4">Are you sure?</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="">
                                <label htmlFor="exampleFormControlInput1" className="form-label DeleteDesc">You want to delete this record?</label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-success greenButton mr-3" onClick={cancelWarnModal}>
                                Cancel</button>
                            <button type="button" className="btn btn-danger redButton " onClick={closeDeleteModal}>
                                Delete</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </AppContainer >
        </>
    );
}
export default RecipeTable;