import React, { Component } from "react";
import Accommodation from "./Accommodation";
import AccommodationDetails from "./AccommodationDetails"
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


class newAccommodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectList: [],
      accommodationList: [],
      searchedValue: '',
      modal: false,
      details: false,
      activeItem: {
        object: "",
        name: "",
        price_for_day: "",
        numb_rooms: "",
        numb_people: "",
        double_bed: "",
        single_bed: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
    .get("/api/object/")
    .then((res) => this.setState({ objectList: res.data }))
    .catch((err) => console.log(err));

    axios
      .get("/api/accommodation/")
      .then((res) => this.setState({ accommodationList: res.data }))
      .catch((err) => console.log(err));
  };

  toggleAD = () => {
    this.setState({ details: !this.state.details });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/accommodation/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/accommodation/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/accommodation/${item.id}/`)
      .then((res) => this.refreshList());
  };

  handleSearch = (event) => {
    this.setState({ searchedValue: event.target.value });
  }

  createItem = () => {
    const item = {
      object: "",
      name: "",
      price_for_day: "",
      numb_rooms: "",
      numb_people: "",
      double_bed: "",
      single_bed: ""
    };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  showItem = (item) => {
    this.setState({ activeItem: item, details: !this.state.details });
  };

  renderItems = () => {
    const newItems = this.state.accommodationList;
    const filteredItems = newItems.filter((item) => { return (item.object.includes(this.state.searchedValue)) || item.name.includes(this.state.searchedValue)});

    return filteredItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2`}
          title={item.name}
        >
          Object:   {item.object}<br /> Name: {item.name}
        </span>
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
        <h1 className="text-white text-uppercase text-center my-4 text-focus-in">Accommodation app</h1>
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
                Add Accommodation
              </Button>
            </ThemeProvider>
          </div>
          <ul className="list-group list-group-flush border-top-0">
            {this.renderItems()}
          </ul>
        </div>
        {this.state.modal ? (
          <Accommodation
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.details ? (
          <AccommodationDetails
            activeItem={this.state.activeItem}
            toggleAD={this.toggleAD}
            accommodationList={this.state.accommodationList}
            refreshList={this.refreshList}
          />
        ) : null}
      </main>
    );
  }
}

export default newAccommodation;