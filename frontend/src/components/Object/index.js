import React, { Component } from "react";
import Object from "./Object";
import ObjectDetails from "./ObjectDetails";
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


class newObject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectList: [],
      searchedValue: '',
      modal: false,
      details: false,
      activeItem: {
        name: "",
        city: "",
        zip_code: "",
        street_house_numb: "",
        tel: "",
        email: "",
        web_www: "",
        check_in: "",
        check_out: "",
        percent_advance_payment: "",
        numb_of_days_advance_payment: "",
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
  };

  toggleOD = () => {
    this.setState({ details: !this.state.details });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/object/${item.id}/`, item)
        .then((res) => this.refreshList())
      return;
    }
    axios
      .post("/api/object/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/object/${item.id}/`)
      .then((res) => this.refreshList());
  };

  handleSearch = (event) => {
    this.setState({ searchedValue: event.target.value });
  }

  createItem = () => {
    const item = {
      name: "",
      city: "",
      zip_code: "",
      street_house_numb: "",
      tel: "",
      email: "",
      web_www: "",
      check_in: "",
      check_out: "",
      percent_advance_payment: "",
      numb_of_days_advance_payment: ""
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
    const newItems = this.state.objectList;
    const filteredItems = newItems.filter((item) => item.name.includes(this.state.searchedValue));
    return filteredItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2`}
          title={item.name}
        >
          {item.name}
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
        <h1 className="text-white text-uppercase text-center my-4 text-focus-in">object app</h1>
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
              endIcon={<AddIcon />}
              color="neutral"
              onClick={this.createItem}
            >
              Add Object
            </Button>
            </ThemeProvider>
          </div>
          <ul className="list-group list-group-flush border-top-0">
            {this.renderItems()}
          </ul>
        </div>
        {this.state.modal ? (
          <Object
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.details ? (
          <ObjectDetails
            activeItem={this.state.activeItem}
            toggleOD={this.toggleOD}
            objectList={this.state.objectList}
            refreshList={this.refreshList}
          />
        ) : null}
      </main>
    );
  }
}

export default newObject;
