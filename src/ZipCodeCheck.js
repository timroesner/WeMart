import React, { Component } from 'react';
import { Form, TextField } from 'ic-snacks';
import background from './images/background.svg';
import './App.css';
import { withRouter } from "react-router-dom";
import wemartLogo from './images/logo.png'

const logo = {maxWidth:'20rem'}
const greeting = {margin:'2.5rem auto', textAlign:'center'}

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
            <img src={wemartLogo} style={logo}/>
            <h3 style={{margin:'1rem 2rem'}}>Groceries delivered to your door</h3>
                <h5>Enter your zip code below to continue</h5>
            </div>
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
