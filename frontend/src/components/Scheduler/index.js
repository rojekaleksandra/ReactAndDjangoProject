import React, { Component } from "react";
import Scheduler from './Scheduler';
import './Scheduler.css';
import axios from "axios";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationList: [],
      clientList: [],
    };

  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/client/")
      .then((res) => this.setState({ clientList: res.data }))
      .catch((err) => console.log(err));

    axios
      .get("/api/reservation/")
      .then((res) => this.setState({ reservationList: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    const newItems = this.state.reservationList;
    const data = [];
    const { acc } = this.props;
    newItems.map((item) => {
      return item.accommodation === acc ?
        // const start_date = item.arrival_date + " " + obj.check_in
        // const end_date = item.departure_date + " " + obj.check_out
        this.state.clientList.map((cl) => {
          return item.client === cl.id ?
            // const start_date = item.arrival_date
            // const end_date = item.departure_date
            data.push({ start_date: item.arrival_date, end_date: item.departure_date, text: cl.name + " " + cl.lastname, id: item.id, color: item.payment_status === "Paid" ? "LightSeaGreen" : item.payment_status === "Unpaid" ? "FireBrick " : "DarkGoldenRod" })
            : null
        }) : null
    })
    return (
      <div className='scheduler-container col-md-12 col-sm-10 mx-auto p-0 card p-3 text-focus-in '>
        <Scheduler events={data} />
      </div>
    );
  }
}

export default Calendar;
