import React, {Component} from 'react'
import CartList from './cart_list'
import './header.css'
import {DynamoDB} from 'aws-sdk/index'
import AWS from 'aws-sdk/index'
import { withRouter } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);

    if(localStorage.getItem('cart') != null) {
      var cartString = localStorage.getItem('cart')
      var cart = JSON.parse(cartString)
      this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0, width: window.innerWidth}
    } else {
      this.state = {cartItems: [], totalPrice: 0, width: window.innerWidth}
    }

    this.getTotalPrice(this.state.cartItems);
    this.handleRemove = this.handleRemove.bind(this)
    this.handleIncrease = this.handleIncrease.bind(this)
    this.handleDecrease = this.handleDecrease.bind(this)
  }

  getItemsFromCart = (cart) => {
    var cartItems = []
    for(var itemID in cart) {
      cartItems.push(cart[itemID])
    }
    return cartItems
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
    var tPrice = 0
    items.forEach((item)=>{
      var priceToBeAdded = Number(item.price)
      if (item.sale != '0') {
        priceToBeAdded = Number(item.sale)
      }
      tPrice += priceToBeAdded * item.quantityInCart
    })
    return tPrice
  }

  // Remove the item from the cart
  handleRemove = (itemID) => {
    if(localStorage.getItem('cart') != null) {
      var cartString = localStorage.getItem('cart')
      var cart = JSON.parse(cartString)
      if(cart.hasOwnProperty(itemID)) {
        delete cart[itemID]
        localStorage.setItem('cart', JSON.stringify(cart))
        this.setState({cartItems: this.getItemsFromCart(cart)})
      }
    }
  }

  //Increases item quantity in cart
  handleIncrease = (itemID) => {
    if(localStorage.getItem('cart') != null) {
      var cartString = localStorage.getItem('cart')
      var cart = JSON.parse(cartString)
      if(cart.hasOwnProperty(itemID)) {
        var item = cart[itemID]
        item.quantityInCart += 1
        cart[itemID] = item
        localStorage.setItem('cart', JSON.stringify(cart))
        this.setState({cartItems: this.getItemsFromCart(cart)})
      }
    }
  };

  // Decreases the quantity of this item by 1 in the cart.
  handleDecrease = (itemID) => {
    if(localStorage.getItem('cart') != null) {
      var cartString = localStorage.getItem('cart')
      var cart = JSON.parse(cartString)
      if(cart.hasOwnProperty(itemID)) {
        var item = cart[itemID]
        item.quantityInCart -= 1
        cart[itemID] = item
        localStorage.setItem('cart', JSON.stringify(cart))
        this.setState({cartItems: this.getItemsFromCart(cart)})
      }
    }
  }

  handleCheckoutClick = () => {
    this.props.history.push('/checkout')
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
      width: '35vw',
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
      height: '82%',
      padding: '0',
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
              <CartList items={this.state.cartItems}
                handleRemove={(itemID) => this.handleRemove(itemID)}
                handleIncrease={(itemID) => this.handleIncrease(itemID)}
                handleDecrease={(itemID) => this.handleDecrease(itemID)}/>
            </div>
            <div style={{height: '10%', display: 'flex', justifyContent: 'center'}}>
              <button style={checkoutBtn} className="primary" onClick={this.handleCheckoutClick} >Checkout
              </button>
            </div>
            <div style={{float: 'right', margin: '-57px 25px 0 auto', padding: '4px 7px', borderRadius: '4px' ,background: 'white', color: '#D30707'}}>
                  {'$'+this.getTotalPrice(this.state.cartItems).toFixed(2)}
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
              <CartList items={this.state.cartItems}
                        handleRemove={(itemID) => this.handleRemove(itemID)}
                        handleIncrease={(itemID) => this.handleIncrease(itemID)}
                        handleDecrease={(itemID) => this.handleDecrease(itemID)}/>
            </div>
            <div style={{height: '10%', display: 'flex', justifyContent: 'center'}}>
              <button style={checkoutBtn} className="primary" onClick={this.handleCheckoutClick} >Checkout
              </button>
            </div>
            <div style={{float: 'right', margin: '-57px 25px 0 auto', padding: '4px 7px', borderRadius: '4px' ,background: 'white', color: '#D30707'}}>
                  {'$'+this.getTotalPrice(this.state.cartItems).toFixed(2)}
            </div>
          </div>
        );
      }
    }
  }
export default withRouter(Cart);
