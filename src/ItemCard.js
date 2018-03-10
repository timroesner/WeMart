import React from 'react';
import PropTypes from 'prop-types';
import {Button, LoadingBox} from 'ic-snacks';
import {StyleRoot} from "radium";
import './ItemCard.css';

export default class ItemCard extends React.Component{

    // Renders the item price. If sale price is zero then it renders normally. Otherwise
    // it renders the sale price in red and the original MSRP as crossed out.
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
    renderBadge(){
        if(this.props.salePrice !== "0"){
            return (
                <div className="itemCard__badge itemCard__badge--on-sale">
                </div>
            );
        }
    }

  render(){
        // If the props have a name attribute render based on data from db
      if(this.props.name){
          return (
              <div className="itemCard">
                  {this.renderBadge()}
                  <div className="itemCard__card-contents" onClick={() => {console.log("Button Click")}}>
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
                  <div className="itemCard__button-bar">
                      <Button snacksStyle="primary" size="small" onClick={() => {console.log("Button Click")}}>ADD</Button>
                  </div>
              </div>);
      } else { // No attributes to the props. Render the loading box from icsnacks
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
                          <LoadingBox shape='line' size='30%' background='dark' style={{height: '3.2rem'}}/>
                      </StyleRoot>
                  </div>
              </div>
          );
      }
  }
}

ItemCard.propTypes = {
    name: PropTypes.string,
    weight: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    departmentid: PropTypes.string,
    salePrice: PropTypes.string
};