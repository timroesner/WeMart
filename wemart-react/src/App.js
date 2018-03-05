import React, { Component } from 'react';
import { Button, Form, TextField } from 'ic-snacks';
import background from './background.png';
import './App.css';

class App extends Component {
  state = {
    serverErrors: null
  }

  handleFormSubmit = (model) => {
    alert(model.firstName+' '+model.lastName+' '+model.email+' '+model.password)
  }

  render() {
    const formProps = {}

    return (
      //<div style={{size: '100%', margin: '0%', backgroundColor: '#b8babc'}}>
        <div style={{margin: '25%', backgroundColor: '#b8babc', borderRadius: '10px'}} >
          <Form
            onSubmit={this.handleFormSubmit}
            serverErrors={this.state.serverErrors}
            formProps={formProps}
          >
            <TextField
              floatingLabelText="First Name"
              name="firstName"
              type="firstName"
              hintText=""
              required
              style={{margin: '4%', marginBottom: '0%', width: '92%'}}
            />
            <TextField
              floatingLabelText="Last Name"
              name="lastName"
              type="lastName"
              hintText=""
              required
              style={{margin: '4%', marginBottom: '0%', width: '92%'}}
            />
            <TextField
              floatingLabelText="Email"
              name="email"
              type="email"
              hintText="jonnyappleseed@example.com"
              validations={{isEmail: null, isLength: {min: 3, max: 15}}}
              validationErrorText="Sorry, please enter a valid email."
              required
              style={{margin: '4%', marginBottom: '0%', width: '92%'}}
            />
            <TextField
              floatingLabelText="Password"
              name="password"
              type="password"
              validations={{isLength: {min: 8, max: 64}}}
              validationErrorText="Sorry, password must be min. 8 characters."
              required
              style={{margin: '4%', marginBottom: '0%', width: '92%'}}
            />
            <Button type="submit" snackStyle="primary" style={{margin: '4%', width: '92%'}} > 
              Submit 
            </Button>
          </Form>
        </div>
      //</div>
    )
  }
}

export default App;
