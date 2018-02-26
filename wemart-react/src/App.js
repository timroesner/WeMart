import React, { Component } from 'react';
import { Button, TextField } from 'ic-snacks';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{width: '335px', marginLeft: '20%', marginTop: '5%'}}>
        <div style={{marginBottom: '10px'}}>
        <TextField
          style={{marginRight: '5px'}}
          name="first_name"
          type="text"
          floatingLabelText="First Name"
          halfWidth
          required
        />
        <TextField
          style={{marginLeft: '5px'}}
          name="last_name"
          type="text"
          floatingLabelText="Last Name"
          halfWidth
          required
        />
        </div>
        <div style={{marginBottom: '10px'}}>
        <TextField
          name="email"
          type="email"
          floatingLabelText="Email"
          hintText="Enter your email address"
          validations={{isEmail: null, isLength: {min: 3, max: 15}}}
          validationErrorText="Please enter a valid email"
          fullWidth
          required
        />
        </div>

      <div>
        <TextField
          name="password"
          type="password"
          floatingLabelText="Password"
          hintText="Enter a secure password"
          validations={{isLength: {min: 6}}}
          validationErrorText="Password must be at least 6 characters"
          fullWidth
          required
        />
      </div>
      </div>
    );
  }
}

export default App;
