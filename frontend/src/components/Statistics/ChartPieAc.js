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

export default class ChartPieAc extends React.PureComponent {
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
        const data = [];
        const newItems = this.state.reservationList;

        newItems.map((item) => {
            return item.object === obj ?
                data.findIndex((o => o.accommodation === item.accommodation)) === -1 ?
                    data.push({ accommodation: item.accommodation, count: 1 })
                    : data[data.findIndex((obj => obj.accommodation === item.accommodation))].count = data[data.findIndex((obj => obj.accommodation === item.accommodation))].count + 1
                : null
        })

        

        return (
            <div class="scale-in-ver-center">
            <Chart
                data={data}
            >
                <Palette scheme={schemeSet2} />
                <PieSeries
                    valueField="count"
                    argumentField="accommodation" 
                />
                <Legend/>
            </Chart>
            </div>
            

        );
    }
}