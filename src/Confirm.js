import React, { Component } from 'react';
import { Button, Form, TextField } from 'ic-snacks';
import background from './images/background.svg';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import { withRouter } from "react-router-dom";

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var email
var cognitoUser

class Confirm extends Component {

  constructor(props) {
    super(props);

    const queryParams = new URLSearchParams(this.props.location.search);
    email = queryParams.get('email')

    var poolData;
    if(process.env.NODE_ENV === 'development'){
        poolData = require('./poolData').poolData;
    } else {
      var poolData = {
        UserPoolId : process.env.REACT_APP_Auth_UserPoolId,
        ClientId : process.env.REACT_APP_Auth_ClientId
      };
    }

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

    // Necessary becuase the closure has no access to this.props
    let nestedProp = this.props;

    cognitoUser.confirmRegistration(model.confcode, true, function(err, result) {

      if (err) {
          alert(err.message);
          return;
      }

      alert("Confirmed user")
      
      if(nestedProp.location.state.password) {

        var authenticationData = {
          Username : email,
          Password : nestedProp.location.state.password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              console.log('access token + ' + result.getAccessToken().getJwtToken());

              // Should be home page which then checks if user is logged in
              nestedProp.history.push('/home')
          },

          onFailure: function(err) {
              alert(err.message);
          },

        });

      } else {
        nestedProp.history.push('/login')
      }
      
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
        backgroundRepeat: 'repeat', 
        backgroundColor: 'red', 
        display: 'flex', 
        alignItems: 'center' 
      }} >

        <div style={{
          margin: 'auto',
          backgroundColor: 'white', 
          borderRadius: '10px',
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
