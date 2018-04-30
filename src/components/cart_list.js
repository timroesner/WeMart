import React from 'react';
import CartListItem from './cart_list_item';
import itemsEmpty from '../images/items_empty.png'

const CartList = (props) => {
  const items = props.items.map((item) => {
    return <CartListItem
      handleRemove={props.handleRemove}
      handleIncrease={props.handleIncrease}
      handleDecrease={props.handleDecrease}
      key={item.itemID}
      item={item} />
  });

  if(props.items.length === 0) {
    return(
    <div>
      <div style={{textAlign: 'center', marginTop: '25%'}}>
        <img src={itemsEmpty} style={{}}/>
        <h1>No Items</h1>
      </div>
    </div>
    )
  } else {
    return(
    <ul className='list-group' style={{lineHeight: '20px'}}>
      {items}
    </ul>
    )
  }
};

export default CartList;
