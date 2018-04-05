import React from 'react';
import PropTypes from 'prop-types';
import {Button, LoadingBox} from 'ic-snacks';
import {StyleRoot} from "radium";
import Counter from "./Counter";
import onSaleBadge from '../images/onSaleBadge.png';
import {withRouter} from "react-router-dom";

//STYLES
//Add To cart button Style
const addToCart = {width: "100%", display: "inherit"};
//Item Card Styles
const itemCard = {background:'#ffffff', width:'20.8rem', height:'35.2rem'};
const itemCard_cardContents = {cursor:'pointer', margin:'0 auto 1rem auto',maxWidth:'15.8rem',display:'block'};
const itemCard_badge = {position: 'absolute', top: '.8rem', left: '.8rem', height: '2rem', width:'10rem', zIndex: '1',
backgroundRepeat:'no-repeat'};
const itemCard_badge_onSale = {...itemCard_badge,  backgroundImage: `url(${onSaleBadge})`, backgroundSize: 'auto 2rem'};
const itemCard_media = {margin: '0 auto'};
const itemCard_media_image = {margin:'0 auto 01rem auto', display:'block', maxHeight:'15.5rem', maxWidth: '15.5rem', paddingTop:'1rem'};
const itemCard_itemInfo = {padding: '.5rem 0 0',fontSize:'1.3rem'};
const itemCard_itemInfo_weight = {color: '#778899', fontSize:'1.1rem', margin:'0'};
const itemCard_fullItemName = {marginTop:'0', paddingBottom:'0',color:'#393939', fontWeight:'400', height:'3.6rem',
fontFamily: 'Open Sans", "Helvetica Neue", Helvetica, sans-serif'};
const itemCard_price = {fontSize:'2rem', fontWeight:'700', fontFamily:'"Open Sans", "Helvetica Neue", Helvetica, sans-serif'};
const itemCard_price_sale = {color: '#FF0000', fontSize:'2.1rem',fontWeight:'800',marginRight:'.5rem'};
const itemCard_price_crossedOut = {textDecoration:'line-through'};
const itemCard_buttonBar = {margin:'.5rem 2.5rem'};
const itemCard_buttonBar_addToCard = {width:'100%',display:'inherit'};
const itemCard_loadingBox = {maxHeight:'1.8rem'};


export default class ItemCard extends React.Component{

    // Renders the item price.
    // If sale price is zero then it renders normally, otherwise
    // it renders the sale price in red and the original MSRP with a strike-through.
    renderPrice(){
        if(this.props.salePrice !== "0") {
            return (
                <div style={itemCard_price}>
                    <span style={itemCard_price_sale}>${this.props.salePrice}</span>
                    <span style={itemCard_price_crossedOut} >${this.props.price}</span>
                </div>
            );
        } else {
            return <span style={itemCard_price}>${this.props.price}</span>;
        }
    }

    // Places a badge to the top right of the item to indicate any special properties of the item.
    // Currently "On Sale" is the only badge.
    renderBadge(){
        if(this.props.salePrice !== "0"){
            return (
                <div style={itemCard_badge_onSale}>
                </div>
            );
        }
    }

    // Renders the items button bar. By default this includes the counter
    renderButtonBar(){
        if(this.props.inCart === 0){return(
            <div style={itemCard_buttonBar}>
                <Button style={addToCart} snacksStyle="secondary" size="small"
                         onClick={() => {this.handleAddToCart()}}>ADD</Button>
            </div>
        );} else {
            return(
                <div style={itemCard_buttonBar}>
                    <Counter quantity={this.props.inCart}
                             onIncrease={this.handleIncrease}
                             onDecrease={this.handleDecrease}
                             onRemove={this.handleRemove}/>
                </div>
            );
        }
    }

    // Increases the quantity of this item in the cart
    handleIncrease = () => {
        this.props.onQuantityIncrease();
    };

    // Decreases teh quantity of this item by 1 in the cart.
    handleDecrease = () => {
        this.props.onQuantityDecrease();
    };

    // Remove the item from the cart
    handleRemove = () => {
        this.props.onQuantityRemove();
    };

    // Redirect to the item's product page.
    handleItemClicked = () => {
        // When the item card has been clicked.
        //TODO redirect to the item's product page.
        console.log(this.props.name + "Item card clicked");
    };

    handleAddToCart = () => {
        this.props.onAddToCart();
    };

  render(){
      if(this.props.name){
          return (
              <div style={itemCard}>
                  {this.renderBadge()}
                  <div style={itemCard_cardContents} onClick={() => {this.handleItemClicked()}}>
                      <div style={itemCard_media}>
                          <img src={this.props.image} alt={this.props.name} style={itemCard_media_image}/>
                      </div>
                      <div style={itemCard_itemInfo}>
                          <div style={itemCard_fullItemName}>
                    <span>
                        {this.props.name}
                    </span>
                          </div>
                          {this.renderPrice()}
                          <p style={itemCard_itemInfo_weight}>
                              {this.props.weight}
                          </p>
                      </div>
                  </div>
                  {this.renderButtonBar()}
              </div>);
      } else { // No attributes to the props. Render the loading box from IC Snacks
          return (
              <div style={itemCard}>
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
    image: PropTypes.string,
    name: PropTypes.string,
    onSelect: PropTypes.func,
    inCart: PropTypes.number, //The quantity of this item that is in the cart
    onQuantityIncrease: PropTypes.func,
    onQuantityDecrease: PropTypes.func,
    onQuantityRemove: PropTypes.func,
    onAddToCart: PropTypes.func,
    price: PropTypes.string,
    salePrice: PropTypes.string,
    weight: PropTypes.string
};