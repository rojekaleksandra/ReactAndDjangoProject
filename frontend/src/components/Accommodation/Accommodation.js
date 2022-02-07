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

class CustomAccommodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      objectList: [],
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit(event, values) {
    let object = "object";
    let name = "name";
    let price_for_day = "price_for_day";
    let numb_rooms = "numb_rooms";
    let numb_people = "numb_people";
    let double_bed = "double_bed";
    let single_bed = "single_bed";
    const activeItem = { ...this.state.activeItem, [name]: values.name, [object]: values.object, [price_for_day]: values.price_for_day, [numb_rooms]: values.numb_rooms, [numb_people]: values.numb_people, [double_bed]: values.double_bed, [single_bed]: values.single_bed };

    this.setState({ activeItem });
    this.props.onSave(this.state.activeItem);
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
        <ModalHeader toggle={toggle}>Accommodation</ModalHeader>
        <AvForm onValidSubmit={this.handleValidSubmit} >
          <ModalBody>
            <AvField name="object" label="Object" type="select" value={this.state.activeItem.object} validate={{
              required: { value: true, errorMessage: "Field required" }
            }}
            >
              <option></option>
              {this.state.objectList.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </AvField>

            <AvField name="name" label="Name" type="text" placeholder="Entry Accomodation name" value={this.state.activeItem.name} validate={{
              required: { value: true, errorMessage: "Field required" },
            }} />
            <AvField name="price_for_day" label="Price for day" type="text" placeholder="Enter Accommodation Price for day" value={this.state.activeItem.price_for_day} validate={{
              required: { value: true, errorMessage: "Field required" },
              pattern: { value: '^[0-9]+$', errorMessage: 'Only digits' },

            }} />
            <AvField name="numb_rooms" label="Number of rooms" type="number" placeholder="Enter Accommodation Number of rooms" value={this.state.activeItem.numb_rooms} validate={{
              required: { value: true, errorMessage: "Field required" },
              min: { value: 1, errorMessage: "No less than 1" }
            }} />
            <AvField name="numb_people" label="Number of people" type="number" placeholder="Enter Accommodation Number of people" value={this.state.activeItem.numb_people} validate={{
              required: { value: true, errorMessage: "Field required" },
              min: { value: 1, errorMessage: "No less than 1" }
            }} />
            <AvField name="double_bed" label="Number of double-bed" type="number" placeholder="Enter Accommodation Number of double-bed" value={this.state.activeItem.double_bed} validate={{
              required: { value: true, errorMessage: "Field required" },
              min: { value: 0, errorMessage: "No less than 0" }
            }} />
            <AvField name="single_bed" label="Number of single-bed" type="number" placeholder="Enter Accommodation Number of single-bed" value={this.state.activeItem.single_bed} validate={{
              required: { value: true, errorMessage: "Field required" },
              min: { value: 0, errorMessage: "No less than 0" }
            }} />
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
      </Modal>
    );
  }
}

export default CustomAccommodation;