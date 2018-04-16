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
import Header from "./components/header";
import { withRouter } from "react-router-dom";
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {DynamoDB} from "aws-sdk/index";
import NewCardForm from "./components/NewCardForm";

let newAddressStyle = {textAlign: "center", fontSize: "1.6rem", paddingBottom: ".6rem", paddingTop: ".6rem"};
let stripeAPIKey = 'pk_test_ccBJoXsCQn6kn5dkF098Xywl'; //TODO change this to our API key

//STYLES
const noSession = {textAlign:'center', marginBottom: '2rem'};
const noSessionButton = {margin: '2rem'};
const accountSettings = {fontFamily:'"Open Sans", "Helvetica Neue", Helvetica, sans-serif', maxWidth:'109.2rem',
height:'auto !important', margin:'3rem auto'};
var dynamodb;
const modalButton_Accept = {margin:'1.8rem 0 1rem 1rem', paddingRight:'3rem', paddingLeft:'3rem'}
const modalButton_Cancel = {margin:'1.8rem 1rem 1rem 0', paddingRight:'2rem', paddingLeft:'2rem'}

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
        var poolData;
        if(process.env.NODE_ENV === 'development'){
            poolData =require('./poolData').poolData;
        } else{
            poolData = {
                UserPoolId : process.env.REACT_APP_Auth_UserPoolId,
                ClientId : process.env.REACT_APP_Auth_ClientId
            }
        }
        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        this.state = {
            //Input Validators
            emailInput: null,
            passwordInput: null,
            isPasswordValid: true,

            emailModal: false,
            passwordModal: false,
            personalInfoModal: false,
            editAddressModal: false,
            newAddressModal: false,
            cognitoUser: cognitoUser,
            isLoggedIn: false,
            // For testing purposes only
            // TODO get data from AWS once API is complete
            user: {
                userId: '',
                email: '',
                password: "●●●●●●●●", // For demo purposes only
                phoneNumber: null,
                firstName: '',
                lastName: '',
                paymentMethods: [{id: "card_1", brand: "Visa", last4: "4242", label: "Visa 4242" , isDefault: true}],
                deliveryAddresses: [{id:1, street: "1 Washington Square", city: "San Jose", state: "CA", zipCode: 95112,
                    instructions: "Да"}],
                orderHistory: []},
        };

        //If there is a cognito user then get his data from the DB otherwise do nothing
        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }
            });
            // Necessary becuase the closure has no access to this.state
            let self = this;
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    alert(err);
                    //TODO remove these alerts
                    return;
                }
                self.setState({isLoggedIn: true})
                console.log(result) //Logs user attributes
                result.forEach((attribute) => {
                    if(attribute.Name === 'email'){
                        self.setState({user: {...self.state.user , email: attribute.Value}}) // set the email
                        self.setState({user: {...self.state.user , userId: attribute.Value}}) //set the userId
                    }
                })
                self.getUserDetails()
            });
        }
    }

    getUserDetails(){
        // Get the dynamoDB database

        if(process.env.NODE_ENV === 'development'){
            dynamodb = require('./db').db;
        }else{
            dynamodb = new DynamoDB({
                region: "us-west-1",
                credentials: {
                    accessKeyId: process.env.REACT_APP_DB_accessKeyId,
                    secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
            });
        }
        // Get the user based on their userId from the user table
        var userParams = {
            Key: {
                'userid': {S: this.state.user.userId}
            },
            TableName: "user"
        };
        // Scan the DB and get the user
        dynamodb.getItem(userParams, (err, data) => {
            if(err) {console.log(err, err.stack)}
            else{
                let firstName = data.Item.firstName.S;
                let lastName = data.Item.lastName.S;
                let phone = data.Item.phone.N;
                this.setState({
                    user: {...this.state.user, firstName: firstName, lastName:lastName, phoneNumber:phone}
                })
                console.log(data)
            }
        })
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
        var email = model.newEmail;
        this.state.cognitoUser.changePassword(model.password ,model.password,(err,data)=>{
            if(err){console.log(err, err.stack); this.setState({isPasswordValid:false})}
            else{
                console.log(data)
                var userAttributes = {
                    Name:'email',
                    Value: email
                }
                var attribues = CognitoUserAttribute(userAttributes);
                this.state.cognitoUser.updateAttributes(attribues,(err, data)=>{if(err) console.log(err, err.stack)
                else{
                    console.log(data)
                    console.log(model)
                    var params = {
                        ExpressionAttributeNames: {
                            "#UI": "userid",
                            "#UN": "username",
                        },
                        ExpressionAttributeValues: {
                            ":i": {
                                S: email
                            },
                            ":n": {
                                S: email
                            },
                        },
                        Key: {
                            'userid': {S: this.state.userId}
                        },
                        TableName: 'user',
                        ReturnValues: "ALL_NEW",
                        UpdateExpression: 'SET #UI = :i, #UN = :n',
                    }

                    // Scan the DB and get the user
                    dynamodb.updateItem(params, (err, data) => {
                        if(err) {console.log(err, err.stack)}
                        else{
                            let firstName = data.Item.firstName.S;
                            let lastName = data.Item.lastName.S;
                            let phone = data.Item.phone.N;
                            this.setState({
                                user: {...this.state.user, firstName: firstName, lastName:lastName, phoneNumber:phone}
                            })
                            console.log(data)
                        }
                    })
                }})
                this.setState(prevState => ({
                    user: {...prevState.user, email: model.newEmail, userId:email}
                }));
                this.handleClose();
            }
        }
        )
        console.log(model.newEmail)
    };

    handlePasswordChange = (model) => {
        this.state.cognitoUser.changePassword(model.password ,model.newPassword,(err,data)=>{
            if(err){console.log(err, err.stack); this.setState({isPasswordValid:false})}
            else{this.handleClose();}}
            )
        console.log(model)
    };

    handlePersonalInfoChange = (model) => {

        var params = {
            ExpressionAttributeNames: {
                "#FN": "firstName",
                "#LN": "lastName",
                "#PN": 'phone',
            },
            ExpressionAttributeValues: {
                ":f": {
                    S: model.first_name
                },
                ":l": {
                    S: model.last_name
                },
                ":p": {
                    N: model.phone
                }
            },
            Key: {
                'userid': {S: this.state.user.userId}
            },
            TableName: "user",
            ReturnValues: "ALL_NEW",
            UpdateExpression: 'SET #FN = :f, #LN = :l, #PN = :p',
        }

        dynamodb.updateItem(params, (err, data) => {
            if(err) console.log(err, err.stack);
            else {
                console.log(data)
            }
        })
        this.setState({
            user: {...this.state.user, firstName:model.first_name, lastName:model.last_name, phoneNumber:model.phone}
        })
        this.handleClose();
        console.log(model)
    };

    handleNewAddress = (model) => {
        let id = this.state.user.deliveryAddresses.length + 2;
        this.setState({
            user: {...this.state.user, deliveryAddresses: [...this.state.user.deliveryAddresses, {
                street:model.addressLine1, city:model.city, zipCode:model.zipCode, state:model.state, id:id
                }]}
        })
        this.handleClose()
      console.log(this.state.user.deliveryAddresses)
    };

    handleEditAddress = (model, address) => {
        console.log('address:', address)
        console.log('model', model)
        let addresses = this.state.user.deliveryAddresses
        let item = {city:model.city, street:model.addressLine1, state:model.state, zipCode:model.zipCode, id:address.id}
        for(var i = 0; i < addresses.length; i++){
            if(addresses[i].id === address.id){
                console.log('found ')
                addresses[i] = item;
            }
        }

        // item = {street:model.addressLine1, city:'city', zipCode:92222, state:'CA', id:item.id}

        // this.setState({
        //     user: {...this.state.user, delli}
        // })
        this.handleClose()
        console.log(model)
    };

    // Renders a list of all the delivery addresses.
    renderAddress(){
        if(this.state.user.deliveryAddresses){
            let delivAddress = this.state.user.deliveryAddresses[0];
            return <div>
                {this.state.user.deliveryAddresses.map((address) =>
                <AddressCard key={address.id} street={address.street} city={address.city} state={address.state} zipCode={address.zipCode}
                             onClick={() => {this.handleEditAddressModal(); delivAddress=address}}/>
                )}
                {this.editAddressModal(delivAddress)}
            </div>
        } else {
            return(
                <div><h4>No delivery addresses add one below</h4></div>
            )
        }
    }

    // Renders a list of all the credit cards.
    renderCards(){
        return this.state.user.paymentMethods.map((card) =>
            <CreditCard
                key={card.id}
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
                            <div  style={{display:'inline-block', marginTop:'1.5rem', marginBottom:'1.5rem', marginRight:'1rem'}}>
                                <TextField
                                    name="city"
                                    type="text"
                                    floatingLabelText="City"
                                    hintText="Enter Your City"
                                    halfWidth
                                    required
                                />
                            </div>
                            <div style={{display:'inline-block', marginTop:'1.5rem', marginBottom:'1.5rem', marginRight:'1rem'}}>
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
                            <div  style={{display:'inline-block', marginTop:'1.5rem', marginBottom:'1.5rem', marginRight:'1rem'}}>
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
                            <Button style={modalButton_Cancel} snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button style={modalButton_Accept} type="submit">Accept</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

    editAddressModal(address){
        console.log(address)
        return(
            <div>
                <Modal show={this.state.editAddressModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <h1>Edit Address</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(model)=>{this.handleEditAddress(model,address)}}>
                            <div>
                                <TextField
                                    name="addressLine1"
                                    type="text"
                                    floatingLabelText="Address"
                                    hintText="Enter Your Address"
                                    defaultValue={address.street}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div style={{display:'inline-block', marginTop:'1.5rem', marginBottom:'1.5rem', marginRight:'1rem'}}>
                                <TextField
                                    name="city"
                                    type="text"
                                    floatingLabelText="City"
                                    hintText="Enter Your City"
                                    defaultValue={address.city}
                                    halfWidth
                                    required
                                />
                            </div>
                            <div style={{display:'inline-block', marginTop:'1.5rem', marginBottom:'1.5rem', marginRight:'1rem'}}>
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
                            <div style={{display:'inline-block', marginTop:'1.5rem', marginBottom:'1.5rem', marginRight:'1rem'}}>
                                <TextField
                                    name="zipCode"
                                    type="text"
                                    floatingLabelText="Zip Code"
                                    hintText="Enter Your Zip Code"
                                    defaultValue={address.zipCode}
                                    halfWidth
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="instructions"
                                    placeholder="Delivery Instructions"
                                    defaultValue={address.instructions}
                                    rows= "5"
                                    wrap="soft"
                                    style={{height: "10rem", width: "100%", resize: "none"}}
                                />
                            </div>
                            <Button style={modalButton_Cancel} snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button style={modalButton_Accept} type="submit">Accept</Button>
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
                            <Button style={modalButton_Cancel} snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button style={modalButton_Accept} type="submit">Accept</Button>
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
                                    onChange={(model)=>{this.setState({passwordInput: model.target.value})}}
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <TextField
                                    name="newPasswordConfirm"
                                    type="password"
                                    floatingLabelText="New Password Confirm"
                                    hintText="Enter New Password again"
                                    validations={{isLength: {min: 6}, equals: this.state.passwordInput}}
                                    validationErrorText="Passwords do not match"
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
                                    validationErrorText="Incorrect Password"
                                    fullWidth
                                    required
                                    serverError='Incorrect Password'
                                    isValid={this.state.isPasswordValid}
                                />
                            </div>
                            <Button style={modalButton_Cancel} snacksStyle="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button style={modalButton_Accept} type="submit">Accept</Button>
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
                    <Modal.Body >
                        <Form onSubmit={this.handleEmailChange} >
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
                            <div>
                                <Button snacksStyle="secondary" style={modalButton_Cancel} onClick={this.handleClose}>Cancel</Button>
                                <Button type="submit" style={modalButton_Accept}>Accept</Button>
                            </div>
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
                                <NewCardForm onSubmit={()=>{
                                    this.handleClose();
                                    this.setState({
                                        user: {...this.state.user, paymentMethods: [...this.state.user.paymentMethods,
                                                {id: "card_2", brand: "Visa", last4: "4241", label: "Visa 4241" , isDefault: false
                                            }]}
                                    })
                                }}/>
                            </Elements>
                        </StripeProvider>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={modalButton_Cancel} snacksStyle="secondary" onClick={this.handleClose} >Cancel</Button>
                        <Button style={modalButton_Accept} elementAttributes={{form:"newcard"}} type="submit">Add Card</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    render(){
        if(this.state.isLoggedIn){
            return (
                <StyleRoot>
                    <Header/>
                    <div style={accountSettings}>
                        <h1 style={{textAlign:'center', padding:'1.5rem' ,fontFamily:' "Open Sans", "Helvetica Neue", Helvetica, sans-serif'}}>Account Settings</h1>
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
                            </Column>
                            <Column sizes={{ sm: 6, md: 3, lg: 3, xl: 3 }}>
                                <ProfilePanel title="Payment Methods">
                                    <ul style={{listStyleType: "none", padding:'1.5rem'}}>
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
                </StyleRoot>
            );
        } else {
            return(
                //TODO implement react-router-dom
                <div>
                    <Header/>
                    <div style={accountSettings}>
                        <h2>Account Settings</h2>
                        <ProfilePanel title='Account Settings'>
                            <div style={noSession}>
                                <h2>
                                    You must be logged in to view account settings.
                                </h2>
                                <h4>Please <Link href='/login'>Log In</Link> or <Link href='/signup'>Sign Up</Link></h4>
                            </div>
                            <div style={{margin:'2rem auto', textAlign:'center'}}>
                                <Button size='large' onClick={()=>{this.props.history.push('/home')}}>Browse Store</Button>
                            </div>
                        </ProfilePanel>
                    </div>
                </div>
            );
        }

    }
}

export default withRouter(AccountSettings);