// CheckoutForm.js
import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from "./components/CheckoutForm";
import Header from "./components/header";
import {Button, Form, MenuItem, NavigationPills, Radio, RadioGroup, Select, TextField} from "ic-snacks";
import CheckoutPanel from "./components/CheckoutPanel";
import AddressCard from "./components/AddressCard";
import {StyleRoot} from "radium";
import CreditCard from "./components/CreditCard";
import OrderItems from "./components/OrderItems";
import {DynamoDB} from "aws-sdk/index";
import PropTypes from 'prop-types';
import AWS from "aws-sdk/index";
import NewCardForm from "./components/NewCardForm";
//

let key = 'pk_test_ccBJoXsCQn6kn5dkF098Xywl';
let cart = [{id: 1, quantity:2},{id:4,quantity:1}]

//STYLES
const checkout = {margin:' 1rem auto', maxWidth:'71rem',};
const checkoutForm = {width:'100%',overflow: 'hidden', borderTopLeftRadius:'.6rem',
    borderTopRightRadius:'.6rem'}

export default class Checkout extends React.Component {

    constructor(){
        super();
        this.state = {
            //Validators
            addressPanel: false,
            timePanel: false,
            paymentPanel: false,
            phonePanel: false,


            daySelected: false,
            timeSelected: false,
            isGuest:true,
            deliveryAddress: null,
            paymentMethod: null,
            cart: [],
            deliveryFee: 3.99,
            serviceFee: 2.98,
            credit: 2.99,
            subtotal: 0,
            total:0,

            //Order Details
            deliveryTime: null,
            deliveryDay: null,
            phoneNumber: null,
        }

        // Get the dynamoDB database
        var dynamodb;
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

        console.log(this.props)

        cart.forEach((item)=> {
            console.log(item);
            var itemParams  = {
                Key: {'itemid': {S:item.id.toString()}},
                TableName: 'item'
            }
            dynamodb.getItem(itemParams,(err, data)=>{
                if(err) console.log(err, err.stack)
                else {
                    let departmentid = data.Item.departmentid.N;
                    let image = data.Item.image.S;
                    let itemid = (data.Item.itemid.S);
                    let name = (data.Item.name.S);
                    let price = (data.Item.price.N);
                    let quantity = (data.Item.quantity.S);
                    let sale = (data.Item.sale.N);
                    let testItem = {
                                    itemid: itemid, name: name, departmentid: departmentid, image: image, price: price,
                                    quantity: quantity, sale: sale, inCart: 0};

                    this.setState({
                        cart: [...this.state.cart, {item: testItem, quantity: item.quantity}]
                    })
                    var itemTotalPrice = (item.quantity * price);
                    this.setState({
                        subtotal: (this.state.subtotal + itemTotalPrice)
                    })
                }
            })
        })
    }

    componentDidMount(){
        console.log(this.state.subtotal);
        this.setState({
            total: this.state.subtotal + this.state.credit + this.state.serviceFee + this.state.deliveryFee
        })
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
                    <Button style={{paddingLeft:'3rem', paddingRight:'3rem'}} type="submit">Accept</Button>
                </div>
            </Form>)
        }
    }

    renderContactDetails(){
        if(this.state.phonePanel){
            return(<div>
                <div>
                    {this.state.phoneNumber}
                </div>
                <div style={{marginLeft:'1.5rem'}}>
                    <Button style={{paddingLeft:'3rem', paddingRight:'3rem', marginTop:'2rem'}} snacksStyle={'secondary'}
                            onClick={()=>{this.setState({addressPanel: false})}} type="submit">Change</Button>
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
                            required
                        />
                    </div>
                    <div style={{marginLeft:'1.5rem'}}>
                        <Button style={{paddingLeft:'3rem', paddingRight:'3rem'}} type="submit" >Accept</Button>
                    </div>
                </Form>
            )
        }
    }

    renderPaymentMethods(){
        if(this.state.paymentMethod){
            return(
                <ul style={{listStyleType: "none",marginBottom:'3rem'}}>
                    <CreditCard brand={'visa'} label={'visa2333'} last4={'4242'} isDefault={false}/>
                </ul>)
        } else{return(<StripeProvider apiKey={key}>
            <Elements>
                <NewCardForm></NewCardForm>
            </Elements>
        </StripeProvider>)}
    }

    renderDeliveryTime(){
        if(this.state.timePanel){
            return(
                <div>
                    <div>{this.state.deliveryDay}, at {this.state.deliveryTime}</div>
                    <div style={{marginLeft:'1.5rem', marginBottom:'1.5rem'}}>
                        <Button style={{paddingLeft:'3rem', paddingRight:'3rem'}} snacksStyle={'secondary'}
                                type="submit" onClick={()=>{this.setState({timePanel: false})}}>Change</Button>
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
            <diV>
                <Header/>
                <div style={checkout}>
                    <h1>Checkout</h1>
                    <div style={checkoutForm}>
                        <CheckoutPanel icon={"locationMarker"} title='Select delivery address' onValidTitle={'Delivery address'}
                                       valid={this.state.addressPanel}>
                            {this.renderAddress()}
                        </CheckoutPanel>
                        <CheckoutPanel icon={"clock"} title='Choose delivery time' onValidTitle={'Delivery time'}
                        valid={this.state.timePanel}>
                            <div>
                                {this.renderDeliveryTime()}
                            </div>
                        </CheckoutPanel>
                        <CheckoutPanel icon={"phone"} title='Enter contact number' valid={this.state.phonePanel}
                        onValidTitle={'Mobile number'}>
                            {this.renderContactDetails()}
                        </CheckoutPanel>
                        <CheckoutPanel icon={"creditCard"} title='Select payment method'>
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
                                <div style={{overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                    Credit/Discount Applied <div style={{flexGrow:'1', textAlign:'end'}}>${this.state.credit}</div>
                                </div>
                                <hr></hr>
                                <div style={{fontWeight:'600',overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                    Total <div style={{flexGrow:'1', textAlign:'end'}}>${this.state.total}</div>
                                </div>
                            </div>
                        </CheckoutPanel>
                        <div style={{background:'#FFFFFF', width:'100%', marginTop:'2rem', padding:'1rem'}}>
                            <div><span style={{display:'inline-block'}}>Happy with your order? Place your order and enjoy your day.</span></div>

                            <div style={{display:'inline-block', marginTop:'1.5rem', marginRight:'0', marginLeft:'auto'}}>
                                <Button style={{paddingLeft:'3rem', paddingRight:'3rem', marginLeft:'auto', marginRight:'0'}}>Place order</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </diV>
        );
    }
}

Checkout.defaultProps = {
    cart: [{id: 1, quantity:2},{id:4,quantity:1}],
}

Checkout.propTypes = {
    cart: PropTypes.array
}