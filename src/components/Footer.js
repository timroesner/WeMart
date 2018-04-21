import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";
import Modal from "react-modal";
import Radium from 'radium';
import {Button, Form, TextField} from 'ic-snacks';


class Footer extends Component {
  constructor(){
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
      },

      overlay : {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: "1000",
      }
    };


    const textarea={
      base:{
        position: "relative",
        width: "100%",
        height: "100px",
        border: "1px solid #BDBDBD",
        borderRadius: "4px",
        resize: "none",
        ':focus': {
          border: "1px solid red",
          outline: "0",
        }
      }
    }

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
      cursor:'pointer',
    }

    const Spacing={
      paddingTop: "15px",
      paddingBottom: "10px",
    }




    return (
      <div style={divStyle}>

        <div>
            <Link to={"./AboutUs"} style={Links}>About Us</Link> &nbsp;&nbsp;&nbsp;&nbsp;

            <a onClick={this.openModal}  style={Links}>Contact Us</a> &nbsp;&nbsp;&nbsp;&nbsp;

            <Link to={"./Locations"} style={Links}>Locations</Link> &nbsp;&nbsp;&nbsp;&nbsp;

            <Link to={"./Privacy"} style={Links}>Privacy</Link> &nbsp;&nbsp;&nbsp;&nbsp;

            <Link to={"./Terms"} style={Links}>Terms</Link> &nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div style={Spacing}>
          Copyright © 2018 WeMart Inc.
        </div>

        <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}>

         <h2 ref={subtitle => this.subtitle = subtitle} style={{textAlign: 'center',}}>Email us</h2>

         <div style={{textAlign: 'center',}}>We'll get back to you in 2 working hours</div>


           <Form
             onSubmit={(model) => ( console.log(model) ) }
             serverErrors={{}}
             formProps={{}}>

            <div style={{marginBottom: '10px'}}>
              <TextField
                name="Subject"
                type="password"
                floatingLabelText="Subject"
                hintText="Enter the subject of your message"
                validations={{isSubject: null, isLength: {min: 3, max: 50}}}
                validationErrorText="Please enter a subject"
                fullWidth
                required
              />
            </div>

            <div style={{width: '335px'}}>
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
            </div>

            <div style={{width: '335px'}}>
              <div style={{marginBottom: '10px'}}>
                <label>Your Message</label>
                <textarea
                  className = "message"
                  placeholder="Please write your message"
                  onFocus={ () => console.log("clicked textarea") }
                  style={textarea.base}
                  required
                />
              </div>
            </div>

            <div style={{margin:"auto", width:"100%", paddingTop:"10px", display:"flex", justifyContent: "center", marginLeft:"0"}}>
              <div style={{ margin:"auto", display:"inline-block"}}>
                <Button   type="submit" className="primary" style={{height:"30px"}}>Submit</Button>
              </div>
              <div style={{ margin:"auto", display:"inline-block"}}>
                <Button onClick={this.closeModal} snacksStyle="secondary" style={{height:"30px"}}>Close</Button>
              </div>
            </div>

          </Form>
       </Modal>

      </div>
    );
  }
}

export default withRouter(Footer);
