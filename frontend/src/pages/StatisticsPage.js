import * as React from 'react';
import ChartPieAc from '../components/Statistics/ChartPieAc';
import ChartPieResDay from '../components/Statistics/ChartPieResDay';
import BarChartResDay from '../components/Statistics/BarChartResDay';
import BarChartAc from '../components/Statistics/BarChartAc';
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

const StatisticsPage = () => {
    const [obj, setObj] = React.useState('');
    const [objectList, setObjectList] = React.useState([]);
    const [chartResDay, setChartResDay] = React.useState('');
    const [chartAcc, setChartAcc] = React.useState('');
    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        axios
            .get("/api/object/")
            .then((res) => setObjectList(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleChangeObj = (event) => {
        setObj(event.target.value);
        setChartResDay('');
        setChartAcc('');
        setDisabled(false);
    };

    const handleChangeChartResDay = (event) => {
        setChartResDay(event.target.value);
    };

    const handleChangeChartAcc = (event) => {
        setChartAcc(event.target.value);
    };


    return (
        <Grid container spacing={2}>
            <Grid container justifyContent="center">
                <Grid item xs={2} >
                    <Box sx={{ p: 2 }} className="bounce-in-fwd ">
                        <ThemeProvider theme={theme}>
                            <FormControl fullWidth variant="filled" color="neutral">
                                <InputLabel id="obj">Object</InputLabel>
                                <Select
                                    labelId="obj"
                                    id="obj"
                                    value={obj}
                                    label="Object"
                                    onChange={handleChangeObj}
                                >
                                    {objectList.map((item) => (
                                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" >
                <Grid item xs={2}>
                    <Box sx={{ p: 2 }} className="bounce-in-fwd ">
                        <ThemeProvider theme={theme}>
                            <FormControl fullWidth variant="filled" color="neutral">
                                <InputLabel id="chart">Accomodation Statistics</InputLabel>
                                <Select
                                    labelId="chart"
                                    id="chart"
                                    value={chartAcc}
                                    label="Chart"
                                    onChange={handleChangeChartAcc}
                                    disabled={disabled}
                                >
                                    <MenuItem key={<ChartPieAc obj={obj} />} value={<ChartPieAc obj={obj} />} label="ChartPie">ChartPie</MenuItem>
                                    <MenuItem key={<BarChartAc obj={obj} />} value={<BarChartAc obj={obj} />} label="BarChart">BarChart</MenuItem>
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </Box>
                </Grid>
                <Grid item xs={3.1} />
                <Grid item xs={2} >
                    <Box sx={{ p: 2 }} className="bounce-in-fwd ">
                        <ThemeProvider theme={theme}>
                            <FormControl fullWidth variant="filled" color="neutral">
                                <InputLabel id="chart">Reservation Statistics</InputLabel>
                                <Select
                                    labelId="chart"
                                    id="chart"
                                    value={chartResDay}
                                    label="Chart"
                                    onChange={handleChangeChartResDay}
                                    disabled={disabled}
                                >
                                    <MenuItem value={<ChartPieResDay obj={obj} />} label="ChartPie">ChartPie</MenuItem>
                                    <MenuItem value={<BarChartResDay obj={obj} />} label="BarChart">BarChart</MenuItem>
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </Box>
                </Grid>
            </Grid>
            <Grid item />
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={5} md={4} fontSize="25px" textAlign="center">
                <p>Accommodation statistics <br/> The most popular accommodation</p>
                    {chartAcc}
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5} md={4.2} fontSize="25px" textAlign="center">
                <p>Reservation statistics <br/> Length of stay</p><br/>
                    {chartResDay}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StatisticsPage;
