import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Rightbar from './components/Rightbar'
import { Box, Container, createTheme, Stack, ThemeProvider } from '@mui/material'
import Add from './components/Add'

function App() {
  const [mode, setMode] = React.useState("light")

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })
  return (
    < ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        < Navbar />
        <Stack direction="" spacing={2} justifyContent='space-between'>
          < Sidebar setMode={setMode} mode={mode}/>
          < Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  )
}

export default App
