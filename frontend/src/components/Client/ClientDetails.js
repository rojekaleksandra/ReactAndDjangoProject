import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import Client from "./Client";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#008B8B',
      contrastText: '#fff',
    },
  },
});


class ClientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientList: this.props.clientList,
      activeItem: this.props.activeItem,
      modal: false,
      toggleCD: this.props.toggleCD,
      refreshList: this.props.refreshList,
    };
  }

  handleSubmit = (item) => {
    this.toggle();
    this.state.toggleCD();

    if (item.id) {
      axios
        .put(`/api/client/${item.id}/`, item)
        .then((res) => this.state.refreshList());
      return;
    }
    axios
      .post("/api/client/", item)
      .then((res) => this.state.refreshList())
      .catch((err) => this.createItem());
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/client/${item.id}/`)
      .then((res) => this.state.refreshList());
    this.state.toggleCD();
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {

    return (
      <main className="container">
        <Modal isOpen={true} toggle={this.state.toggleCD} >
          <ModalHeader toggle={this.state.toggleCD}>Client</ModalHeader>
          <ModalBody>
            <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Name:</Typography>
            <Typography variant="h7" component="div" gutterBottom  ><b>{this.state.activeItem.name}</b></Typography>
            <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Lastname:</Typography>
            <Typography variant="h7" component="div" gutterBottom  ><b>{this.state.activeItem.lastname}</b></Typography>
            <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Email:</Typography>
            <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.email}</Typography>
            <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Tel:</Typography>
            <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.tel}</Typography>
          </ModalBody>
          <ModalFooter>
            <ThemeProvider theme={theme}>
              <Button
                startIcon={<EditIcon />}
                color="neutral"
                variant="outlined" 
                onClick={() => this.editItem(this.state.activeItem)}
              >
                EDIT
              </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
              <Button
                startIcon={<DeleteIcon />}
                color="neutral"
                variant="outlined" 
                onClick={() => this.handleDelete(this.state.activeItem)}
              >
                DELETE
              </Button>
              </ThemeProvider>
          </ModalFooter>
        </Modal>
        {this.state.modal ? (
          <Client
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default ClientDetails;