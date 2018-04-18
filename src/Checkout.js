import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Header from "./components/header";
import {Button, Form, MenuItem, NavigationPills, Radio, RadioGroup, Select, TextField} from "ic-snacks";
import CheckoutPanel from "./components/CheckoutPanel";
import AddressCard from "./components/AddressCard";
import {StyleRoot} from "radium";
import CreditCard from "./components/CreditCard";
import OrderItems from "./components/OrderItems";
import {DynamoDB} from "aws-sdk/index";
import PropTypes from 'prop-types';
import NewCardForm from "./components/NewCardForm";
import {CognitoUserPool} from "amazon-cognito-identity-js";

var stripeAPIKey;
var dynamodb;
var poolData;
//STYLES
const checkout = {margin:' 1rem auto', maxWidth:'71rem',};
const checkoutForm = {width:'100%',overflow: 'hidden', borderTopLeftRadius:'.6rem',
    borderTopRightRadius:'.6rem'};
const validEntry = {margin:'1.5rem', fontWeight:'600',border:'1px solid red', padding:'1.5rem',borderRadius:'.6rem'}

export default class Checkout extends React.Component {

    constructor(){
        super();
        this.state = {
            //Stripe
            stripe: null,
            //Validators
            addressPanel: false,
            timePanel: false,
            paymentPanel: false,
            phonePanel: false,


            daySelected: false,
            userId: null,
            timeSelected: false,
            isGuest:true,
            cart: [],
            paymentMethod: null,
            deliveryFee: 3.99,
            serviceFee: 2.98,
            subtotal: 0,


            //Order Details
            deliveryAddress: null,
            deliveryTime: null,
            deliveryDay: null,
            phoneNumber: null,
            total:0,
            orderItems: [],
            token: null,
        }
        this.setKeys()
        this.getCognitoUser()
        this.getCartItems()
    }

