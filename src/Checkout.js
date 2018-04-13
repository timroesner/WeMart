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
import AWS from "aws-sdk/index";
//

let key = 'pk_test_ccBJoXsCQn6kn5dkF098Xywl';
let days = [
    {text:'Monday'},
    {text:'Tuesday'},
    {text:'Wednesday'},
    {text:'Thursday'},
    {text:'Friday'},
    {text:'Saturday'},
];

//STYLES
const checkout = {margin:' 1rem auto', maxWidth:'70rem', overflow: 'hidden', borderTopLeftRadius:'.6rem',
borderTopRightRadius:'.6rem'};

export default class Checkout extends React.Component {

    constructor(){
        super();
        this.state = {
            daySelected: false,
            isGuest:true,
            deliveryAddress: null,
            paymentMethod: {id: "card_1", brand: "Visa", last4: "4242", label: "Visa 4242" , isDefault: true},
            cart: []
        }

        // Get the dynamoDB database
        var dynamodb = null;
        if(process.env.NODE_ENV === 'development'){
            dynamodb = new AWS.DynamoDB(require('./db').db);
        }else{
            dynamodb = new DynamoDB({
                region: "us-west-1",
                credentials: {
                    accessKeyId: process.env.REACT_APP_DB_accessKeyId,
                    secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
            });
        }

        // Get the table whose name is "item"
        var params = {
            TableName: "item"
        };

        // Scan the DB and get the items
        dynamodb.scan(params, (err, data) => {
            if (err) {console.log(err, err.stack)} // an error occurred
            else{
                data.Items.forEach((element) => {

                    //TODO Clean this up into a one liner.
                    let departmentid = element.departmentid.N;
                    let image = element.image.S;
                    let itemid = (element.itemid.S);
                    let name = (element.name.S);
                    let price = (element.price.N);
                    let quantity = (element.quantity.S);
                    let sale = (element.sale.N);

                    let testItem = {
                        itemid: itemid, name: name, departmentid: departmentid, image: image, price: price,
                        quantity: quantity, sale: sale, inCart: 0};
                    this.setState({
                        cart: [...this.state.cart, testItem]
                    });
                });
            }
        });
    }

    handleNewAddress = (model) =>{
        this.setState({
            deliveryAddress: {city: model.city, state:model.state, zipCode:model.zipCode, street:model.addressLine}
            }
        )
    }
    renderAddress(){
        if(this.state.deliveryAddress){
            return(<AddressCard city={this.state.deliveryAddress.city}
                                state={this.state.deliveryAddress.state}
                                street={this.state.deliveryAddress.street}
                                zipCode={this.state.deliveryAddress.zipCode}/>)
        } else {
            return(<Form onSubmit={this.handleNewAddress}>
                <div>
                    <TextField
                        name="addressLine"
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
                <Button type="submit">Accept</Button>
            </Form>)
        }
    }

    renderPaymentMethods(){
        if(this.state.paymentMethod){
            return(
                <ul style={{listStyleType: "none"}}>
                    <CreditCard brand={'visa'} label={'visa2333'} last4={'4242'} isDefault={false}/>
                </ul>)
        } else{return(<StripeProvider apiKey={key}>
            <Elements>
                <CheckoutForm/>
            </Elements>
        </StripeProvider>)}
    }

    render() {
        return (
            <diV>
                <Header/>
                <div style={checkout}>
                    <h1>Checkout</h1>
                    <CheckoutPanel icon={"locationMarker"} title='Select delivery address'>
                        {this.renderAddress()}
                    </CheckoutPanel>
                    <CheckoutPanel icon={"clock"} title='Choose delivery time'>
                        <div>
                            <StyleRoot>
                                <Select
                                    name="deliveryDay"
                                    floatingLabelText="Day"
                                    hintText="Select a Day"
                                    validationErrorText="Please select a day"
                                    halfWidth
                                    onSelect={()=>{this.setState({daySelected: true})}}
                                    required
                                >
                                    <MenuItem label="Monday" value="monday"/>
                                    <MenuItem label="Monday" value="monday"/>
                                    <MenuItem label="Monday" value="monday"/>
                                    <MenuItem label="Monday" value="monday"/>
                                    <MenuItem label="Monday" value="monday"/>
                                    <MenuItem label="Monday" value="monday"/>
                                    <MenuItem label="Monday" value="monday"/>
                                </Select>
                                <Select
                                    name="deliveryTime"
                                    floatingLabelText="Time"
                                    hintText="Select a Time"
                                    validationErrorText="Please select a delivery time"
                                    halfWidth
                                    required
                                    disabled={!this.state.daySelected}
                                >
                                    <MenuItem label="8am - 10am" value="8"/>
                                    <MenuItem label="8am - 10am" value="8"/>
                                    <MenuItem label="8am - 10am" value="8"/>
                                    <MenuItem label="8am - 10am" value="8"/>
                                    <MenuItem label="8am - 10am" value="8"/>
                                    <MenuItem label="8am - 10am" value="8"/>
                                    <MenuItem label="8am - 10am" value="8"/>
                                    <MenuItem label="8am - 10am" value="8"/>
                                </Select>
                            </StyleRoot>
                        </div>
                    </CheckoutPanel>
                    <CheckoutPanel icon={"phone"} title='Contact number'>
                        <TextField
                            style={{marginRight: '5px'}}
                            name="phone"
                            type="tel"
                            floatingLabelText="Phone number"
                            fullWidth
                            required
                        />
                    </CheckoutPanel>
                    <CheckoutPanel icon={"creditCard"} title='Select payment method'>
                        {this.renderPaymentMethods()}
                    </CheckoutPanel>
                    <CheckoutPanel icon={"orderReview"} title='N items'>
                        <OrderItems items={this.state.cart}/>
                    </CheckoutPanel>
                    <CheckoutPanel title={'Order Total'} icon={'note'}>
                        <div>
                            <div style={{overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                Subtotal <div style={{flexGrow:'1', textAlign:'end'}}>$54.99</div>
                            </div>
                            <div style={{overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                Delivery <div style={{flexGrow:'1', textAlign:'end'}}>$4.99</div>
                            </div>
                            <div style={{overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                Service Fee <div style={{flexGrow:'1', textAlign:'end'}}>$4.99</div>
                            </div>
                            <div style={{overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                Credit/Discount Applied <div style={{flexGrow:'1', textAlign:'end'}}>$4.99</div>
                            </div>
                            <hr></hr>
                            <div style={{fontWeight:'600',overflow:'hidden', lineHeight:'2.rem', display:'flex', alignItems:'center'}}>
                                Total <div style={{flexGrow:'1', textAlign:'end'}}>$54.99</div>
                            </div>
                        </div>
                    </CheckoutPanel>
                    <div style={{background:'#FFFFFF', width:'100%', marginTop:'2rem', padding:'1rem'}}>
                        <span>Done? Place your order and enjoy your day.</span>
                        <Button style={{}}>Place order</Button>
                    </div>
                </div>
            </diV>
        );
    }
}