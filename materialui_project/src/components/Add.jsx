import React, { useState } from 'react'
import { Fab, IconButton, Modal, Tooltip, styled, Typography, Avatar, TextField, Stack, Button, ButtonGroup } from '@mui/material'
import { Add as AddIcon, DateRange, PersonAdd } from "@mui/icons-material"
import { Box } from '@mui/system';
// import styled from '@mui/material';
import { EmojiEmotions, Image, VideoCameraBack } from '@mui/icons-material';

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: "center",
    justifyContent: "center"
})

const UserBox = styled(Box)({
    display: 'flex',
    alignItems: "center",
    gap: "10px",
    marginBottom: "20"
});

function Add() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Tooltip onClick={e => setOpen(true)}
                title="Delete"
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    left: { xs: 'calc(50% - 25px)', md: 30 },
                }}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClick={e => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box 
                width={400} 
                height={280} 
                p={3} borderRadius={5}  
                bgcolor={"background.default"} 
                color={"text.primary"}>
                    <Typography variant='h6' color="gray" textAlign="center">Create post</Typography>
                    <UserBox>
                        <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/6.jpg" sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant='span'>Joe Doe</Typography>
                    </UserBox>
                    <TextField
                        sx={{ width: "100%" }}
                        id="standard-multiline-static"
                        placeholder='What to do?'
                        multiline
                        rows={3}
                        // defaultValue="Default Value"
                        variant="standard"
                    />
                    <Stack direction='row' gap={1} mt={2} mb={3}>
                        <EmojiEmotions color="primary" />
                        <Image color="secondary" />
                        <VideoCameraBack color="success" />
                        <PersonAdd color="error" />
                    </Stack>
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group">
                        <Button>Post</Button>
                        <Button sx={{ width: "100px" }}>

                            <DateRange />
                        </Button>
                    </ButtonGroup>
                </Box>
            </StyledModal>
        </>
    )
}

export default Add
