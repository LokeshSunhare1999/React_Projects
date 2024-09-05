import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
import Paper from '@mui/material/Paper';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { visuallyHidden } from '@mui/utils';
import Divider from '@mui/material/Divider';
import { createNotification } from '../../../Config/NotificationToast';
import styled from '@emotion/styled';
import Select from "react-select";
import { FormGroup, Label, } from "reactstrap";
import { viewGuestUsers, } from '../../../redux/actions/UserManagementAction/GuestUserAction/GuestUserAction';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import * as routes from "../../../Router/RoutesURL";
import {
    stableSort,
    getComparator,
    rowOptions,
    options,
} from '../../../utils/Helper'
import { useSelector, useDispatch } from 'react-redux';
import './GuestUser.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))


const headCells = [
    {
        id: 'first_name',
        disablePadding: true,
        label: 'FIRST NAME',
    },
    {
        id: 'last_name',
        disablePadding: false,
        label: 'LAST NAME',
    },
    {
        id: 'phone_number',
        disablePadding: false,
        label: 'MOBILE NO.',
    },
    {
        id: 'email_id',
        disablePadding: false,
        label: 'EMAIL ADDRESS',
    },
    {
        id: 'title',
        disablePadding: false,
        label: 'PROGRAM',
    },
    {
        id: 'check_in',
        disablePadding: false,
        label: 'START',
    },
    {
        id: 'check_out',
        disablePadding: false,
        label: 'END',
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

const EnhancedTableHead=(props)=> {
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
                            hideSortIcon={headCell.id === 'action' ? true : false}
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

const EnhancedTableToolbar=(props)=> {
    const { numSelected, pageNos, rowsPerPageNos } = props;
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [filtersData, setFiltersData] = useState([]);
    const [maxDuration, setMaxDuration] = useState('');
    const [minDuration, setMinDuration] = useState('');
    const [programListing, setProgramListing] = useState([]);
    const [levelData, setLevelData] = useState('');

    const [programID, setProgramID] = useState();
    const [selectedProgramTitle, setSelectedProgramTitle] = useState('');

    const programListingData = useSelector(state => state.viewGuestUsers?.viewGuestsList?.data?.program_data);
    const options = [
        { value: 'Comprehensive', label: 'Comprehensive' },
        { value: 'Foundation & Comprehensive', label: 'Foundation & Comprehensive' },
    ];

    useEffect(() => {
        const sendRequest = {
            "page_no": pageNos,
            "page_size": 10,
            'filter_text': "",
            "start_date": "",
            "end_date": "",
            "program": "",
        };
        dispatch(viewGuestUsers(sendRequest));
    }, []);

    useEffect(() => {
        if (programListingData) {
            const data = programListingData.map((item) => ({
                ...item,
                value: item.title,
            }));
            setProgramListing(data);
        } else {
            setProgramListing([]);
        }
    }, [programListingData]);

    useEffect(() => {
        const sendRequest = {
            "page_no": pageNos,
            "page_size": rowsPerPageNos,
            'filter_text': searchText,
            "start_date": minDuration,
            "end_date": maxDuration,
            "program": programID,
        };
        dispatch(viewGuestUsers(sendRequest));
    }, [searchText, minDuration, maxDuration, programID]);

    useEffect(() => {
        let filtersValues = { "filter_text": searchText, "start_date": minDuration, "end_date": maxDuration, "program": programID, };

        localStorage.setItem("filtersDataGuest", JSON.stringify(filtersValues))
        setFiltersData((filtersValues));
    }, [searchText, minDuration, maxDuration, levelData, selectedProgramTitle, programID])



    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }
    const changeMinDuration = (e) => {
        setMinDuration(e.target.value)
    }
    const changeMaxDuration = (e) => {
        setMaxDuration(e.target.value)
    }
    const handleChangeLevel = (e) => {
        setProgramID(e.key)
        setSelectedProgramTitle(e)
    }
    return (

        <>
            <Toolbar sx={{
                pl: { sm: 2 },
                pt: { sm: 2 },
                pb: { sm: 2 },
                pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
            >
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-3'>
                    <MainHeading
                        sx={{ flex: '1 1 100%', }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Guest List
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 p-0 GuestUserLevelDiv'>
                    <FormGroup className="FormGroup has-float-label class-menu-dropdown ">
                        <Label>Program:</Label>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            value={selectedProgramTitle}
                            options={programListing?.map((guest) => {
                                return {

                                    label: guest.title,
                                    value: guest.title,
                                    key: guest.id
                                };
                            })}
                            onChange={handleChangeLevel}
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
                    <div className='DurationDiv'>
                        <Label>Date:</Label>
                        <input type="text" className="min" placeholder="DD/MM/YYYY" onChange={(e) => { changeMinDuration(e) }} />
                        <span className='Dash'>-</span>
                        <input type="text" className="min" placeholder="DD/MM/YYYY" onChange={(e) => { changeMaxDuration(e) }} />
                    </div>
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

const GuestUserTable = (props) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [viewGuestListMainData, setViewGuestListMainData] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const navigate = useNavigate()
    const viewGuestListDat = useSelector(state => state.viewGuestUsers);
    const viewGuestListDataRes = useSelector(state => state.viewGuestUsers.viewGuestsList);
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]
    const dispatch = useDispatch();
    const { permission } = props;
    useEffect(() => {
        if (viewGuestListDat.error !== "No data available to show for guests users") {
            setViewGuestListMainData(viewGuestListDataRes && viewGuestListDataRes?.data?.guest_users);
            if (viewGuestListDataRes?.data?.current_page_no === 1) {
                setShowPrev(false)
            } else {
                setShowPrev(true)
            }

            if (viewGuestListDataRes?.data?.current_page_no === viewGuestListDataRes?.data?.total_pages) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        } else {
            setViewGuestListMainData("");
        }
    }, [viewGuestListDataRes, viewGuestListDat])

    useEffect(() => {
        if (viewGuestListDat.loading === true) {
            setViewGuestListMainData("");
        }
    }, [viewGuestListDat])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = viewGuestListDataRes && viewGuestListDataRes.map((n) => n.name);
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
        const filterdata = JSON.parse(localStorage.getItem("filtersDataGuest"));
        const sendRequest = {
            "page_no": viewGuestListDataRes?.data?.current_page_no + 1,
            "page_size": rowsPerPage,

            'filter_text': filterdata.filter_text,
            "start_date": filterdata.start_date,
            "end_date": filterdata.end_date,
            "program": filterdata.program,
        };
        dispatch(viewGuestUsers(sendRequest));
    };
    const handleChangePagePrev = (newPage) => {
        setPage(newPage);
        const filterdata = JSON.parse(localStorage.getItem("filtersDataGuest"));
        const sendRequest = {
            "page_no": viewGuestListDataRes?.data?.current_page_no - 1,
            "page_size": rowsPerPage,

            'filter_text': filterdata.filter_text,
            "start_date": filterdata.start_date,
            "end_date": filterdata.end_date,
            "program": filterdata.program,
        };

        dispatch(viewGuestUsers(sendRequest));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.value);
        setPage(page);
        const filterdata = JSON.parse(localStorage.getItem("filtersDataGuest"));
        const sendRequest = {
            "page_no": 1,
            "page_size": event.value,

            'filter_text': filterdata.filter_text,
            "start_date": filterdata.start_date,
            "end_date": filterdata.end_date,
            "program": filterdata.program,
        };
        dispatch(viewGuestUsers(sendRequest));
    };


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - viewGuestListDataRes && viewGuestListDataRes?.length) : 0;


    const handleChangeViewPro = (selectedUserId, userStatus) => {
        if (userStatus === 1) {
            navigate(routes.VIEW_USER, { state: { selectedUserId, userStatus, permission } })
        }
    };


    const handleChangeOption = (e, id) => {
        if (permission === "write") {
            if (e.value === "Active") {
                viewGuestListMainData.find(v => v.id === id).is_active = 1;
            } else {
                viewGuestListMainData.find(v => v.id === id).is_active = 0;
            }
            setViewGuestListMainData(viewGuestListMainData)
            const sendRequest = {
                "feature_type": "guest",
                "id": id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    const handleChangeEditUser = (selectedUserId, userStatus) => {
        if (permission === "write") {
            if (userStatus === 1) {
                navigate(routes.EDIT_USER, { state: { selectedUserId } });
            }
        } else {
            createNotification('warning', "Access Restricted");
        }
    };



    return (
        <Box sx={{ width: '100%' }} className="GuestUserBox">
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                    rowsPerPageNos={rowsPerPage} />
                {viewGuestListMainData?.length > 0 && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
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
                            rowCount={viewGuestListDataRes && viewGuestListDataRes?.length}
                        />
                        <TableBody>
                            {
                                stableSort(viewGuestListMainData, getComparator(order, orderBy))
                                    .slice((rowsPerPage * (page - 1)), (rowsPerPage * (page) + rowsPerPage))
                                    .map((row, index) => {

                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow hover onClick={(event) => handleClick(event, row.firstName)} role="checkbox"

                                                tabIndex={-1}
                                                key={row.id}

                                            >
                                                <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.first_name}</TableCell>
                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.last_name}</TableCell>
                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.phone_number}</TableCell>
                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" , textTransform: "lowercase"}}>{row.email_id}</TableCell>
                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.title}</TableCell>
                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.check_in}</TableCell>
                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.check_out}</TableCell>
                                                <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}

                                                >
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
                                                            <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"}>
                                                                {row.label}
                                                            </span>
                                                                {row.status === 1 && (
                                                                    <div

                                                                    ></div>
                                                                )}
                                                            </>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell align="left" className='View'> <ul className="list-group d-flex flex-row">
                                                    <li className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"}
                                                        onClick={() => { handleChangeViewPro(row.id, row.is_active) }}><i className="fas fa-eye mr-1"></i> View</li>
                                                    <li className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"}
                                                        onClick={() => { handleChangeEditUser(row.id, row.is_active) }}><i className="fa fa-pen mr-1"></i> Edit</li>
                                                </ul></TableCell>
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
                        menuPlacement="top"
                        menuPosition="fixed"
                        styles={{
                            menu: (base) => ({
                                ...base,
                                top: 'auto',
                                bottom: 0,
                            }),
                        }}
                    />
                </FormGroup>
                {viewGuestListDataRes?.data && <p className='endText'>   {viewGuestListDataRes?.data?.start} - {viewGuestListDataRes?.data?.end} of {viewGuestListDataRes?.data?.total}</p>}
                <p>
                    <button className={btnPrev.join(' ')} onClick={() => { handleChangePagePrev(page) }}>
                        <ArrowBackIosNewSharpIcon className='iconBtn' />
                    </button>
                    <button className={btnNext.join(' ')} onClick={() => { handleChangePageNext(page) }}>
                        <ArrowForwardIosSharpIcon className='iconBtn' />
                    </button></p>
            </div>
        </Box>
    );
}
export default GuestUserTable;