import React, { useEffect, useState } from 'react'
import { Box, Card, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';

export default function ChatWindow() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);
    const [typingTimeOut, setTypingTimeOut] = useState(null);

    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("message-from-server", (data) => {
            setChat((prev) => [...prev, { message: data.message, received: true }])
        })

        socket.on("typing-started-from-server", () => setTyping(true))

        socket.on("typing-stoped-from-server", () => setTyping(false))

    }, [socket])

    function handleForm(e) {
        e.preventDefault();
        socket.emit("send-message", { message });
        setChat((prev) => [...prev, { message, received: false }])
        setMessage("")
    }

    function handleInput(e) {
        setMessage(e.target.value)
        socket.emit("typing-started")

        if (typingTimeOut) clearTimeout(typingTimeOut)

        setTypingTimeOut(setTimeout(() => {
            socket.emit("typing-stoped")
        }, 1000));
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card className='' sx={{
                p: 2,
                mt: 4,
                width: "60%",
                backgroundColor: "lightgray",
                color: "white"
            }}>
                <Box sx={{ marginBottom: 5 }}>
                    {chat.map((data) => (

                        <Typography
                            sx={{ textAlign: data.received ? "left" : "right" }}
                            key={data.message}
                        >
                            {data.message}
                        </Typography>

                    ))}
                </Box>
                <Box component="form" onSubmit={handleForm}>
                    {typing &&
                        <InputLabel sx={{ color: "white" }} shrink htmlFor="message-input">Typing...</InputLabel>}
                    <OutlinedInput
                        sx={{ backgroundColor: "white" }}
                        id="outlined-adornment-password"
                        size="small"
                        fullWidth
                        value={message}
                        placeholder="Write your message"
                        onChange={handleInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>
            </Card >
        </Box>
    )
}
