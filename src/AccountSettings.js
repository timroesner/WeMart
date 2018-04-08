import React from 'react';
import './stylesheets/AccountSettings.css';
import {StyleRoot} from "radium";
import {Button, Column, Form, Icon, Link, MenuItem, Row, Select, TextField} from "ic-snacks";
import AddressCard from "./components/AddressCard";
import ProfilePanel from "./components/ProfilePanel";
import Line from "./components/Line";
import {Modal} from "react-bootstrap";
import CreditCard from "./components/CreditCard";
import {Elements, StripeProvider} from "react-stripe-elements";
import {NewCardForm} from "./components/NewCardForm";
import Header from "./components/header";
import { withRouter } from "react-router-dom";
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

let newAddressStyle = {textAlign: "center", fontSize: "1.6rem", paddingBottom: ".6rem", paddingTop: ".6rem"};
let stripeAPIKey = 'pk_test_ccBJoXsCQn6kn5dkF098Xywl'; //TODO change this to our API key
let cognitoUser = null;

//STYLES
const noSession = {textAlign:'center', marginBottom: '2rem'};
const noSessionButton = {marginLeft: '40%', marginRight:'40%', textAlign:'center', marginBottom:'3rem'};
const accountSettings = {fontFamily:'"Open Sans", "Helvetica Neue", Helvetica, sans-serif', maxWidth:'109.2rem',
height:'auto !important', margin:'auto'};
const h4 = {fontSize:'1.8rem'};

class AccountSettings extends React.Component{

