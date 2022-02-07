import React, { Component } from "react";
import Client from "./Client";
import ClientDetails from "./ClientDetails";
import axios from "axios";
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
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


class newClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientList: [],
      searchedValue: '',
      modal: false,
      details: false,
      activeItem: {
        name: "",
        lastname: "",
        tel: "",
        email: "",
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
  };

  toggleCD = () => {
    this.setState({ details: !this.state.details });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSearch = (event) => {
    this.setState({ searchedValue: event.target.value });
  }

  createItem = () => {
    const item = { name: "", lastname: "", tel: "", email: "" };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  showItem = (item) => {
    this.setState({ activeItem: item, details: !this.state.details });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/client/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/client/", item)
      .then((res) => this.refreshList())
      .catch((err) => this.createItem());
  };


  renderItems = () => {
    const newItems = this.state.clientList;
    const filteredItems = newItems.filter((item) => (item.name + " " + item.lastname).includes(this.state.searchedValue));
    return filteredItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2`}
        >
          {item.name} {item.lastname}
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
      <main className="container" >
        <h1 className="text-white text-uppercase text-center my-4 text-focus-in" >client app</h1>
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
                endIcon={<PersonAddAlt1Icon />}
                onClick={this.createItem}
              >
                Add Client
              </Button>
            </ThemeProvider>
          </div>
          <ul className="list-group list-group-flush border-top-0">
            {this.renderItems()}
          </ul>
        </div>
        {this.state.modal ? (
          <Client
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.details ? (
          <ClientDetails
            activeItem={this.state.activeItem}
            toggleCD={this.toggleCD}
            clientList={this.state.clientList}
            refreshList={this.refreshList}
          />
        ) : null}
      </main>
    );
  }
}

export default newClient;