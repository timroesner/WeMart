import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Radium from 'radium';
import {Button, Form, TextField} from 'ic-snacks';


class Footer extends Component {
  constructor(){
    super();

     this.handleShowContactUsModal = this.handleShowContactUsModal.bind(this);
     this.handleCloseContactUsModal = this.handleCloseContactUsModal.bind(this);

    this.state = {
      contactUsModal: true,
    };


  }

  handleShowContactUsModal() {
    this.setState({contactUsModal: true});
  }


  handleCloseContactUsModal() {
    this.setState({contactUsModal: false});
  }

  contactUsModal(){
    const textarea={
      base:{
        position: "relative",
        width: "100%",
        height: "100px",
        border: "1px solid #BDBDBD",
        borderRadius: "4px",
        resize: "none",
        ':focus': {
          border: "1px solid rgb(211, 7, 7)",
          outline: "0",
        }
      }
    }

    return(
      <div>
        <Modal show={this.state.contactUsModal} onHide={this.handleCloseContactUsModal}>
        <Modal.Header>
          <h1>Email Us</h1>
          <div>We'll get back to you in 2 working hours</div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(model) => ( console.log(model) ) } serverErrors={{}} formProps={{}}>

        <div style={{marginBottom: '10px'}}>
          <TextField
          name="Subject"
          floatingLabelText="Subject"
          hintText="Enter the subject of your message"
          validations={{isSubject: null, isLength: {min: 3, max: 50}}}
          validationErrorText="Please enter a subject"
          fullWidth
          required
          />
          </div>


                        <div style={{marginBottom: '10px'}}>
                          <TextField
                            name="email"
                            type="email"
                            floatingLabelText="Email"
                            hintText="Enter your email address"
                            validations={{isEmail: null, isLength: {min: 3, max: 50}}}
                            validationErrorText="Please enter a valid email"
                            fullWidth
                            required
                          />
                        </div>



                        <div style={{marginBottom: '10px'}}>
                          <label>Your Message</label>
                          <textarea
                            className = "message"
                            placeholder="Please write your message"
                            style={textarea.base}
                            required
                          ></textarea>
                        </div>

                      <div style={{margin:"auto", width:"100%", paddingTop:"10px", display:"flex", justifyContent: "center", marginLeft:"0"}}>
                        <div style={{ margin:"auto", display:"inline-block"}}>
                          <Button type="submit" className="primary" style={{height:"30px"}}>Submit</Button>
                        </div>
                        <div style={{ margin:"auto", display:"inline-block"}}>
                          <Button onClick={this.handleCloseContactUsModal} snacksStyle="secondary" style={{height:"30px"}}>Close</Button>
                        </div>
                      </div>

                    </Form>
                   </Modal.Body>
               </Modal>
           </div>
       );
   }




  render() {

    const Links={
      color: "#D30707",
      cursor:'pointer',
    }

    const Spacing={
      paddingTop: "15px",
      paddingBottom: "10px",
    }

    const footerStyle={
      paddingTop: "10px",
      backgroundColor: '#F5F5F5',
      width: "100%",
      color: "#D30707",
      textAlign: 'center',
      zIndex: "10",
    };

    const footerPosition ={
      position: "relative",
      bottom: "0",
      left: "0",
      width: "100%",
    };

      return (
        <div>
          <div style={footerPosition}>
            <div style={footerStyle}>
              <div style={{margin:"auto", textAlign:"center"}}>
                  <Link to={"./AboutUs"} style={Links}>About Us</Link>&nbsp;&nbsp;&nbsp;&nbsp;

                  <a onClick={this.handleShowContactUsModal}  style={Links}>Contact Us</a>&nbsp;&nbsp;&nbsp;&nbsp;

                  <Link to={"./Locations"} style={Links}>Locations</Link>&nbsp;&nbsp;&nbsp;&nbsp;

                  <Link to={"./Privacy"} style={Links}>Privacy</Link>&nbsp;&nbsp;&nbsp;&nbsp;

                  <Link to={"./Terms"} style={Links}>Terms</Link>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>

              <div style={Spacing}>
                Copyright © 2018 WeMart Inc.
              </div>

            </div>
          </div>
          {this.contactUsModal()}
          </div>
      );

  }
}

export default withRouter(Radium(Footer));