    componentDidMount(){
        if (window.Stripe) {
            this.setState({stripe: window.Stripe(require('./stripeKey').stripeAPIKey)});
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                // Create Stripe instance once Stripe.js loads
                this.setState({stripe: window.Stripe(require('./stripeKey').stripeAPIKey)});
            });
        }
    }

    setKeys(){
        if(process.env.NODE_ENV === 'development'){
            stripeAPIKey = require('./stripeKey').stripeAPIKey;
            dynamodb = require('./db').db;
            poolData =require('./poolData').poolData;
        } else {
            stripeAPIKey = process.env.REACT_APP_Stripe_Pk
            dynamodb = new DynamoDB({
                region: "us-west-1",
                credentials: {
                    accessKeyId: process.env.REACT_APP_DB_accessKeyId,
                    secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
            });
            poolData = {
                UserPoolId : process.env.REACT_APP_Auth_UserPoolId,
                ClientId : process.env.REACT_APP_Auth_ClientId
            }
        }
    }

    getCartItems(){
        // Get the items from local storage
        if(localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            var arr = Object.keys(cart).map(function (key) { return cart[key]; });
            console.log('[local storage cart]',arr)
        }

        arr.forEach((item)=> {
            var itemParams  = {
                Key: {'itemid': {S:item.itemID.toString()}},
                TableName: 'item'
            }
            dynamodb.getItem(itemParams,(err, data)=>{
                if(err) console.log(err, err.stack)
                else {
                    let image = data.Item.image.S;
                    let itemid = (data.Item.itemid.S);
                    let price = (data.Item.price.N);
                    let sale = (data.Item.sale.N);
                    let testItem = {key: itemid, itemId:itemid, image: image, price: price, sale: sale};

                    console.log('[testItem]', testItem)

                    // Set the cart state. Used for fetching item images
                    this.setState({
                        cart: [...this.state.cart, {...testItem, quantity: item.quantityInCart}]
                    })
                    // Set the oder items. Used for sending it to the database
                    this.setState({
                        orderItems: [...this.state.orderItems, {'M': {'itemid':{'S':item.itemID}, 'quantity':{'N':item.quantityInCart.toString()}}}]
                    })
                    //TODO calculate using sale price
                    var itemTotalPrice = sale != 0 ? sale : price;
                    console.log('[item total price]', Number(itemTotalPrice))
                    this.setState({
                        subtotal: (this.state.subtotal + Number(itemTotalPrice))
                    })
                }
            })
        })
    }

    getCognitoUser(){
        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(JSON.stringify(err));
                    return;
                }
            });
            // Necessary becuase the closure has no access to this.state
            let self = this;
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    alert(JSON.stringify(err));
                    //TODO stringify these alerts
                    return;
                }
                self.setState({isGuest: false})

                result.forEach((attribute) => {
                    if(attribute.Name === 'email'){
                        self.setState({
                            // how are order going to be placed for a guest user with no userID?
                            userId: attribute.Value
                        })
                        self.getUserDetails(attribute.Value)
                    }
                })
            });
        }
    }

    getUserDetails(userId){
        // Get the user based on their userId from the user table
        var userParams = {
            Key: {
                'userid': {S: userId}
            },
            TableName: "user"
        };
        // Scan the DB and get the user
        dynamodb.getItem(userParams, (err, data) => {
            if(err) {console.log(err, err.stack)}
            else{
                // Check if the user has a phone number in their attributes
                if(data.Item.phone){
                    let phone = data.Item.phone.N;
                    this.setState({
                        phoneNumber: phone,
                        phonePanel: true
                    })
                }
                // Check that the user has an address in the attributes
                if(data.Item.addressline){
                    console.log('address',data.Item)
                    this.setDeliveryAddress(data.Item)
                }
            }
        })
    }

    setDeliveryAddress(address){
        console.log('[setDeliveryAddress]',address)
        this.setState({deliveryAddress: {
                    street: address.addressline.S,
                    city: address.city.S,
                    state: address.state.S,
                    zipCode: address.zipcode.N,
                    instructions: address.instructions.S,},
            addressPanel: true, })

    }

    calculateTotal(){
        var total = this.state.subtotal + this.state.deliveryFee + this.state.serviceFee;
        total = Math.round(total * 100) / 100;
        console.log('[calculate total]',total)
        return total
    }

    handleNewAddress = (model) =>{
        this.setState({
            deliveryAddress: {city: model.city, state:model.state, zipCode:model.zipCode, street:model.addressLine},
            addressPanel: true,
            }
        )
    }

    handleDeliveryTime = (model) =>{
        this.setState({
            timePanel: true,
            deliveryTime: model.deliveryTime,
            deliveryDay: model.deliveryDay
        })
    }

    handleContact = (model) =>{
        this.setState({
            phonePanel: true,
            phoneNumber: model.phone,
        })
    }

    handlePaymentMethod = (token) => {
        var label = token.source.card.brand + ' ' + token.source.card.last4
        this.setState({token: token, paymentPanel: true,
        paymentMethod: {brand: token.source.card.brand, last4:token.source.card.last4, label:label}});
    }

    handleOrderPlace = ()=>{
        var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        var address = this.state.deliveryAddress.street + ' ' + this.state.deliveryAddress.city +', ' +
            this.state.deliveryAddress.state + ' ' + this.state.deliveryAddress.zipCode;

        var order = {
            'orderId': {'N':this.hashCode().toString()},
            'date':{'S':date},
            'deliveryDate': {'S':this.state.deliveryDay},
            'deliveryTime':{'S':this.state.deliveryTime},
            'deliveryAddress':{'S':address},
            'status':{'S':'inProgress'},
            'total':{'N':this.calculateTotal().toString()},
            'phoneNumber':{'N':this.state.phoneNumber},
            'items':{'L':this.state.orderItems}
        }

        console.log('[order]',order)
        var history = [{'M': order}]
        var userParams = {
            ExpressionAttributeNames: {
                "#H": "history",
            },
            ExpressionAttributeValues: {
                ":h": {
                    L: history
                }
            },
            Key: {
                'userid': {S: this.state.userId}
            },
            ReturnValues: "ALL_NEW",
            UpdateExpression: "SET #H = list_append( :h, #H) ",
            TableName: "user"
        };
        // Scan the DB and get the user
        dynamodb.updateItem(userParams, (err, data) => {
            if(err) {console.log(err, err.stack)}
            else{
                console.log('[Order Placed]',data);
            }
        })
        //TODO send the token to the back end
    }

    hashCode() {
        var s = new Date().toUTCString();
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    };

    renderAddress(){
        if(this.state.addressPanel && this.state.deliveryAddress){
            return(
                <div>
                    <AddressCard city={this.state.deliveryAddress.city}
                                 state={this.state.deliveryAddress.state}
                                 street={this.state.deliveryAddress.street}
                                 zipCode={this.state.deliveryAddress.zipCode}/>
                    <div style={{marginLeft:'1.5rem'}}>
                        <Button style={{paddingLeft:'3rem', paddingRight:'3rem', marginTop:'2rem'}} snacksStyle={'secondary'}
                                onClick={()=>{this.setState({addressPanel: false})}} type="submit">Change</Button>
                    </div>
                </div>
            )
        } else {
            return(
                <Form onSubmit={this.handleNewAddress}>
                <div style={{margin:'1.5rem 1.5rem'}}>
                    <TextField
                        name="addressLine"
                        type="text"
                        floatingLabelText="Address"
                        hintText="Enter Your Address"
                        fullWidth
                        required
                    />
                </div>
                <div style={{minWidth:'30%',marginLeft:'1.5rem', display:'inline-block', marginBottom:'1.5rem'}}>
                    <TextField
                        style={{width:'100%'}}
                        name="city"
                        type="text"
                        floatingLabelText="City"
                        hintText="Enter Your City"
                        halfWidth
                        required
                    />
                </div>
                <div style={{display:'inline-block', marginLeft:'1.5rem', marginBottom:'1.5rem'}}>
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
                <div style={{display:'inline-block', marginLeft:'1.5rem', marginBottom:'1.5rem'}}>
                    <TextField
                        name="zipCode"
                        type="text"
                        floatingLabelText="Zip Code"
                        hintText="Enter Your Zip Code"
                        halfWidth
                        required
                    />
                </div>
                <div style={{marginLeft:'1.5rem'}}>
                    <Button style={{paddingLeft:'3rem', paddingRight:'3rem'}} type="submit">Save</Button>
                </div>
            </Form>)
        }
    }

    renderContactDetails(){
        if(this.state.phonePanel){
            return(<div>
                <div style={validEntry}>
                    {this.state.phoneNumber}
                </div>
                <div style={{marginLeft:'1.5rem'}}>
                    <Button style={{paddingLeft:'3rem', paddingRight:'3rem', marginTop:'2rem'}} snacksStyle={'secondary'}
                            onClick={()=>{this.setState({phonePanel: false})}} type="submit">Change</Button>
                </div>
            </div>)

        } else {
            return(
                <Form onSubmit={this.handleContact}>
                    <div style={{margin: '1.5rem'}}>
                        <TextField
                            name="phone"
                            type="tel"
                            floatingLabelText="Phone number"
                            fullWidth
                            //TODO Validate
                            required
                        />
                    </div>
                    <div style={{marginLeft:'1.5rem'}}>
                        <Button style={{paddingLeft:'3rem', paddingRight:'3rem'}} type="submit">Save</Button>
                    </div>
                </Form>
            )
        }
    }

    renderPaymentMethods(){
        if(this.state.paymentMethod){
            return(
                <div>
                    <ul style={{listStyleType: "none",marginBottom:'3rem'}}>
                        <CreditCard brand={this.state.paymentMethod.brand} label={this.state.paymentMethod.label}
                                    last4={this.state.paymentMethod.last4} isDefault={false}/>
                    </ul>
                    <div style={{marginLeft:'1.5rem'}}>
                        <Button style={{paddingLeft:'3rem', paddingRight:'3rem', marginTop:'2rem'}}
                                snacksStyle={'secondary'} onClick={()=>{this.setState({paymentPanel: false})}}>Change</Button>
                    </div>
                </div>
                )
        } else{return(
            <div>
                <StripeProvider apiKey={stripeAPIKey}>
                    <Elements>
                        <NewCardForm onSubmit={this.handlePaymentMethod}/>
                    </Elements>
                </StripeProvider>
                <div style={{marginLeft:'1.5rem'}}>
                    <Button style={{paddingLeft:'3rem', paddingRight:'3rem', marginTop:'2rem'}}
                            type="submit" elementAttributes={{form:'newcard'}}>Save</Button>
                </div>
            </div>
            )}
    }

    renderDeliveryTime(){
        if(this.state.timePanel){
            return(
                <div>
                    <div style={validEntry}>{this.state.deliveryDay}, from {this.state.deliveryTime}</div>
                    <div style={{marginLeft:'1.5rem', marginBottom:'1.5rem'}}>
                        <Button style={{paddingLeft:'3rem', paddingRight:'3rem'}} snacksStyle={'secondary'}
                                type="submit" onClick={()=>{this.setState({timePanel: false, daySelected:false, timeSelected:false})}}>Change</Button>
                    </div>
                </div>)

        } else {
            return(
                <StyleRoot>
                    <Form onSubmit={this.handleDeliveryTime} >
                        <Select style={{margin:'1.5rem'}}
                                name="deliveryDay"
                                floatingLabelText="Day"
                                hintText="Select a Day"
                                validationErrorText="Please select a day"
                                halfWidth
                                onSelect={()=>{this.setState({daySelected: true})}}
                                required
                        >
                            <MenuItem label="Monday" value="monday"/>
                            <MenuItem label="Tuesday" value="tuesday"/>
                            <MenuItem label="Wednesday" value="wednesday"/>
                            <MenuItem label="Thursday" value="thursday"/>
                            <MenuItem label="Friday" value="friday"/>
                            <MenuItem label="Saturday" value="saturday"/>
                            <MenuItem label="Sunday" value="sunday"/>
                        </Select>
                        <Select style={{margin:'1.5rem'}}
                                name="deliveryTime"
                                floatingLabelText="Time"
                                hintText="Select a Time"
                                validationErrorText="Please select a delivery time"
                                halfWidth
                                required
                                onSelect={()=>{this.setState({timeSelected: true})}}
                                disabled={!this.state.daySelected}
                        >
                            <MenuItem label="8am - 12pm" value="8am - 12pm"/>
                            <MenuItem label="12pm - 4pm" value="12pm - 4pm"/>
                            <MenuItem label="4pm - 8pm" value="4pm - 8pm"/>
                        </Select>
                        <div style={{marginLeft:'1.5rem'}}>
                            <Button style={{paddingLeft:'3rem', paddingRight:'3rem'}} type="submit"
                                    disabled={!this.state.timeSelected}>Confirm Time</Button>
                        </div>
                    </Form>
                </StyleRoot>
            )
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <div style={checkout}>
                    <div>
                        <h1 style={{textAlign:'center', padding:'1.5rem' ,fontFamily:' "Open Sans", "Helvetica Neue", Helvetica, sans-serif'}}>Checkout</h1>
                    </div>
                    <div style={checkoutForm}>
                        <CheckoutPanel icon={"locationMarker"} title='Select delivery address' onValidTitle={'Delivery address'}
                                       valid={this.state.addressPanel}>
                            {this.renderAddress()}
                        </CheckoutPanel>
                        <CheckoutPanel icon={"clock"} title='Choose delivery time' onValidTitle={'Delivery Time'}
                        valid={this.state.timePanel}>
                            <div>
                                {this.renderDeliveryTime()}
                            </div>
                        </CheckoutPanel>
                        <CheckoutPanel icon={"phone"} title='Enter contact number' valid={this.state.phonePanel}
                        onValidTitle={'Mobile number'}>
                            {this.renderContactDetails()}
                        </CheckoutPanel>
                        <CheckoutPanel
                            valid={this.state.paymentPanel}
                            icon={"creditCard"}
                            title='Select payment method' onValidTitle={'Payment'}>
                            {this.renderPaymentMethods()}
                        </CheckoutPanel>
                        <CheckoutPanel icon={"orderReview"} title={this.state.cart.length + ' Items'}>
                            <div style={{margin:'1.5rem 2rem'}}>
                                <OrderItems items={this.state.cart}/>
                            </div>
                        </CheckoutPanel>
                        <CheckoutPanel title={'Order Total'} icon={'note'}>
                            <div style={{margin:'1.5rem'}}>
                                <div style={{overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                    Subtotal <div style={{flexGrow:'1', textAlign:'end'}}>${this.state.subtotal}</div>
                                </div>
                                <div style={{overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                    Delivery <div style={{flexGrow:'1', textAlign:'end'}}>${this.state.deliveryFee}</div>
                                </div>
                                <div style={{overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                    Service Fee <div style={{flexGrow:'1', textAlign:'end'}}>${this.state.serviceFee}</div>
                                </div>
                                <hr></hr>
                                <div style={{fontWeight:'600',overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                    Total <div style={{flexGrow:'1', textAlign:'end'}}>${this.calculateTotal()}</div>
                                </div>
                            </div>
                        </CheckoutPanel>
                        <div style={{background:'#FFFFFF', width:'100%', marginTop:'2rem', padding:'1rem'}}>
                            <div style={{margin:'1.5rem auto', textAlign:'center'}}>
                                <span>Done? Place your order and enjoy your day</span>
                            </div>
                            <div style={{margin:'2rem', textAlign:'center'}}>
                                <Button style={{paddingLeft:'4rem', paddingRight:'4rem', marginLeft:'auto', marginRight:'0'}}
                                        onClick={this.handleOrderPlace}
                                        disabled={
                                            !(this.state.addressPanel && this.state.paymentPanel && this.state.phonePanel && this.state.timePanel)}
                                        //TODO Make this button active when all oder fields have been filled
                                        >
                                    Place order
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Checkout.defaultProps = {
    cart: [{id: 1, quantity:2},{id:4,quantity:1}],
}

Checkout.propTypes = {
    cart: PropTypes.array
}