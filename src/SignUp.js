import React, { Component } from 'react';
import { Button, Form, TextField } from 'ic-snacks';
import background from './images/background.svg';
import './App.css';
import { withRouter } from "react-router-dom";

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

class SignUp extends Component {
  state = {
    serverErrors: null
  }

  handleFormSubmit = (model) => {

    var poolData = {
        UserPoolId : process.env.Auth_UserPoolId,
        ClientId : process.env.Auth_ClientId
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : model.email
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    // Necessary becuase the closure has no access to this.props
    let nestedProp = this.props;

    userPool.signUp(model.email, model.password, attributeList, null, function(err, result) {
        if (err) {
            alert(err.message);
            return;
        }

        nestedProp.history.push({
          pathname: '/confirm',
          search: '?email='+model.email
        })
    });
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
              floatingLabelText="First Name"
              name="firstName"
              type="firstName"
              hintText=""
              required
              style={txtStyle}
            />
            <TextField
              floatingLabelText="Last Name"
              name="lastName"
              type="lastName"
              hintText=""
              required
              style={txtStyle}
            />
            <TextField
              floatingLabelText="Email"
              name="email"
              type="email"
              hintText="johnappleseed@me.com"
              validations={{isEmail: null, isLength: {min: 3, max: 30}}}
              validationErrorText="Sorry, please enter a valid email."
              required
              style={txtStyle}
            />
            <TextField
              floatingLabelText="Password"
              name="password"
              type="password"
              hintText="min. 8 characters"
              validations={{isLength: {min: 8, max: 64}}}
              validationErrorText="Sorry, password must be min. 8 characters."
              required
              style={txtStyle}
            />
            <button class="primary" type="submit" style={{margin: '6% 15% 3% 15%', width: '70%', height:'2.2em'}} > 
              Sign Up 
            </button>
          </Form>
          <p style={{
              fontSize: '0.7em',
              textAlign: 'center',
              width: '100%',
              color: '#696969',
            }}> Already have an Account? <a href="/login">Log In</a></p>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp);
