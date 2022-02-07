import * as React from 'react';
import Calendar from '../components/Scheduler';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#008B8B',
      contrastText: '#fff',
    },
  },
});

const CalendarPage = () => {
    const [obj, setObj] = React.useState('');
    const [accom, setAccom] = React.useState('');
    const [objectList, setObjectList] = React.useState([]);
    const [accomList, setAccomList] = React.useState([]);


    React.useEffect(() => {
        axios
            .get("/api/object/")
            .then((res) => setObjectList(res.data))
            .catch((err) => console.log(err));

        axios
            .get("/api/accommodation/")
            .then((res) => setAccomList(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleChangeAccom = (event) => {
        setAccom(event.target.value);
    };

    const handleChangeObj = (event) => {
        setObj(event.target.value);
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={6} md={1.7} >
                <Box sx={{ p: 2 }} className="slide-in-elliptic-left-fwd mb-4">
                <ThemeProvider theme={theme}>
                    <FormControl fullWidth variant="filled" color="neutral">
                        <InputLabel id="demo-simple-select-label">Object</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={obj}
                            label="Object"
                            onChange={handleChangeObj}
                        >
                            {objectList.map((item) => (
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </ThemeProvider>
                </Box>
                <Box sx={{ p: 2 }} className="slide-in-elliptic-left-fwd">
                <ThemeProvider theme={theme}>
                    <FormControl fullWidth variant="filled" color="neutral">
                        <InputLabel id="demo-simple-select-label">Accommodation</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={accom}
                            label="Accom"
                            onChange={handleChangeAccom}
                        >   
                            {accomList.map((item) => {
                                return item.object===obj ? 
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                    : null
                            })}
                        </Select>
                    </FormControl>
                    </ThemeProvider>
                </Box>
            </Grid>
            <Grid item xs={6} md={10}>
                <Calendar obj={obj} acc={accom} />
            </Grid>
        </Grid>

    );
};

export default CalendarPage;
