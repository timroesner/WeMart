import React, { Component } from 'react';
import { Button, Form, TextField } from 'ic-snacks';
import background from './images/background.svg';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import { withRouter } from "react-router-dom";

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var AWS = require('aws-sdk')

class ZipCodeCheck extends Component {
  state = {
    serverErrors: null
  }

  handleFormSubmit = (model) => {
    if(model.zip > 90000 && model.zip < 96163) {
      this.props.history.push('/home')
    } else {
      alert('Sorry, we are only in California as of now.')
    }
  }

  render() {
    const txtStyle = {
      margin: '6%', 
      marginBottom: '0%', 
      width: '88%'
    }

    return (
      <div style={{ 
        height: window.innerHeight+'px', 
        overflow: 'auto',  
        backgroundImage: `url(${background})`, 
        backgroundRepeat: 'repeate', 
        backgroundColor: 'red', 
        display: 'flex', 
        alignItems: 'center' 
      }} >

        <div style={{
          margin: 'auto',
          backgroundColor: 'white', 
          borderRadius: '15px',
          maxWidth: `${0.5*window.innerWidth}px`,
          minWidth: '250px'
        }} >

          <Form
            onSubmit={this.handleFormSubmit}
            serverErrors={this.state.serverErrors}
            formProps={{}}
          >
            <TextField
              floatingLabelText="ZIP Code"
              name="zip"
              type="zip"
              hintText=""
              validations={{isLength: {min: 5, max: 5}}}
              validationErrorText="Sorry, please enter a valid ZIP code."
              required
              style={txtStyle}
            />
            <button class="primary" type="submit" style={{margin: '6% 15% 3% 15%', width: '70%', height:'2.2em'}} > 
              Submit 
            </button>
          </Form>
          <p style={{
              fontSize: '0.7em',
              textAlign: 'center',
              width: '100%',
              color: '#696969',
          }}> 
            Already have an Account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(ZipCodeCheck);
