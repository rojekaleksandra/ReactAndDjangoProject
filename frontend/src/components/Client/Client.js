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

class CustomClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit(event, values) {
    let name = "name";
    let lastname = "lastname";
    let tel = "tel";
    let email = "email";
    const activeItem = { ...this.state.activeItem, [name]: values.name, [lastname]: values.lastname, [tel]: values.tel, [email]: values.email };

    this.setState({ activeItem });
    this.props.onSave(this.state.activeItem);
  }



  render() {
    const { toggle } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Client</ModalHeader>
        <AvForm onValidSubmit={this.handleValidSubmit}>
          <ModalBody>
            <AvField name="name" label="Name" type="text" errorMessage="Invalid name" 
            value={this.state.activeItem.name}
            validate={{
              required: { value: true, errorMessage: "Field required" },
              pattern: { value: '^[A-Za-z]+$', errorMessage: 'Only letters' }
            }}
            />
            <AvField name="lastname" label="Last name" type="text" 
            value={this.state.activeItem.lastname}
            validate={{
              required: { value: true, errorMessage: "Field required" },
              lastNameValid: (value, ctx, input, cb) => {
                if (/^[a-zA-Z\s_-]+$/.test(value)) {
                  return true
                } else {
                  return "You can use only letters and '-'"
                }
              },
            }} />
            <AvField name="tel" label="Telephone number" type="text" 
            value={this.state.activeItem.tel}
            validate={{
              required: { value: true, errorMessage: "Field required" },
              pattern: { value: '^[0-9]+$', errorMessage: '9 digits' },
              minLength: { value: 9, errorMessage: "Wrong number of digits, need 9" },
              maxLength: { value: 9, errorMessage: "Wrong number of digits, need 9" }

            }} />
            <AvField name="email" label="Email Address" type="email" 
            value={this.state.activeItem.email}
            validate={{
              required: { value: true, errorMessage: "Field required" }
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
      </Modal >
    );
  }
}

export default CustomClient;