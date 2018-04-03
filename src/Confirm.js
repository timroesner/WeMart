import React, { Component } from 'react';
import { Button, Form, TextField } from 'ic-snacks';
import background from './images/background.svg';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import { withRouter } from "react-router-dom";

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var email = ""
var cognitoUser

class Confirm extends Component {

  constructor(props) {
    super(props);

    const queryParams = new URLSearchParams(this.props.location.search);
    email = queryParams.get('email')

    var poolData = {
        UserPoolId : 'us-west-2_e6QP6fklc',
        ClientId : '2eoha404fgulrmtqc0ac4pmde5'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
        Username : email,
        Pool : userPool
    };

    cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  }

  state = {
    serverErrors: null
  }

  handleFormSubmit = (model) => {

    // cognitoUser.deleteUser(function(err, result) {
    //     if (err) {
    //         alert(err.message);
    //         return;
    //     }

    //     if (result) {
    //       alert(result.message)
    //     } else {
    //       alert("Success")
    //     }
    // });

    cognitoUser.confirmRegistration(model.confcode, true, function(err, result) {

      if (err) {
          alert(err.message);
          return;
      }

      alert("Confirmed user")
      // Ideally we will then log in and redirect to home page
      
    });
  }

  handleClickOnResend = (e) => {
    e.preventDefault();

    cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
            alert(err.message);
            return;
        }

        alert("Resend confirmation code")
    });
  };

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
            <p style={{margin: '6%', width: '88%', marginBottom: '0%', textAlign: 'center', fontSize: '12px'}}>
              We send the confirmation code to {email}. Please check your spam folder. 
              If you did not receive anyhthing we can <a href="#" onClick={this.handleClickOnResend}>resend the code</a>.
            </p>
            <TextField
              floatingLabelText="Confirmation Code"
              name="confcode"
              type="confcode"
              hintText=""
              required
              style={txtStyle}
            />
            <button class="primary" type="submit" style={{margin: '6% 15% 3% 15%', width: '70%', height:'2.2em'}} > 
              Submit 
            </button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(Confirm);
