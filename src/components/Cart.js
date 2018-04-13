import React, {Component} from 'react'
import CartList from './cart_list'
import db from '../db';
import './header.css'
import {DynamoDB} from 'aws-sdk/index'
import AWS from 'aws-sdk/index'

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      cartItems: []
    }

    var dynamodb = null;
    if(process.env.NODE_ENV === 'development'){
        dynamodb = db;
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
                    cartItems: [testItem]
                });
            });
        }
    });
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  getTotalPrice(items) {
    console.log(items);
    var totalPrice = 0
    for (var item in items) {
      totalPrice += item.price;
      console.log(Number(item.price));
    }
    return totalPrice
  }

  render() {
    const title = {
      height: '10%',
      padding: '20px 30px',
      margin: '0'
    }

    const shoppingCart = {
      position: 'fixed',
      top: '0',
      right: '0',
      zIndex: '11',
      width: '40vw',
      height: '100vh',
      background: '#f7f7f7',
      boxShadow: '1px 2px 3px 0px rgba(0,0,0,0.10)',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #a9a9a9',
      maxHeight: '100vh'
    }

    const shoppingCartMobile = {
      position: 'fixed',
      top: '0',
      right: '0',
      zIndex: '11',
      width: '100vw',
      height: '100vh',
      background: '#f7f7f7',
      boxShadow: '1px 2px 3px 0px rgba(0,0,0,0.10)',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #a9a9a9',
      maxHeight: '100vh'
    }

    const checkoutBtn = {
      width: '98%',
      margin: 'auto',
      padding: '0',
      height: '82%'
    }
    const isMobile = this.state.width <= 700;
    if (isMobile) {
      return(
          <div style={shoppingCartMobile}>
            <div className="jumbotron" style={title}>
              <span className="lead">Shopping Cart</span>
              <button className="primary" style={{float: 'right', height: '30px', fontSize: '14px'}} onClick={() => this.props.onCloseClick(false)}>
                Close
              </button>
            </div>
            <div style={{height: '80%', overflowY: 'scroll'}}>
              <CartList items={this.state.cartItems}/>
            </div>
            <div style={{height: '10%', display: 'flex', justifyContent: 'center'}}>
              <button style={checkoutBtn} className="primary">Checkout
                <span style={{position: 'absolute', right: '25px',bottom: '15px', padding: '4px 7px', borderRadius: '4px' ,background: 'linear-gradient(#d82929, #d82929)'}}>
                  {this.getTotalPrice(this.state.cartItems)}
                </span>
              </button>
            </div>
          </div>
        );
      } else {
        return(
          <div style={shoppingCart}>
            <div className="jumbotron" style={title}>
              <span className="lead">Shopping Cart</span>
              <button className="primary" style={{float: 'right', height: '30px', fontSize: '14px'}} onClick={() => this.props.onCloseClick(false)}>
                Close
              </button>
            </div>
            <div style={{height: '80%', overflowY: 'scroll'}}>
              <CartList items={this.state.cartItems}/>
            </div>
            <div style={{height: '10%', display: 'flex', justifyContent: 'center'}}>
              <button style={checkoutBtn} className="primary">Checkout
                <span style={{position: 'absolute', right: '25px',bottom: '15px', padding: '4px 7px', borderRadius: '4px' ,background: 'linear-gradient(#d82929, #d82929)'}}>
                  {this.getTotalPrice(this.state.cartItems)}
                </span>
              </button>
            </div>
          </div>
        );
      }
    }
  }
export default Cart;
