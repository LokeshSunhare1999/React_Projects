import { AppBar, Box, Toolbar, styled, Typography, InputBase, Badge, Avatar, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import MailIcon from '@mui/icons-material/Mail';
import Notifications from '@mui/icons-material/Notifications';
import AdminOval from '../Assests/Image/AdminOval.jpg'

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const Search = styled("div")(({ theme }) => ({
    backgroundColor: 'white',
    padding: "0 10px",
    borderRadius: "25px",
    width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up('sm')]: {
        display: 'flex'
    }
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    [theme.breakpoints.up('sm')]: {
        display: 'none'
    }
}));

const Navbar = () => {
    const [open, setOpen] = useState(false)
    return (
        <AppBar position="stick">
            <StyledToolbar >
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>Lokeh Sunhare</Typography>
                <LightModeIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
                <Search><InputBase placeholder='Search' /></Search>
                <Icons><Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
                    <Badge badgeContent={2} color="error">
                        <Notifications />
                    </Badge>
                    <Avatar sx={{ width: 30, height: 30 }} src={AdminOval}
                        onClick={e => setOpen(true)} />
                </Icons>
                <UserBox onClick={e => setOpen(true)}>
                    <Avatar sx={{ width: 30, height: 30 }} src={AdminOval} />
                    <Typography varient="span">Joe </Typography>
                </UserBox>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    // anchorEl={anchorEl}
                    open={open}
                    onClose={(e) => setOpen(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem >Profile</MenuItem>
                    <MenuItem >My account</MenuItem>
                    <MenuItem >Logout</MenuItem>
                </Menu>
            </StyledToolbar >
        </AppBar >
    )
}

export default Navbar;
