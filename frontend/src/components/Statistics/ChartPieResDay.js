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

function daysDiff(d1, d2) {
    var days = Math.floor((Math.abs(d1.getTime() - d2.getTime())) / (1000 * 60 * 60 * 24));
    return days <= 0 ? 0 : days;
}

export default class ChartPieResDay extends React.PureComponent {
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
            { days: '1-3 days', count: 0 },
            { days: '4-7 days', count: 0 },
            { days: '8-14 days', count: 0 },
            { days: '15-30 days', count: 0 },
            { days: '31+ days', count: 0 },
        ];

        const newItems = this.state.reservationList;

        newItems.map((item) => {
            if (item.object === obj) {
                var days = daysDiff(new Date(item.arrival_date), new Date(item.departure_date));
                if (1 <= days && days <= 3) {
                    data[0].count++;
                } else if (4 <= days && days <= 7) {
                    data[1].count++;
                } else if (8 <= days && days <= 14) {
                    data[2].count++;
                } else if (15 <= days && days <= 30) {
                    data[3].count++;
                } else if (30 <= days) {
                    data[4].count++;
                }
            }
            return null;
        })

        return (
            <div class="scale-in-ver-center">
                <Chart
                    data={data}
                >
                    <Palette scheme={schemeSet2} />
                    <PieSeries
                        valueField="count"
                        argumentField="days"
                    />
                    <Legend />
                </Chart>
            </div>

        );
    }
}
