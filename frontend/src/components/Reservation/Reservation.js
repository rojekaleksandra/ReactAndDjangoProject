import React, { Component } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";

class CustomReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      clientList: [],
      accommodationList: [],
      reservationList: [],
      objectList: [],
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit(event, values) {
    let client = "client";
    let object = "object";
    let accommodation = "accommodation";
    let arrival_date = "arrival_date";
    let departure_date = "departure_date";
    let payment_status = "payment_status";
    let add_info = "add_info";

    const activeItem = { ...this.state.activeItem, [client]: values.client, [object]: values.object, [accommodation]: values.accommodation, [arrival_date]: values.arrival_date, [departure_date]: values.departure_date, [payment_status]: values.payment_status, [add_info]: values.add_info };

    this.setState({ activeItem });
    this.props.onSave(this.state.activeItem);
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

  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });

  };


  render() {
    const { toggle } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reservation</ModalHeader>
        <AvForm onValidSubmit={this.handleValidSubmit} >
          <ModalBody>
            <AvField name="client" label="Client" type="select" placeholder="Enter Client" value={this.state.activeItem.client}
              validate={{
                required: { value: true, errorMessage: "Field required" }
              }}
            >
              <option></option>
              {this.state.clientList.map((item) => (
                <option value={item.id}>{item.name} {item.lastname}</option>
              ))}
            </AvField>
            <AvField name="object" label="Object" type="select" placeholder="Enter Object" onChange={this.handleChange} value={this.state.activeItem.object}
              validate={{
                required: { value: true, errorMessage: "Field required" }
              }}
            >
              <option></option>
              {this.state.objectList.map((item) => (
                <option value={item.name}>{item.name} {item.lastname}</option>
              ))}
            </AvField>
            <AvField name="accommodation" label="Accommodation" type="select" placeholder="Enter Accommodation" onChange={this.handleChange}
              value={this.state.activeItem.accommodation}
              validate={{
                required: { value: true, errorMessage: "Field required" }
              }}
            >
              <option></option>
              {this.state.accommodationList.map((item) => {
                return item.object === this.state.activeItem.object ?
                  <option value={item.name}>{item.name}</option>
                  : null
              })}
            </AvField>
            <AvField name="arrival_date" label="Arrival Date" type="date" placeholder="Enter Arrival Date" onChange={this.handleChange} dateFormat="-"
              value={this.state.activeItem.arrival_date}
              validate={{
                required: { value: true, errorMessage: "Field required" },
                arrivalVAlid: (value) => {
                    if (this.state.reservationList.map((res) => {
                      if (this.state.activeItem.accommodation === res.accommodation)
                        return new Date(res.arrival_date).getTime() < new Date(value).getTime() && new Date(res.departure_date).getTime() > new Date(value).getTime();
                      return null;
                    }).includes(true)) return "Date unavailable";
                    return true;
                }
              }}
            />
            <AvField name="departure_date" label="Departure Date" type="date" placeholder="Enter Departure Date" dateFormat="-"
              value={this.state.activeItem.departure_date}
              validate={{
                required: { value: true, errorMessage: "Field required" },
                departureVAlid: (value) => {
                  if (new Date(this.state.activeItem.arrival_date).getTime() > new Date(value).getTime()) {
                    return "Departure date before arrival date";
                  }
                  if (new Date(this.state.activeItem.arrival_date).getTime() === new Date(value).getTime()) {
                    return "Same date of arrival and departure";
                  } else
                    if (!this.state.activeItem.arrival_date) {
                      return "No arrival date";
                    } else {

                      if (this.state.reservationList.map((res) => {
                        if (this.state.activeItem.accommodation === res.accommodation)
                          return !((new Date(res.arrival_date).getTime() >= new Date(value).getTime() && new Date(res.arrival_date).getTime() > new Date(this.state.activeItem.arrival_date).getTime()) || (new Date(res.arrival_date).getTime() < new Date(value).getTime() && new Date(res.departure_date).getTime() <= new Date(this.state.activeItem.arrival_date).getTime()));// oba przed lub oba po i zaprzeczamy, żeby mieć true czyli "zajęte"
                        return null;
                      }).includes(true)) { return "Date unavailable"; }
                      else {
                        return true;
                      }
                    }
                }
              }}
            />
            <AvField name="payment_status" label="Payment status" type="select" placeholder="Enter payment status"
              value={this.state.activeItem.payment_status}
              validate={{
                required: { value: true, errorMessage: "Field required" }
              }}
            >
              <option></option>
              <option value={"Paid"} >Paid</option>
              <option value={"PaidAP"} >Paid Advance Payment</option>
              <option value={"Unpaid"} >Unpaid</option>
            </AvField>
            <AvField name="add_info" label="Additional information" type="text" placeholder="Enter Additional information" value={this.state.activeItem.departure_date}
            />
          </ModalBody>
          <ModalFooter>
          <Button
                outline
                color="info"
              >
                <SaveIcon />  SAVE   
              </Button>
          </ModalFooter>
        </AvForm>
      </Modal >
    );
  }
}

export default CustomReservation;
