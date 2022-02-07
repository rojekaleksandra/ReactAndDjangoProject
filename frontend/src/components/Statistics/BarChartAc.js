import * as React from 'react';
import axios from "axios";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart'

export default class BarChartAc extends React.PureComponent {
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
        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="count"
            argumentField="accommodation"
          />
          <Animation />
        </Chart>
    );
  }
}