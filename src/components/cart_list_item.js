import React, {Component} from 'react'
import Counter from './Counter'

class CartItem extends Component {
  constructor(props) {
    super(props)
    // var item = this.props.item
    if(localStorage.getItem('cart') != null) {
      var cartString = localStorage.getItem('cart')
      var cart = JSON.parse(cartString)
      if(cart.hasOwnProperty(this.props.item.itemID)) {
        var quantityInCart = cart[this.props.item.itemID].quantityInCart
        console.log('Quantity of item with itemID '+this.props.item.itemID+ ' is ' + quantityInCart);
        this.state = {quantityInCart: quantityInCart}
        console.log("State " + this.state.quantityInCart);
      } else {
        this.state = {
          quantityInCart: 0
        }
      }
    } else {
      this.state = {
        quantityInCart: 0
      }
    }
  }

  handleIncrease = () => {
    var quantityInCart = this.state.quantityInCart
    if(localStorage.getItem('cart') != null) {
      var cartString = localStorage.getItem('cart')
      var cart = JSON.parse(cartString)
      if(cart.hasOwnProperty(this.props.item.itemID)) {
        var item = cart[this.props.item.itemID]
        quantityInCart++
        item.quantityInCart = quantityInCart
        cart[this.props.item.itemID] = item
        localStorage.setItem('cart', JSON.stringify(cart))
        this.setState({quantityInCart: quantityInCart})
      }
    }
  };

  // Decreases the quantity of this item by 1 in the cart.
  handleDecrease = () => {
    var quantityInCart = this.state.quantityInCart
    if(localStorage.getItem('cart') != null) {
      var cartString = localStorage.getItem('cart')
      var cart = JSON.parse(cartString)
      if(cart.hasOwnProperty(this.props.item.itemID)) {
        var item = cart[this.props.item.itemID]
        quantityInCart--
        item.quantityInCart = quantityInCart
        cart[this.props.item.itemID] = item
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log('Quantity of item with itemID '+this.props.item.itemID+ ' is ' + quantityInCart);
        this.setState({quantityInCart: quantityInCart})
        console.log("State " + this.state.quantityInCart);
      }
    }
  }

  // Remove the item from the cart
  handleRemove = () => {
    var quantityInCart = this.state.quantityInCart
    if(localStorage.getItem('cart') != null) {
      var cartString = localStorage.getItem('cart')
      var cart = JSON.parse(cartString)
      if(cart.hasOwnProperty(this.props.item.itemID)) {
        quantityInCart = 0
        // cart[this.props.itemID] = quantity
        delete cart[this.props.item.itemID]
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log('Quantity of item with itemID '+this.props.item.itemID+ ' is ' + quantityInCart);
        this.setState({quantityInCart: quantityInCart})
        console.log("State " + this.state.quantityInCart);
      }
    }
  }

  render() {
    function SalePrice(props) {
      return <div>{props.price * props.quantity}</div>
    }

    function RegularPrice(props) {
      return <div>{props.price * props.quantity}</div>
    }

    function Price(props) {
      var isOnSale = props.isOnSale
      if (isOnSale) {
        return <SalePrice price={props.salePrice} quantity={props.quantity}/>
      }
      return <RegularPrice price={props.regularPrice} quantity={props.quantity}/>
    }

    return (
        <li className="list-group-item">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-2">
                <img className="img-responsive" src={this.props.item.image} />
              </div>
              <div className="col-xs-2">
                <span>{this.props.item.name}</span>
                <br />
                <span style={{color: 'gray'}}>{this.props.item.weight}</span>
              </div>
              <div className="col-xs-6" style={{paddingRight: '0'}}>
                <Counter quantity={this.state.quantityInCart}
                  onIncrease={this.handleIncrease}
                  onDecrease={this.handleDecrease}
                  onRemove={this.handleRemove} />
              </div>
              <div className="col-xs-2">
                <Price isOnSale={this.props.item.salePrice != '0'} salePrice={this.props.item.salePrice} regularPrice={this.props.item.price} quantity={this.props.item.quantityInCart}/>
              </div>
            </div>
          </div>
        </li>
    );
  }
}

export default CartItem;
