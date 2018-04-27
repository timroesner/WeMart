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

  render() {
    function SalePrice(props) {
      return <div>${(props.price * props.quantity).toFixed(2)}</div>
    }

    function RegularPrice(props) {
      return <div>${(props.price * props.quantity).toFixed(2)}</div>
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
              <div className="col-xs-2" style={{padding: '4px', width: '70px'}}>
                <img className="img-responsive" src={this.props.item.image} />
              </div>
              <div className="col-xs-8">
                <span>{this.props.item.name}</span>
                <br />
                <span style={{color: 'gray'}}>{this.props.item.weight}</span>
              </div>
              <div className="col-xs-2" style={{textAlign: 'right'}}>
                <Price isOnSale={this.props.item.salePrice != '0'} salePrice={this.props.item.salePrice} regularPrice={this.props.item.price} quantity={this.props.item.quantityInCart}/>
              </div>
              <div style={{marginRight: '15px', width: '40%', height: '30px', float: 'right', marginBottom: '2%'}}>
                <Counter quantity={this.props.item.quantityInCart}
                  onIncrease={() => this.props.handleIncrease(this.props.item.itemID)}
                  onDecrease={()=> this.props.handleDecrease(this.props.item.itemID)}
                  onRemove={() => this.props.handleRemove(this.props.item.itemID)} />
              </div>
            </div>
          </div>
        </li>
    );
  }
}

export default CartItem;
