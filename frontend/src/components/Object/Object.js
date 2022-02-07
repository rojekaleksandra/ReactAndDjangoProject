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

class CustomObject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit(event, values) {
    let city = "city";
    let name = "name";
    let zip_code = "zip_code";
    let street_house_numb = "street_house_numb";
    let tel = "tel";
    let email = "email";
    let web_www = "web_www";
    let check_in = "check_in";
    let check_out = "check_out";
    let percent_advance_payment = "percent_advance_payment";
    let numb_of_days_advance_payment = "numb_of_days_advance_payment";
    const activeItem = { ...this.state.activeItem, [name]: values.name, [city]: values.city, [zip_code]: values.zip_code, [street_house_numb]: values.street_house_numb, [tel]: values.tel, [email]: values.email, [web_www]: values.web_www, [check_in]: values.check_in, [check_out]: values.check_out, [percent_advance_payment]: values.percent_advance_payment, [numb_of_days_advance_payment]: values.numb_of_days_advance_payment };

    this.setState({ activeItem });
    this.props.onSave(this.state.activeItem);
  }

  render() {
    const { toggle } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Object</ModalHeader>
        <AvForm onValidSubmit={this.handleValidSubmit} >
          <ModalBody>
            <AvField name="name" label="Object name" type="text" placeholder="Enter Object Name" value={this.state.activeItem.name}
              validate={{
                required: { value: true, errorMessage: "Field required" }
              }}
            >
            </AvField>

            <AvField name="city" label="City" type="text" value={this.state.activeItem.city} placeholder="Enter Object City" validate={{
              required: { value: true, errorMessage: "Field required" },
              cityValid: (value, ctx, input, cb) => {
                if (/^[a-zA-Z\s_-]+$/.test(value)) {
                  return true
                } else {
                  return "You can use only letters and '-'"
                }
              },
            }} />

            <AvField name="zip_code" label="Zip Code" type="text" value={this.state.activeItem.zip_code} placeholder="Enter Object Zip Code" validate={{
              required: { value: true, errorMessage: "Field required" },
              zipValid: (value, ctx, input, cb) => {
                if (/^[0-9]{2}-[0-9]{3}$/.test(value)) {
                  return true
                } else {
                  return "**-***"
                }
              },
            }} />

            <AvField name="street_house_numb" label="Street and house number" type="text" placeholder="Enter Object Street and House Number" value={this.state.activeItem.street_house_numb} validate={{
              required: { value: true, errorMessage: "Field required" },
              zipValid: (value, ctx, input, cb) => {
                if (/^[a-zA-Z_-]+\s[0-9]{1,3}[a-zA-Z]?$/.test(value)) {
                  return true
                } else {
                  return "Street name and then the house number"
                }
              },
            }} />
            <AvField name="tel" label="Telephone number" type="text" placeholder="Enter Object Tel" value={this.state.activeItem.tel} validate={{
              required: { value: true, errorMessage: "Field required" },
              pattern: { value: '^[0-9]+$', errorMessage: '9 digits' },
              minLength: { value: 9, errorMessage: "wrong number of digits, need 9" },
              maxLength: { value: 9, errorMessage: "wrong number of digits, need 9" }
            }} />
            <AvField name="email" label="Email" type="email" placeholder="Enter Object Email" value={this.state.activeItem.email} validate={{
              required: { value: true, errorMessage: "Field required" },
            }} />
            <AvField name="web_www" label="Web www" type="url" placeholder="Enter Object Web www" value={this.state.activeItem.web_www} validate={{
              required: { value: true, errorMessage: "Field required" },
            }} />
            <AvField name="check_in" label="Object Check In" type="time" placeholder="Enter Object Check In hour" value={this.state.activeItem.check_in} validate={{
              required: { value: true, errorMessage: "Field required" },
            }} />
            <AvField name="check_out" label="Object Check Out" type="time" placeholder="Enter Object Check Out hour" value={this.state.activeItem.check_out} validate={{
              required: { value: true, errorMessage: "Field required" },
            }} />
            <AvField name="percent_advance_payment" label="Percent advance payment" type="number" placeholder="Enter Object Percent advance payment" value={this.state.activeItem.percent_advance_payment} validate={{
              required: { value: true, errorMessage: "Field required" },
              min: { value: 0, errorMessage: "Can not be negative" },
              max: { value: 100, errorMessage: "Can not be higher then 100%" }
            }} />
            <AvField name="numb_of_days_advance_payment" label="Number of days - advance payment" type="number" placeholder="Enter Number of days - advance payment" value={this.state.activeItem.numb_of_days_advance_payment} validate={{
              required: { value: true, errorMessage: "Field required" },
              min: { value: 0, errorMessage: "Can not be negative" },
              max: { value: 100, errorMessage: "Can not be higher than 100" }
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

export default CustomObject;
