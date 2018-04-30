import React, { Component } from 'react';
import { Form, TextField } from 'ic-snacks';
import background from './images/background.svg';
import './App.css';
import { withRouter } from "react-router-dom";
import {DynamoDB} from "aws-sdk/index";
import wemartLogo from './images/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AWS from 'aws-sdk'

const logo = {maxWidth:'200px', padding:'1.5rem'}
const greeting = {margin:'2.5rem auto', textAlign:'center'}
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

class SignUp extends Component {
  state = {
    serverErrors: null
  }

  handleFormSubmit = (model) => {

    // Get the dynamoDB database
    var dynamodb;
    if(process.env.NODE_ENV === 'development'){
        dynamodb = require('./db').db;
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
        poolData = {
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
    let self = this

    userPool.signUp(model.email, model.password, attributeList, null, function(err, result) {
        if (err) {
          toast.warn(err.message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
            return;
        }

        var params = {
          Item: {
            "userid": {
              S: model.email
            },
           "username": {
            S: model.email
           },
           "firstName": {
             S: model.firstName
            },
           "lastName": {
             S: model.lastName
            },
          }, 
          ReturnConsumedCapacity: "TOTAL", 
          TableName: "user"
        };

        dynamodb.putItem(params, function(err, data) {
          if (err) {
            alert(err.message || JSON.stringify(err));
          } else {
            self.createStripeCustomer(model.email)
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

  createStripeCustomer(email){
    var lambda;
    if(process.env.NODE_ENV === 'development'){
        lambda = new AWS.Lambda(require('./db').lambda)
    } else {
      lambda = new AWS.Lambda({
        region: "us-west-1",
        credentials: {
            accessKeyId: process.env.REACT_APP_DB_accessKeyId,
            secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
    });
    }
    var payLoad = {
      "email" : email
    };

    var params = {
      FunctionName: 'createCustomer', 
      Payload: JSON.stringify(payLoad)
    };
  
    lambda.invoke(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }

  render() {
    const txtStyle = {
      margin: '6% 6% 0% 6%',
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
            <div style={greeting}>
                <img src={wemartLogo} style={logo} alt={'logo'}/>
                <h3 style={{margin:'1rem 2rem'}}>We're available in your area</h3>
                <h5>Sign up to get started</h5>
            </div>
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
        <ToastContainer
          position="top-center"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
        />
      </div>
    )
  }
}

export default withRouter(SignUp);
