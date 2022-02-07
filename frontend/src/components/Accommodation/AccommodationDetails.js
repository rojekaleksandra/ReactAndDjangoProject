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
import Accommodation from "./Accommodation";
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


class AccommodationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accommodationList: this.props.accommodationList,
            activeItem: this.props.activeItem,
            modal: false,
            toggleAD: this.props.toggleAD,
            refreshList: this.props.refreshList,
        };
    }

    handleSubmit = (item) => {
        this.toggle();
        this.state.toggleAD();

        if (item.id) {
            axios
                .put(`/api/accommodation/${item.id}/`, item)
                .then((res) => this.state.refreshList());
            return;
        }
        axios
            .post("/api/accommodation/", item)
            .then((res) => this.state.refreshList())
            .catch((err) => this.createItem());
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleDelete = (item) => {
        axios
            .delete(`/api/accommodation/${item.id}/`)
            .then((res) => this.state.refreshList());
        this.state.toggleAD();
    };

    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    render() {

        return (
            <main className="container">
                <Modal isOpen={true} toggle={this.state.toggleAD} >
                    <ModalHeader toggle={this.state.toggleAD}>Accommodation</ModalHeader>
                    <ModalBody>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Object: </Typography>
                        <Typography variant="h7" component="div" gutterBottom  ><b>{this.state.activeItem.object}</b></Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Name:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  ><b>{this.state.activeItem.name}</b></Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Price for day:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.price_for_day}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Numb of rooms:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.numb_rooms}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Number of people:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.numb_people}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Double-bed:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.double_bed}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Single-bed:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.single_bed}</Typography>
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
                    <Accommodation
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );
    }
}

export default AccommodationDetails;