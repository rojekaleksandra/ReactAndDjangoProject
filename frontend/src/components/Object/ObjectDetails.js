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
import Object from "./Object";
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


class ObjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objectList: this.props.objectList,
            activeItem: this.props.activeItem,
            modal: false,
            toggleOD: this.props.toggleOD,
            refreshList: this.props.refreshList,
        };
    }

    handleSubmit = (item) => {
        this.toggle();
        this.state.toggleOD();

        if (item.id) {
            axios
                .put(`/api/object/${item.id}/`, item)
                .then((res) => this.state.refreshList());
            return;
        }
        axios
            .post("/api/object/", item)
            .then((res) => this.state.refreshList())
            .catch((err) => this.createItem());
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleDelete = (item) => {
        axios
            .delete(`/api/object/${item.id}/`)
            .then((res) => this.state.refreshList());
        this.state.toggleOD();
    };

    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    render() {

        return (
            <main className="container">
                <Modal isOpen={true} toggle={this.state.toggleOD} >
                    <ModalHeader toggle={this.state.toggleOD}>Object</ModalHeader>
                    <ModalBody>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Name: </Typography>
                        <Typography variant="h7" component="div" gutterBottom  ><b>{this.state.activeItem.name}</b></Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >City:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.city}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Zip code:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.zip_code}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Street and house number:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.street_house_numb}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Tel:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.tel}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Email:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.email}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Web www:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.web_www}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Check in:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.check_in}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Check out:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.check_out}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Percent of advance payment:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.percent_advance_payment}</Typography>
                        <Typography variant="h6" component="div" gutterBottom color="#008B8B" >Number of days to advance payment:</Typography>
                        <Typography variant="h7" component="div" gutterBottom  >{this.state.activeItem.numb_of_days_advance_payment}</Typography>
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
                    <Object
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );
    }
}

export default ObjectDetails;