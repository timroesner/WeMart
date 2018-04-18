import React from 'react';
import PropTypes from 'prop-types';
import {Button, LoadingBox} from 'ic-snacks';
import {StyleRoot} from "radium";
import Counter from "./Counter";
import onSaleBadge from '../images/onSaleBadge.png';
import {withRouter} from "react-router-dom";

//STYLES
//Add To cart button Style
const addToCart = {display: "inherit", margin:'0 0 auto', width:'100%'};

//Item Card Styles
const itemCard = {background:'#ffffff', width:'100%', marginBottom: '5%'};
const itemCard_cardContents = {cursor:'pointer', margin:'0 5% 1rem 5%',width:'90%',display:'block'};
const itemCard_badge = {position: 'absolute', top: '.8rem', left: '.8rem', height: '2rem', width:'10rem',
    backgroundRepeat:'no-repeat'};
const itemCard_badge_onSale = {...itemCard_badge,  backgroundImage: `url(${onSaleBadge})`, backgroundSize: 'auto 2rem'};
const itemCard_media = {margin: '0 auto'};
const itemCard_media_image = {margin:'0 auto 01rem auto', display:'block', maxWidth: '100%', paddingTop:'1rem'};
const itemCard_itemInfo = {padding: '.5rem 0 0',fontSize:'1.3rem',};
const itemCard_itemInfo_weight = {color: '#808080', fontSize:'1.1rem', margin:'0'};
const itemCard_fullItemName = {marginTop:'0', paddingBottom:'0',color:'#393939', fontWeight:'400', height:'3.6rem', overflow: 'hidden'};
const itemCard_price = {fontSize:'1.8rem', fontWeight:'400', fontFamily:'"Open Sans", "Helvetica Neue", Helvetica, sans-serif'};
const itemCard_price_sale = {color: '#FF0000', fontSize:'1.8rem',fontWeight:'600',marginRight:'.5rem'};
const itemCard_price_crossedOut = {textDecoration:'line-through',color:'#808080'};
const itemCard_buttonBar = {margin:'4% 5% 0% 5%'};

class ItemCard extends React.Component{

    constructor(props) {
        super(props)

        this.state = {inCart: 0}
    }

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
        if(this.state.inCart == 0){return(
            <div style={itemCard_buttonBar}>
                <Button style={addToCart} snacksStyle="secondary" size="small"
                        onClick={() => {this.handleAddToCart()}}>Add To Cart</Button>
            </div>
        );} else {
            return(
                <div style={itemCard_buttonBar}>
                    <Counter quantity={this.state.inCart}
                             onIncrease={this.handleIncrease}
                             onDecrease={this.handleDecrease}
                             onRemove={this.handleRemove}/>
                </div>
            );
        }
    }

    // Increases the quantity of this item in the cart
    handleIncrease = () => {
        // TODO handle increase
    };

    // Decreases teh quantity of this item by 1 in the cart.
    handleDecrease = () => {
        // TODO handle decrease
    };

    // Remove the item from the cart
    handleRemove = () => {
        this.setState({inCart: 0})
    };

    // Redirect to the item's product page.
    handleItemClicked = () => {
        this.props.history.push({
            pathname: '/item',
            search: '?id='+this.props.itemID
        })
    };

    handleAddToCart = () => {
        this.setState({inCart: 1})
    };

    render(){
        if(this.props.name){
            return (
                <div style={itemCard}>
                    <div style={itemCard_cardContents} onClick={this.handleItemClicked}>
                        {this.renderBadge()}
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
export default withRouter(ItemCard);

ItemCard.propTypes = {
    itemID: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string,
    onSelect: PropTypes.func,
    price: PropTypes.string,
    salePrice: PropTypes.string,
    quantity: PropTypes.string
};