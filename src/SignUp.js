import React, { Component } from 'react';
import { Button, Form, TextField } from 'ic-snacks';
import background from './images/background.svg';
import './App.css';
import { withRouter } from "react-router-dom";
import {DynamoDB} from "aws-sdk/index";

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

class SignUp extends Component {
  state = {
    serverErrors: null
  }

  handleFormSubmit = (model) => {

    // Get the dynamoDB database
    var dynamodb;
    if(process.env.NODE_ENV === 'development'){
        dynamodb = require('./components/db').db;
    } else {
        dynamodb = new DynamoDB({
            region: "us-west-1",
            credentials: {
                accessKeyId: process.env.REACT_APP_DB_accessKeyId,
                secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
        });
    }

    // Get poolData
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

        var params = {
          Item: {
            "userid": {
              S: (+new Date).toString(36)
            },
           "username": {
            S: model.email
           }, 
           "firstName": {
             S: model.firstName
            }, 
           "lastName": {
             S: model.lastName
            }
          }, 
          ReturnConsumedCapacity: "TOTAL", 
          TableName: "user"
        };

        dynamodb.putItem(params, function(err, data) {
          if (err) {
            alert(err.message || JSON.stringify(err));
          } else {
            console.log(data);

            nestedProp.history.push({
              pathname: '/confirm',
              search: '?email='+model.email,
              state: {password: model.password}
            })
          }
        });
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