    constructor(props, context) {
        super(props, context);

        this.handleShowEmailModal = this.handleShowEmailModal.bind(this);
        this.handleShowPasswordModal = this.handleShowPasswordModal.bind(this);
        this.handleShowPersonalInfoModal = this.handleShowPersonalInfoModal.bind(this);
        this.handleEditAddressModal = this.handleEditAddressModal.bind(this);
        this.handleNewAddressModal = this.handleNewAddressModal.bind(this);
        this.handleClose = this.handleClose.bind(this);

        // Check if there is an existing cognito session open
        var loggedIn = false;
        var poolData = {
            UserPoolId : 'us-west-2_e6QP6fklc',
            ClientId : '2eoha404fgulrmtqc0ac4pmde5'
        };
        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                loggedIn = session.isValid();
            });
        }


        this.state = {
            //Input Validators
            emailInput: null,

            emailModal: false,
            passwordModal: false,
            personalInfoModal: false,
            editAddressModal: false,
            newAddressModal: false,
            cognitoUser: cognitoUser,
            isLogedIn: loggedIn,
            // For testing purposes only
            // TODO get data from AWS once API is complete
            user: {
                email: 'JohnDoe@gmail.com',
                password: "●●●●●●", // For demo purposes only
                phoneNumber: 555555555,
                firstName: "John",
                lastName: "Doe",
                paymentMethods: [{id: "card_1", brand: "Visa", last4: "4242", label: "Visa 4242" , isDefault: true}],
                deliveryAddresses: [{id: "1", street: "1 Washington Square", city: "San Jose", state: "CA", zipCode: 95112,
                    instructions: "Как Деля"}],
                orderHistory: []},
            userAttributes: {email: ''},
        };
        var emails = this.state.user.email;
        cognitoUser.getUserAttributes(function(err, result) {
            if (err) {
                alert(err);
                return;
            }
            for (var i = 0; i < result.length; i++) {
                var attribute = result[i].getName();
                console.log(attribute);
                var value = result[i].getValue();
                if(attribute === 'email'){
                    emails = value;
                    console.log(emails)
                }
            }
        });
    }

    // This should Close all modals
    handleClose() {
        this.setState({
            emailModal: false,
            passwordModal: false,
            personalInfoModal: false,
            editAddressModal: false,
            newAddressModal: false,
            newCardModal: false,
        });
    }

    handleShowEmailModal() {
        this.setState({ emailModal: true });
    }

    handleShowPasswordModal(){
        this.setState({passwordModal: true})
    }

    handleShowPersonalInfoModal(){
        this.setState({personalInfoModal: true})
    }

    handleEditAddressModal(){
        this.setState({editAddressModal: true})
    }

    handleNewAddressModal(){
        this.setState({newAddressModal: true})
    }

    handleNewCardModal(){
        this.setState({newCardModal: true})
    }

    handleEmailChange = (model) => {
        //TODO validate password
        this.setState(prevState => ({
            user: [...prevState.user, {email: model.newEmail}]
        }));
        console.log(model.newEmail)
    };

    handlePasswordChange = (model) => {
        console.log(model)
    };

    handlePersonalInfoChange = (model) => {
        console.log(model)
    };

    handleNewAddress = (model) => {
      console.log(model)
    };

    handleEditAddress = (model) => {
        console.log(model)
    };

    // Renders a list of all the delivery addresses.
    renderAddress(){
        return this.state.user.deliveryAddresses.map((address) =>
                <AddressCard street={address.street} city={address.city} state={address.state} zipCode={address.zipCode}
                onClick={() => {this.handleEditAddressModal(); this.setState({selectedAddressID: address})}}/>
        );
    }

    // Renders a list of all the credit cards.
    renderCards(){
        return this.state.user.paymentMethods.map((card) =>
            <CreditCard
                brand={card.brand}
                label={card.label}
                last4={card.last4}
                isDefault={card.isDefault}
            />)
    }

    newAddressModal(){
        return(
            <div>
                <Modal show={this.state.newAddressModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <h1>New Address</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleNewAddress}>
                            <div>
                                <TextField
                                    name="addressLine1"
                                    type="text"
                                    floatingLabelText="Address"
                                    hintText="Enter Your Address"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    name="city"
                                    type="text"
                                    floatingLabelText="City"
                                    hintText="Enter Your City"
                                    halfWidth
                                    required
                                />
                            </div>
                            <div>
                                <Select
                                    name="state"
                                    floatingLabelText="State"
                                    hintText="Select a State"
                                    halfWidth
                                    required
                                >
                                    <MenuItem label="California" value="CA"/>
                                </Select>
                            </div>
                            <div>
                                <TextField
                                    name="zipCode"
                                    type="text"
                                    floatingLabelText="Zip Code"
                                    hintText="Enter Your Zip Code"
                                    halfWidth
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="instructions"
                                    placeholder="Delivery Instructions"
                                    rows= "5"
                                    wrap="soft"
                                    style={{height: "10rem", width: "100%", resize: "none"}}
                                />
                            </div>
                            <Button snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button type="submit">Accept</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

    editAddressModal(){
        return(
            <div>
                <Modal show={this.state.editAddressModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <h1>Edit Address</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleEditAddress}>
                            <div>
                                <TextField
                                    name="addressLine1"
                                    type="text"
                                    floatingLabelText="Address"
                                    hintText="Enter Your Address"
                                    defaultValue={this.state.user.deliveryAddresses[0].street}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    name="city"
                                    type="text"
                                    floatingLabelText="City"
                                    hintText="Enter Your City"
                                    defaultValue={this.state.user.deliveryAddresses[0].city}
                                    halfWidth
                                    required
                                />
                            </div>
                            <div>
                                <Select
                                    name="state"
                                    floatingLabelText="State"
                                    hintText="Select a State"
                                    halfWidth
                                    defaultOption={{label: "California", value: "CA"}}
                                    required
                                >
                                    <MenuItem label="California" value="CA"/>
                                </Select>
                            </div>
                            <div>
                                <TextField
                                    name="zipCode"
                                    type="text"
                                    floatingLabelText="Zip Code"
                                    hintText="Enter Your Zip Code"
                                    defaultValue={this.state.user.deliveryAddresses[0].zipCode}
                                    halfWidth
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="instructions"
                                    placeholder="Delivery Instructions"
                                    defaultValue={this.state.user.deliveryAddresses[0].instructions}
                                    rows= "5"
                                    wrap="soft"
                                    style={{height: "10rem", width: "100%", resize: "none"}}
                                />
                            </div>
                            <Button snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button type="submit">Accept</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    editPerInfoModal(){
        return(
            <div>
                <Modal show={this.state.personalInfoModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <h1>Edit Personal Information</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handlePersonalInfoChange}>
                            <div style={{marginBottom: '10px'}}>
                            <TextField
                                style={{marginRight: '5px'}}
                                name="first_name"
                                type="text"
                                floatingLabelText="First Name"
                                defaultValue={this.state.user.firstName}
                                halfWidth
                                required
                            />
                            <TextField
                                style={{marginLeft: '5px'}}
                                name="last_name"
                                type="text"
                                floatingLabelText="Last Name"
                                defaultValue={this.state.user.lastName}
                                halfWidth
                                required
                            />
                            </div>
                            <div style={{marginBottom: "10px"}}>
                                <TextField
                                    name="phone"
                                    defaultValue={this.state.user.phoneNumber}
                                    floatingLabelText="Phone Number"
                                    fullWidth
                                    type="tel"
                                />
                            </div>
                            <Button snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button type="submit">Accept</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    passwordModal(){
        return(
            <div>
                <Modal show={this.state.passwordModal} onHide={this.handleClose} keyboard>
                    <Modal.Header>
                        <h1>Edit Account Information</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handlePasswordChange}>
                            <div style={{marginBottom: "1rem"}}>
                                <TextField
                                    name="newPassword"
                                    type="password"
                                    floatingLabelText="New Password"
                                    hintText="Enter New Password"
                                    validations={{isLength: {min: 6}}}
                                    validationErrorText="Password must be at least 6 characters"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <TextField
                                    name="newPasswordConfirm"
                                    type="password"
                                    floatingLabelText="New Password Confirm"
                                    hintText="Enter New Password again"
                                    validations={{isLength: {min: 6}}}
                                    validationErrorText="Password must be at least 6 characters"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <TextField
                                    name="password"
                                    type="password"
                                    floatingLabelText="Current Password"
                                    hintText="Enter Current Password"
                                    validations={{isLength: {min: 6}}}
                                    validationErrorText="Password must be at least 6 characters"
                                    fullWidth
                                    required
                                />
                            </div>
                            <Button snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button type="submit">Accept</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    emailModal(){
        return(
            <div>
                <Modal show={this.state.emailModal} onHide={this.handleClose} keyboard>
                    <Modal.Header>
                        <h1>
                            Edit Account Information
                        </h1>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleEmailChange}>
                            <div style={{marginBottom: "1rem"}}>
                                <TextField
                                    style={{marginRight: '5px'}}
                                    name="newEmail"
                                    type="email"
                                    floatingLabelText="New Email"
                                    hintText='Enter New Email Address'
                                    fullWidth
                                    required
                                    onChange={(model) => {this.setState({emailInput: model.target.value})}}
                                    validations={{isEmail: null}}
                                    validationErrorText='Please enter a valid email'
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <TextField
                                    style={{marginRight: '5px'}}
                                    name="newEmailConfirmation"
                                    type="email"
                                    floatingLabelText="New Email Confirmation"
                                    hintText='Enter Email Again To Confirm'
                                    fullWidth
                                    required
                                    validationErrorText='Emails do not match'
                                    validations={{equals: this.state.emailInput}}
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <TextField
                                    name="password"
                                    type="password"
                                    floatingLabelText="Current Password"
                                    hintText="Enter Current Password"
                                    validations={{isLength: {min: 6}}}
                                    validationErrorText="Password must be at least 6 characters"
                                    fullWidth
                                    required
                                />
                            </div>
                            <Button snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button type="submit">Accept</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    addCardModal(){
        return(
            <div>
                <Modal show={this.state.newCardModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <h1>Add Card</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <StripeProvider apiKey={stripeAPIKey}>
                            <Elements>
                                <NewCardForm user={this.state.user}/>
                            </Elements>
                        </StripeProvider>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button snacksStyle="secondary" onClick={this.handleClose} >Cancel</Button>
                        <Button elementAttributes={{form:"newCard"}} type="submit">Add Card</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    render(){
        if(this.state.isLogedIn){
            return (
                <StyleRoot>
                    <Header/>
                    <div style={accountSettings}>
                        <Row maxColumns={11} style={{maxWidth: "109.2rem"}}>
                            <Column sizes={{ sm: 6, md: 5, lg: 8, xl: 8}}>
                                <ProfilePanel title="Account Information" content={
                                    <div>
                                        <Line title="Email" value={this.state.user.email} onChange={this.handleShowEmailModal}/>
                                        <Line title="Password" value={this.state.user.password} onChange={this.handleShowPasswordModal}/>
                                    </div>}/>
                                <ProfilePanel title="Personal Information" content={
                                    <div>
                                        <Line title="First Name" value={this.state.user.firstName} onChange={this.handleShowPersonalInfoModal}/>
                                        <Line title="Last Name" value={this.state.user.lastName} onChange={this.handleShowPersonalInfoModal}/>
                                        <Line title="Phone" value={this.state.user.phoneNumber} onChange={this.handleShowPersonalInfoModal}/>
                                    </div>}/>
                                <ProfilePanel title="Delivery Addresses" content={
                                    <div>
                                        {this.renderAddress()}
                                        <div style={newAddressStyle}>
                                            <Link onClick={(e, props) => {
                                                e.preventDefault();
                                                this.handleNewAddressModal();
                                            }} style={{width: "100%"}}>
                                                <Icon name="plusBold"/> Add New Delivery Address
                                            </Link>
                                        </div>
                                    </div>}/>
                                <ProfilePanel title="Accessibility"/>
                            </Column>
                            <Column sizes={{ sm: 6, md: 3, lg: 3, xl: 3 }}>
                                <ProfilePanel title="Payment Methods">
                                    <ul style={{listStyleType: "none"}}>
                                        {this.renderCards()}
                                    </ul>
                                    <div style={newAddressStyle}>
                                        <Link onClick={(e, props) => {
                                            e.preventDefault();
                                            this.handleNewCardModal();
                                        }} style={{width: "100%"}}>
                                            <Icon name="plusBold"/> Add New Payment Method
                                        </Link>
                                    </div>
                                </ProfilePanel>
                            </Column>
                        </Row>
                    </div>
                    {this.emailModal()}
                    {this.passwordModal()}
                    {this.editPerInfoModal()}
                    {this.newAddressModal()}
                    {this.addCardModal()}
                    {this.editAddressModal()}
                </StyleRoot>
            );
        } else {
            return(
                //TODO implement react-router-dom
                <div>
                    <Header/>
                    <div style={accountSettings}>
                        <ProfilePanel title='Account Settings'>
                            <div style={noSession}>
                                <h2>
                                    You must be logged in to view account settings.
                                </h2>
                                <h4>Please <Link href='/login'>Log In</Link> or <Link href='/signup'>Sign Up</Link></h4>
                            </div>
                            <div>
                                <Button style={noSessionButton} size='large' href='/home'>Browse Store</Button>
                            </div>
                        </ProfilePanel>
                    </div>
                    {this.emailModal()}
                    {this.passwordModal()}
                    {this.editPerInfoModal()}
                    {this.newAddressModal()}
                    {this.addCardModal()}
                    {this.editAddressModal()}
                </div>
            );
        }

    }
}

export default withRouter(AccountSettings);