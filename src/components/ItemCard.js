import React from 'react';
import PropTypes from 'prop-types';
import {Button, LoadingBox} from 'ic-snacks';
import {StyleRoot} from "radium";
import '../stylesheets/ItemCard.css';
import Counter from "./Counter";

// Style for the add to cart button
let addToCart = {
width: "100%", display: "inherit"
};

export default class ItemCard extends React.Component{

    state = {
        inCart: false,
        quantity: 0
    };

    // Renders the item price.
    // If sale price is zero then it renders normally, otherwise
    // it renders the sale price in red and the original MSRP with a strike-through.
    renderPrice(){
        if(this.props.salePrice !== "0") {
            return (
                <div className="itemCard__price">
                    <span className="itemCard__price--sale">${this.props.salePrice}</span>
                    <span className="itemCard__price--crossed-out">${this.props.price}</span>
                </div>
            );
        } else {
            return <span className="itemCard__price">${this.props.price}</span>;
        }
    }

    // Places a badge to the top right of the item to indicate any special properties of the item.
    // Currently "On Sale" is the only badge.
    renderBadge(){
        if(this.props.salePrice !== "0"){
            return (
                <div className="itemCard__badge itemCard__badge--on-sale">
                </div>
            );
        }
    }

    // Renders the items button bar. By default this includes the counter
    renderButtonBar(){
        if(!this.state.inCart){return(
            <div className="itemCard__button-bar" >
                <Button style={addToCart} snacksStyle="secondary" size="small"
                         onClick={() => {this.handleAddToCart()}}>ADD</Button>
            </div>
        );} else {
            return(
                <div className="itemCard__button-bar">
                    <Counter quantity={this.state.quantity}
                             onIncrease={this.handleIncrease}
                             onDecrease={this.handleDecrease}
                             onRemove={this.handleRemove}/>
                </div>
            );
        }
    }

    // Increases the quantity of this item in the cart
    handleIncrease = () => {
        //TODO increase the quantity of the item in the cart
        this.setState({quantity: this.state.quantity+1})
    };

    // Decreases teh quantity of this item by 1 in the cart.
    handleDecrease = () => {
        //TODO decrease the quantity of the item in the cart
        this.setState({quantity: this.state.quantity-1})
    };

    // Remove the item from the cart
    handleRemove = () => {
        //TODO remove the item from the cart
        this.setState({quantity: 0, inCart: false})
    };

    // Redirect to the item's product page.
    handleItemClicked = () => {
        // When the item card has been clicked.
        //TODO redirect to the item's product page.
        console.log(this.props.name + "Item card clicked")
    };

    handleAddToCart = () => {
      //TODO add the product to cart
        this.setState({
            inCart: true,
            quantity: 1
        });
        console.log(this.props.name.toString() + " Item added to cart")
    };

  render(){
      if(this.props.name){
          return (
              <div className="itemCard">
                  {this.renderBadge()}
                  <div className="itemCard__card-contents" onClick={() => {this.handleItemClicked()}}>
                      <div className="itemCard__media">
                          <img src={this.props.image} alt={this.props.name} className="itemCard__media__image"/>
                      </div>
                      <div className="itemCard__item-info">
                          <div className="itemCard__full-item-name">
                    <span>
                        {this.props.name}
                    </span>
                          </div>
                          {this.renderPrice()}
                          <p className="itemCard__item-info__weight">
                              {this.props.weight}
                          </p>
                      </div>
                  </div>
                  {this.renderButtonBar()}
              </div>);
      } else { // No attributes to the props. Render the loading box from IC Snacks
          return (
              <div className="itemCard">
                  <div style={{margin: '0 auto 1rem auto', width: "15.8rem", paddingTop:"1rem"}}>
                      <StyleRoot>
                          <div>
                              <LoadingBox shape='square' background='light' size='15.8rem' style={{marginBottom: '1rem'}}/>
                          </div>
                          <div>
                              <LoadingBox shape='line' size='100%' style={{height: '1.6rem', marginTop: '.4rem', marginBottom: '0'}} />
                              <LoadingBox shape='line' size='100%' style={{height: '1.6rem', marginTop: '.4rem', marginBottom: '0'}}/>
                              <LoadingBox shape='line' size='100%' background='dark' style={{height: '2.8rem', marginTop: '.4rem', marginBottom: '0'}}/>
                              <LoadingBox shape='line' size='30%' style={{height: '1.0rem', marginTop: '.4rem', marginBottom: '0'}}/>
                          </div>
                          <LoadingBox shape='line' size='100%' background='dark' style={{height: '3.2rem'}}/>
                      </StyleRoot>
                  </div>
              </div>
          );
      }
  }
}

ItemCard.propTypes = {
    itemID: PropTypes.string.isRequired,
    departmentID: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    salePrice: PropTypes.string,
    weight: PropTypes.string
};