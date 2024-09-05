
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import Select from "react-select";
import {
    Button,
} from "reactstrap";
import * as routes from "../../../Router/RoutesURL";
import { useSelector, useDispatch } from 'react-redux';
import {
    options,
    stableSort,
    getComparator
} from '../../../utils/Helper'
import AppContainer from '../../../components/AppContainer/AppContainer';
import WhitePlus from "../../../assets/images/CommonComponent/WhitePlus.svg"
import './WellnessTeamList.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))


const headCells = [
    {
        id: 'firstName',
        disablePadding: true,
        label: 'FIRST NAME',
    },
    {
        id: 'lastName',
        disablePadding: false,
        label: 'LAST NAME',
    },
    {
        id: 'mob',
        disablePadding: false,
        label: 'MOBILE NO.',
    },
    {
        id: 'email',
        disablePadding: false,
        label: 'EMAIL ADDRESS',
    },
    {
        id: 'program',
        disablePadding: false,
        label: 'USER ROLE',
    },
    {
        id: 'add',
        disablePadding: false,
        label: 'ADDED ON',
    },
    {
        id: 'status',
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
    const { numSelected } = props;

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
                    >                        Wellness Team List
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 TeamMembersLevelDiv'>

                    <div className="mr-sm-2 searchDiv class-search ">
                        <input
                            className="form-control mr-sm-2 class-search"
                            type="search"
                            placeholder=" Search Keyword"
                            aria-label="Search"
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

const WellnessTeamListTable = (props) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedOption, setselectedOption] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = users.map((n) => n.name);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const { history } = props;

    const handleChange = (e) => {
        navigate(routes.ADD_MEMBER);
    };

    const handleChangeOption = (e) => {
        setselectedOption(e)
    }

    return (
        <AppContainer history={history}>
            <div className="event-table">
                <div className='d-flex flex-row-reverse'> <Button className="btn btn-primary mt-2 mb-2 addUser" type="submit" onClick={handleChange}>
                    <img className="mr-2 mb-1 " src={WhitePlus} alt="" width="14px" height="14px" />New Member
                </Button></div>
                <Box sx={{ width: '100%' }} className="TeamMembersBox">
                    <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer sx={{ p: 3 }}>
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
                                    rowCount={users.length}
                                />
                                <TableBody>
                                    {
                                        stableSort(users, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow hover onClick={(event) => handleClick(event, row.name)} role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">{row.name}</TableCell>
                                                        <TableCell align="left">{row.username}</TableCell>
                                                        <TableCell align="left">{row.email}</TableCell>
                                                        <TableCell align="left">{row.address.street}</TableCell>
                                                        <TableCell align="left">{row.phone}</TableCell>
                                                        <TableCell align="left">{row.phone}</TableCell>
                                                        <TableCell align="left">
                                                            <Select

                                                                className="react-select"
                                                                classNamePrefix="react-select"

                                                                onChange={handleChangeOption}
                                                                value={selectedOption}
                                                                options={options}
                                                                theme={(theme) => ({
                                                                    ...theme,
                                                                    isFocused: "#74613C",
                                                                    colors: {
                                                                        ...theme.colors,
                                                                        primary25: '#F5F5F5',
                                                                        primary: '#74613C',
                                                                    },
                                                                })}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left" className='View'> <ul className="list-group d-flex flex-row">
                                                            <li className="list-group-item ViewEdit p-0"><i className="fas fa-eye mr-1"></i> View</li>
                                                            <li className="list-group-item ViewEdit p-0" onClick={handleChange} ><i className="fa fa-pen mr-1"></i> Edit</li>
                                                            <li className="list-group-item Delete p-0"><i className="fa fa-trash mr-1"></i> Delete</li>
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
                        </TableContainer>
                    </Paper>
                    <TablePagination
                        className="pagination"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </div>
        </AppContainer>
    );
}
export default WellnessTeamListTable;