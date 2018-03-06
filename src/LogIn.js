import React, { Component } from 'react';
import { Button, Form, TextField } from 'ic-snacks';
import background from './background.svg';
import './App.css';
import registerServiceWorker from './registerServiceWorker';

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

class LogIn extends Component {
  state = {
    serverErrors: null
  }

  handleFormSubmit = (model) => {
    //alert(model.firstName+' '+model.lastName+' '+model.email+' '+model.password)

    var poolData = {
        UserPoolId : 'us-west-2_e6QP6fklc',
        ClientId : '2eoha404fgulrmtqc0ac4pmde5'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : model.email
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(model.email, model.password, attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        // redirect to page to enter verification code
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
              Log In 
            </button>
          </Form>
          <p style={{
              fontSize: '0.7em',
              textAlign: 'center',
              width: '100%',
              color: '#696969',
            }}> Already have an Account? <a href="#">Log In</a></p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<LogIn />, document.getElementById('login'));
registerServiceWorker();
