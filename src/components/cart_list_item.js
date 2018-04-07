import React from 'react'
import Counter from './Counter'

const CartItem = ({item}) => {
  let cartQuantity= 2;
  return (
      <li className="list-group-item">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-2">
              <img className="img-responsive" src={item.image} />
            </div>
            <div className="col-xs-3">
              <span>{item.name}</span>
              <br />
              <span style={{color: 'gray'}}>{item.quantity}</span>
            </div>
            <div className="col-xs-5">
              <Counter quantity={cartQuantity} />
            </div>
            <div className="col-xs-2">
              <div>{item.price * cartQuantity}</div>
            </div>
          </div>
        </div>
      </li>
  );
};

export default CartItem;
