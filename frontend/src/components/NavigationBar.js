import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import logo from '../images/logo.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#008B8B',
      contrastText: '#fff',
    },
  },
});

const NavigationBar = () => {
  return (
    <Box height="100px" display="flex" paddingLeft={3} alignItems="center" bgcolor="#c6c6c6">
        <Button
        variant="string"
        onClick={(e) => { e.preventDefault(); window.location.href = 'http://localhost:3000/'; }}
      >
        <img src={logo} alt="logo" height="100px" />
      </Button>
      <Stack direction="row" width="100%" height="100%" marginX="auto"   alignItems="center" justifyContent="center" borderBottom={0.5} borderColor="LightSlateGray">
      <Box className="tracking-in-contract-bck-top" >
        <ThemeProvider theme={theme}>
            <Button
              variant="text"
              size="large"
              color="neutral"
              endIcon={<PersonIcon />}
              onClick={(e) => { e.preventDefault(); window.location.href = 'http://localhost:3000/client'; }}
            > Client
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="text"
              size="large"
              color="neutral"
              endIcon={<HomeIcon />}
              onClick={(e) => { e.preventDefault(); window.location.href = 'http://localhost:3000/object'; }}
            > Object
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="text"
              size="large"
              color="neutral"
              endIcon={<HotelIcon />}
              onClick={(e) => { e.preventDefault(); window.location.href = 'http://localhost:3000/accommodation'; }}
            > Accommodation
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="text"
              size="large"
              color="neutral"
              endIcon={<AutoAwesomeMotionIcon />}
              onClick={(e) => { e.preventDefault(); window.location.href = 'http://localhost:3000/reservation'; }}
            > Reservation
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="text"
              size="large"
              color="neutral"
              endIcon={<CalendarTodayIcon />}
              onClick={(e) => { e.preventDefault(); window.location.href = 'http://localhost:3000/calendar'; }}
            > Calendar
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="text"
              size="large"
              color="neutral"
              endIcon={<EqualizerOutlinedIcon />}
              onClick={(e) => { e.preventDefault(); window.location.href = 'http://localhost:3000/statistics'; }}
            > Statistics
            </Button>
          </ThemeProvider>
          </Box>
      </Stack>
    </Box>
  );
};

export default NavigationBar;
