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
import Reservation from "./Reservation";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#008B8B',
            contrastText: '#fff',
        },
    },
});

function substractDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() - days)
    return copy
}

class ReservationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientList: this.props.clientList,
            reservationList: this.props.reservationList,
            objectList: this.props.objectList,
            accommodationList: this.props.accommodationList,
            activeItem: this.props.activeItem,
            modal: false,
            toggleRD: this.props.toggleRD,
            refreshList: this.props.refreshList,
        };
    }

    handleSubmit = (item) => {
        this.toggle();
        this.state.toggleRD();

        if (item.id) {
            axios
                .put(`/api/reservation/${item.id}/`, item)
                .then((res) => this.state.refreshList());
            return;
        }
        axios
            .post("/api/reservation/", item)
            .then((res) => this.state.refreshList())
            .catch((err) => this.createItem());
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleDelete = (item) => {
        axios
            .delete(`/api/reservation/${item.id}/`)
            .then((res) => this.state.refreshList());
        this.state.toggleRD();
    };

    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    render() {

        return (
            <main className="container">
                <Modal isOpen={true} toggle={this.state.toggleRD} >
                    <ModalHeader toggle={this.state.toggleRD}>Reservation</ModalHeader>
                    <ModalBody>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Client:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >
                            {this.state.clientList.map((cl) => {
                                return cl.id === this.state.activeItem.client ?
                                    <b>{cl.name} {cl.lastname}</b>
                                    : null
                            })}
                        </Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Object: </Typography>
                        <Typography variant="h7" component="div" gutterBottom  ><b>{this.state.activeItem.object}</b></Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Accommodation:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  ><b>{this.state.activeItem.accommodation}</b></Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Arrival date:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.arrival_date}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Departure date:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.departure_date}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Total price:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >
                            {this.state.accommodationList.map((acc) => {
                                return acc.name === this.state.activeItem.accommodation ?
                                    <h9>{Math.floor((Math.abs(new Date(this.state.activeItem.departure_date).getTime() - new Date(this.state.activeItem.arrival_date).getTime())) / (1000 * 60 * 60 * 24)) * acc.price_for_day}</h9>
                                    : null
                            })}
                        </Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Advance payment:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >
                            {this.state.accommodationList.map((acc) => {
                                return acc.name === this.state.activeItem.accommodation ?
                                    this.state.objectList.map((ob) => {
                                        return ob.name === this.state.activeItem.object ?
                                            <h9>{Math.floor((Math.abs(new Date(this.state.activeItem.departure_date).getTime() - new Date(this.state.activeItem.arrival_date).getTime())) / (1000 * 60 * 60 * 24)) * acc.price_for_day * ob.percent_advance_payment / 100}</h9>
                                            : null
                                    })
                                    : null
                            })}
                        </Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Date of advance payment:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >
                            {this.state.accommodationList.map((acc) => {
                                return acc.name === this.state.activeItem.accommodation ?
                                    this.state.objectList.map((ob) => {
                                        return ob.name === this.state.activeItem.object ?
                                            <h9>{substractDays(new Date(this.state.activeItem.arrival_date), 10).toISOString().split('T')[0]}</h9>
                                            : null
                                    })
                                    : null
                            })}
                        </Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Payment status:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  ><b>{this.state.activeItem.payment_status}</b></Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Additional information:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  > {this.state.activeItem.add_info}</Typography>
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
                    <Reservation
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );
    }
}

export default ReservationDetails;