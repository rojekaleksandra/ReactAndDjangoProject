import * as React from 'react';
import axios from "axios";
import {
    Chart,
    PieSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Palette } from '@devexpress/dx-react-chart';
import {
    schemeSet2,
  } from 'd3-scale-chromatic';

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() ;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

export default class ChartPieRes extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            reservationList: [],
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/api/reservation/")
            .then((res) => this.setState({ reservationList: res.data }))
            .catch((err) => console.log(err))
    };

    render() {
        const { obj } = this.props;
        const data = [
            { month: 'January', count: 0 },
            { month: 'February', count: 0 },
            { month: 'March', count: 0 },
            { month: 'April', count: 0 },
            { month: 'May', count: 0 },
            { month: 'June', count: 0 },
            { month: 'July', count: 0 },
            { month: 'August', count: 0 },
            { month: 'September', count: 0 },
            { month: 'October', count: 0 },
            { month: 'November', count: 0 },
            { month: 'December', count: 0 },
          ];

        const newItems = this.state.reservationList;

        newItems.map((item) => {
           if(item.object === obj){
            //    i = monthDiff(new Date(item.arrival_date), new Date(item.departure_date))
                if(monthDiff(new Date(item.arrival_date), new Date(item.departure_date)) === 0){
                     data[new Date(item.arrival_date).getMonth()].count++;
                }else{
                    for(var i=0;i<=monthDiff(new Date(item.arrival_date), new Date(item.departure_date));i++){
                        data[new Date(item.arrival_date).getMonth()+i].count++;
                    }
                }
                }
                return null;
            })
        

        return (
            <Chart
                data={data}
            >
                <Palette scheme={schemeSet2} />
                <PieSeries
                    valueField="count"
                    argumentField="month" 
                />
                <Legend/>
            </Chart>

        );
    }
}