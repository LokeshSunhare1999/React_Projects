import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Switch } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Home, Article, Groups, Storefront, Person, Settings, AccountBox, ModeNight } from '@mui/icons-material';

function Sidebar({ mode, setMode }) {
    return (
        <Box bgcolor=""
            flex={1}
            p={2}
            sx={{ display: { xs: "none", sm: "block" } }}>
            <Box position="fixed">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton Component='a' href='#home'>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary="Homepage" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton Component='a' href='#simple-list'>
                            <ListItemIcon>
                                <Article />
                            </ListItemIcon>
                            <ListItemText primary="Page" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton Component='a' href='#simple-list'>
                            <ListItemIcon>
                                <Groups />
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton Component='a' href='#marketplace'>
                            <ListItemIcon>
                                <Storefront />
                            </ListItemIcon>
                            <ListItemText primary="Marketplace" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton Component='a' href='#simple-list'>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary="Friends" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton Component='a' href='#simple-list'>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton Component='a' href='#simple-list'>
                            <ListItemIcon>
                                <AccountBox />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton Component='a' href='#simple-list'>
                            <ListItemIcon>
                                <ModeNight />
                            </ListItemIcon>
                            <Switch onChange={e => setMode(mode === "light" ? "dark" : "light")} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export default Sidebar
