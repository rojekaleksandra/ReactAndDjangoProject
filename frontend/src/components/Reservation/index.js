import React, { Component } from "react";
import Reservation from "./Reservation";
import ReservationDetails from './ReservationDetails'
import axios from "axios";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#008B8B',
      contrastText: '#fff',
    },
  },
});


class newReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationList: [],
      clientList: [],
      objectList: [],
      accommodationList: [],
      searchedValue: '',
      modal: false,
      details: false,
      activeItem: {
        client: "",
        object: "",
        accommodation: "",
        arrival_date: "",
        departure_date: "",
        payment_status: "",
        add_info: "",
      },
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
    
    axios
      .get("/api/object/")
      .then((res) => this.setState({ objectList: res.data }))
      .catch((err) => console.log(err));
    
    axios
      .get("/api/accommodation/")
      .then((res) => this.setState({ accommodationList: res.data }))
      .catch((err) => console.log(err));
  };

  toggleRD = () => {
    this.setState({ details: !this.state.details });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/reservation/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/reservation/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/reservation/${item.id}/`)
      .then((res) => this.refreshList());
  };

  handleSearch = (event) => {
    this.setState({ searchedValue: event.target.value });
  }

  showItem = (item) => {
    this.setState({ activeItem: item, details: !this.state.details });
  };

  createItem = () => {
    const item = {
      client: "",
      object: "",
      accommodation: "",
      arrival_date: "",
      departure_date: "",
      payment_status: "",
      add_info: "",
    };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  renderItems = () => {
    const newItems = this.state.reservationList;
    const filteredClients = this.state.clientList.filter((item) => {
      return (item.name + " " + item.lastname).includes(this.state.searchedValue)
    }).map((cl) => cl.id)
    const filteredItems = newItems.filter((item) => { return (item.object.includes(this.state.searchedValue)) || (item.accommodation.includes(this.state.searchedValue)) || filteredClients.includes(item.client) });

    return filteredItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        {this.state.clientList.map((cl) => {
          return cl.id === item.client ?
            <span
              className={`todo-title mr-2`}
              title={item.client}
            >

              Client:   {cl.name} {cl.lastname} <br />Object:   {item.object}<br />Accommodation:   {item.accommodation}
            </span>
            : null
        })}
        <span>
        <ThemeProvider theme={theme}>
            <Button
              color="neutral"
              startIcon={<MoreHorizIcon />}
              onClick={() => this.showItem(item)}
            >
              Details
            </Button>
          </ThemeProvider>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4 text-focus-in">Reservation app</h1>
        <div className="col-md-6 col-sm-10 mx-auto p-0 card m-3 slide-in-left">
          <TextField
            id="outlined-search"
            label="Search..."
            type="search"
            onChange={this.handleSearch}
            value={this.state.searchedValue}
          />
        </div>
        <div className="col-md-6 col-sm-10 mx-auto p-0 card p-3 fade-in-br">
          <div className="mb-4">
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="neutral"
                endIcon={<AddIcon />}
                onClick={this.createItem}
              >
                Add Reservation
              </Button>
            </ThemeProvider>
          </div>
          <ul className="list-group list-group-flush border-top-0">
            {this.renderItems()}
          </ul>
        </div>
        {this.state.modal ? (
          <Reservation
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.details ? (
          <ReservationDetails
            activeItem={this.state.activeItem}
            toggleRD={this.toggleRD}
            reservationList={this.state.reservationList}
            clientList={this.state.clientList}
            objectList={this.state.objectList}
            accommodationList={this.state.accommodationList}
            refreshList={this.refreshList}
          />
        ) : null}
      </main>
    );
  }
}

export default newReservation;