import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";
import Modal from "react-modal";
import Radium from 'radium'
import {Button, Form, TextField} from 'ic-snacks';


class Footer extends Component {
  constructor(){
    super();
  }


  render() {
    const divStyle={
      paddingTop: "10px",
      backgroundColor: 'white',
      bottom: 0,
      width: "100%",
      color: "#D30707", //change to header grey
      textAlign: 'center',

    };

    const Links={
      color: "#D30707",
    }

    const Spacing={
      paddingTop: "15px",
      paddingBottom: "10px",
    }




    return (
      <div style={divStyle}>

        <div>
            <Link to={"./AboutUs"} style={Links}>About Us</Link> &nbsp;&nbsp;&nbsp;&nbsp;

            <a onClick={this.openModal} style={Links}>Contact Us</a> &nbsp;&nbsp;&nbsp;&nbsp;

            <Link to={"./Locations"} style={Links}>Locations</Link> &nbsp;&nbsp;&nbsp;&nbsp;

            <Link to={"./Privacy"} style={Links}>Privacy</Link> &nbsp;&nbsp;&nbsp;&nbsp;

            <Link to={"./Terms"} style={Links}>Terms</Link> &nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div style={Spacing}>
          Copyright © 2018 WeMart Inc.
        </div>


      </div>
    );
  }
}

export default withRouter(Footer);
