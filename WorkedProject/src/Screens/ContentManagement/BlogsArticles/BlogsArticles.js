import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
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
import redCross from "../../../assets/images/CommonComponent/redCross.svg";
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import Select from "react-select";
import { FormGroup, } from "reactstrap";
import { createNotification } from '../../../Config/NotificationToast';
import { getContentsList } from '../../../redux/actions/ContentManagementAction/VideoPodcasts/VideoPodcastsAction';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { deleteMasterDataModule } from '../../../redux/actions/MasterDataAction/RecipeCollection/RecipeCollectionAction';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as routes from "../../../Router/RoutesURL";
import { stableSort, getComparator, rowOptions, options, } from '../../../utils/Helper'
import '../VideosPodcasts/VideoPodcasts.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))

const headCells = [
    {
        id: 'title',
        disablePadding: true,
        label: 'TITLE',
    },
    {
        id: 'content_type',
        disablePadding: false,
        label: 'CONTENT TYPE',
    },
    {
        id: 'upload_by',
        disablePadding: false,
        label: 'UPLOADED BY',
    },
    {
        id: 'content_version',
        disablePadding: false,
        label: 'FREE / PAID',
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
        disableSorting: true
    },
];

const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            hideSortIcon={headCell.id === 'action' || headCell.id === 'thumbnail' ? true : false}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
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
    const { activeTab } = props;
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState(1);
    const [filtersData, setFiltersData] = useState([]);
    const dispatch = useDispatch();
    const filterAllBtn = ["btn btn-secondary", filterType === 1 ? "selButton" : "UnselButton"]
    const filterBlogsBtn = ["btn btn-secondary", filterType === 2 ? "selButton" : "UnselButton"]
    const filterArticlesBtn = ["btn btn-secondary", filterType === 3 ? "selButton" : "UnselButton"]

    useEffect(() => {
        if (activeTab == "BlogsArticles") {

            const sendRequest = {
                "pageNo": 1,
                "pageSize": 10,
                "filter_type": filterType,
                "filter_text": searchText,
                "category": 2
            };
            dispatch(getContentsList(sendRequest));
        }
    }, []);

    useEffect(() => {
        let filtersValues = [];
        if (searchText !== "") {
            filtersValues.push({ key: "search", "value": searchText })
        }
        if (filterType !== "") {
            filtersValues.push({ key: "filterType", "value": filterType })
        }
        localStorage.setItem("contentBlogArticleFilters", JSON.stringify(filtersValues))
        setFiltersData((filtersValues));
        if (activeTab == "BlogsArticles") {
            const sendRequest = {
                "pageNo": 1,
                "pageSize": 10,
                "filter_type": filterType,
                "filter_text": searchText,
                "category": 2
            };
            dispatch(getContentsList(sendRequest));
        }
    }, [searchText, filterType, activeTab])

    const selectContentType = (val) => {
        setFilterType(val)
    }
    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }
    return (

        <>
            <Toolbar sx={{
                pl: { sm: 2 },
                pt: { sm: 2 },
                pb: { sm: 2 },
                pr: { xs: 1, sm: 1 },

            }}
            >
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-3'>
                    <MainHeading
                        sx={{ flex: '1 1 100%', }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Content List
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 VideoLevelDiv'>
                    <button type="button" className={filterAllBtn.join(' ')} onClick={() => { selectContentType(1) }}>All</button>
                    <button type="button" className={filterBlogsBtn.join(' ')} onClick={() => { selectContentType(2) }}>Blogs</button>
                    <button type="button" className={filterArticlesBtn.join(' ')} onClick={() => { selectContentType(3) }}>Articles</button>
                    <div className="separator"></div>
                    <div className="mr-sm-2 searchDiv class-search ">
                        <input
                            className="form-control mr-sm-2 class-search"
                            type="search"
                            placeholder=" Search Keyword"
                            aria-label="Search"
                            onChange={handleChangeSearch}
                        ></input>
                    </div>
                </div>
            </Toolbar>
            <Divider />
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const BlogsArticlesTable = (props) => {
    const { activeTab, permission } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedContentView, setSelectedContentView] = useState("");
    const [viewContentsMainData, setViewContentsMainData] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const viewContentsDat = useSelector(state => state?.getContentsList);
    const viewContentsDataRes = useSelector(state => state.getContentsList.contentList.data);
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]

    const dispatch = useDispatch();

    useEffect(() => {
        if (viewContentsDat.error !== "No data found") {
            setViewContentsMainData(viewContentsDataRes && viewContentsDataRes?.content_data);
            if (viewContentsDataRes?.current_page_no === 1) {
                setShowPrev(false)
            } else {
                setShowPrev(true)
            }

            if (viewContentsDataRes?.current_page_no === viewContentsDataRes?.total_pages) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        } else {
            setViewContentsMainData('');
        }

    }, [viewContentsDataRes, viewContentsDat])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = viewContentsMainData.map((n) => n.name);
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
        const filterData = JSON.parse(localStorage.getItem("contentBlogArticleFilters"));
        const sendRequest = {
            "pageNo": viewContentsDataRes?.current_page_no + 1,
            "pageSize": rowsPerPage,
            "filter_type": filterData.filterType === undefined ? 1 : filterData.filterType,
            "filter_text": filterData.search,
            "category": 2
        };
        dispatch(getContentsList(sendRequest));
    };
    const handleChangePagePrev = (newPage) => {
        setPage(newPage);
        const filterData = JSON.parse(localStorage.getItem("contentBlogArticleFilters"));
        const sendRequest = {
            "pageNo": viewContentsDataRes?.current_page_no - 1,
            "pageSize": rowsPerPage,
            "filter_type": filterData.filterType === undefined ? 1 : filterData.filterType,
            "filter_text": filterData.search,
            "category": 2
        };
        dispatch(getContentsList(sendRequest));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.value);
        setPage(page);

        const filterData = JSON.parse(localStorage.getItem("contentBlogArticleFilters"));
        const sendRequest = {
            "pageNo": 1,
            "pageSize": event.value,
            "filter_type": filterData.filterType === undefined ? 1 : filterData.filterType,
            "filter_text": filterData.search,
            "category": 2
        };
        dispatch(getContentsList(sendRequest));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - viewContentsMainData?.length) : 0;

    const handleChange = (contentId, type) => {
        if (permission === "write") {
            navigate(routes.ADD_BLOG_ARTICLE, { state: { contentId, selection: type } })
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    const handleViewContent = (id, data) => {
        navigate(routes.VIEW_BLOG_ARTICLE, { state: { id, path: "view", status: data.is_active, permission: permission } })
    };

    const cancelWarnModal = (e) => {
        setShowConfirm(false);
        setSelectedContentView("");
    };

    const handleDeleteContent = (id, data) => {
        if (permission === "write") {
            setShowConfirmDelete(true);
            setSelectedContentView(data);
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    const DeleteContent = () => {
        setShowConfirmDelete(false);
        const sendRequestDelete = {
            "feature_type": "content",
            "ids": selectedContentView.id
        };
        dispatch(deleteMasterDataModule(sendRequestDelete));
        setShowConfirm(false);
        setTimeout(() => {
            const sendRequest = {
                "pageNo": 1,
                "pageSize": 10,
                "filter_type": 1,
                "filter_text": "",
                "category": 2
            };
            dispatch(getContentsList(sendRequest));
        }, 1000);
    }

    const CancelDeleteModal = (e) => {
        setShowConfirmDelete(false);
        setSelectedContentView("");
    };

    const handleChangeOption = (e, id) => {
        if (permission === "write") {
            if (e.value === "Active") {
                viewContentsMainData.find(v => v.id === id).is_active = 1;
            } else {
                viewContentsMainData.find(v => v.id === id).is_active = 0;
            }
            setViewContentsMainData(viewContentsMainData)
            const sendRequest = {
                "feature_type": "content",
                "id": id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }


    return (
        <div>
            <Box sx={{ width: '100%' }} className="VideoBox">
                <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                        rowsPerPageNos={rowsPerPage} activeTab={activeTab} />
                    {viewContentsDataRes && viewContentsMainData && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
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
                                rowCount={viewContentsDataRes && viewContentsDataRes?.content_data.length}
                            />
                            <TableBody>
                                {
                                    stableSort(viewContentsDataRes && viewContentsMainData, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {

                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow hover onClick={(event) => handleClick(event, row.name)} role="checkbox"

                                                    tabIndex={-1}
                                                    key={row.id}

                                                >
                                                    <TableCell align="left" padding="none" >
                                                        <p className='titleText othText'>
                                                            {row.title}

                                                        </p>
                                                    </TableCell>
                                                    <TableCell align="left"><p className='othText'>{row.content_type}</p></TableCell>
                                                    <TableCell align="left">
                                                        <p className='othText'>
                                                            {row.upload_by}</p></TableCell>
                                                    <TableCell align="left"
                                                    ><p className='othText'>{row.content_version}</p>
                                                    </TableCell>
                                                    <TableCell align="left" width="10px" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>
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
                                                                <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"}
                                                                >
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
                                                    <TableCell align="left">
                                                        <ul className="list-group d-flex flex-row ">
                                                            <li
                                                                className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"}
                                                                onClick={row.is_active == 1 ? () => { handleViewContent(row.id, row) } : ""}><i className="fas fa-eye mr-1"></i> View</li>
                                                            <li className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"} onClick={row.is_active == 1 ? () => { handleChange(row.id, "edit") } : ""} ><i className="fa fa-pen mr-1"></i> Edit</li>
                                                            <li className="list-group-item Delete p-0" onClick={() => { handleDeleteContent(row.id, row) }}><i className="fa fa-trash mr-1"></i> Delete</li>
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
                    {viewContentsDataRes?.content_data && <p className='endText'>   {viewContentsDataRes?.start} - {viewContentsDataRes?.end} of {viewContentsDataRes?.total}</p>}
                    <p>
                        <button className={btnPrev.join(' ')} onClick={() => { handleChangePagePrev(page) }}>
                            <ArrowBackIosNewSharpIcon className='iconBtn' />
                        </button>
                        <button className={btnNext.join(' ')} onClick={() => { handleChangePageNext(page) }}>
                            <ArrowForwardIosSharpIcon className='iconBtn' />
                        </button></p>
                </div>
            </Box>

            <Modal centered className="viewContent-modal-warning br-8" show={showConfirm} onHide={() => { setShowConfirm(false) }}>
                <form className=""
                >
                    <Modal.Header>
                        <div className="modalText pb-4">{selectedContentView.title}</div>
                        <Select
                            className={selectedContentView.is_active === 1 ? "react-select" : "react-selectChange"}
                            classNamePrefix="react-select"
                            onChange={(e) => { handleChangeOption(e, selectedContentView.id) }}
                            value={selectedContentView.is_active === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
                            options={options}
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
                                <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"}
                                >
                                    {row.label}
                                </span>
                                    {row.is_active === 1 && (
                                        <div

                                        ></div>
                                    )}
                                </>
                            )}
                        />
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modalData">
                            <div className='imgDivContent'>
                                <video className="videoShow" width="600" height="240" controls>
                                    <source src="myvid.mp4" type="video/mp4" />
                                    <source src="myvid.ogg" type="video/ogg" />
                                </video>
                            </div>
                            <div className='dataContent'>
                                <div className='firstCol'>
                                    <div className='titleTextData'><p className='headeTitle'>Category:</p><p>{selectedContentView.content_category}</p></div>
                                    <div className='titleTextData'><p className='headeTitle'>Type:</p><p>On Demand</p></div>
                                </div>
                                <div className='secondCol'>
                                    <div className='titleTextData'><p className='headeTitle'>Duration:</p><p>{selectedContentView.duration}</p></div>
                                    <div className='titleTextData'><p className='headeTitle'>Free / Paid:</p>
                                        {selectedContentView.content_version !== "free" ?
                                            <div className='contentTypeText'>
                                                <p className='othText'>{selectedContentView.content_version}</p>
                                                <p className='rupeesText'>- ₹{selectedContentView.amount}</p></div> : <p className='othText'>{selectedContentView.content_version}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelWarnModal}>
                            <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                            CLOSE</button>
                    </Modal.Footer>
                </form>
            </Modal>
            <Modal centered className="TeamMember-modal-warning br-8" show={showConfirmDelete} onHide={() => { setShowConfirmDelete(false) }}>
                <Modal.Header>
                    <div className="modalText pb-4">Are you sure?</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <label htmlFor="exampleFormControlInput1" className="form-label DeleteDesc">You want to delete this record?</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-success greenButton mr-3" onClick={CancelDeleteModal}>
                        Cancel</button>
                    <button type="button" className="btn btn-danger redButton " onClick={DeleteContent}>
                        Delete</button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}
export default BlogsArticlesTable
