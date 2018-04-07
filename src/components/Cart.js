import React, {Component} from 'react'
import CartList from './cart_list'
import {db} from '../db'
import './header.css'

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [
        {
          name: 'Creame Cheese',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Philly_cream_cheese.jpg/1200px-Philly_cream_cheese.jpg',
          price: '3.79'
        },
        {
          name: 'Apple',
          image: 'http://juliandance.org/wp-content/uploads/2016/01/RedApple.jpg',
          price: '2.59'
        },
        {
          name: 'Apple',
          image: 'http://juliandance.org/wp-content/uploads/2016/01/RedApple.jpg',
          price: '2.59'
        },
        {
          name: 'Apple',
          image: 'http://juliandance.org/wp-content/uploads/2016/01/RedApple.jpg',
          price: '2.59'
        },
        {
          name: 'Apple',
          image: 'http://juliandance.org/wp-content/uploads/2016/01/RedApple.jpg',
          price: '2.59'
        },
        {
          name: 'Apple',
          image: 'http://juliandance.org/wp-content/uploads/2016/01/RedApple.jpg',
          price: '2.59'
        }
      ]
    }

  }


  render() {
    const title = {
      height: '10%',
      borderBottom: '1px solid #E1E8EE',
      padding: '20px 30px',
      color: '#5E6977',
      fontSize: '18px',
      fontWeight: '400'
    }

    const shoppingCart = {
      position: 'absolute',
      top: '0',
      right: '0',
      zIndex: '11',
      width: '40vw',
      height: '100vh',
      background: '#FFFFFF',
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

      return(
        <div style={shoppingCart}>
          <div style={title}>
            Shopping Cart
            <button className="primary" style={{float: 'right', height: '30px', fontSize: '14px'}} onClick={() => this.props.onCloseClick(false)}>
              Close
            </button>
          </div>
          <div style={{height: '80%', overflowY: 'scroll'}}>
            <CartList items={this.state.cartItems}/>
          </div>
          <div style={{borderTop: '1px solid #a9a9a9', height: '10%', display: 'flex', justifyContent: 'center'}}>
            <button style={checkoutBtn} className="primary">Checkout</button>
          </div>
        </div>
      );
    }
  }
export default Cart;
