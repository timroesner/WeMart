import React from 'react';
import CartListItem from './cart_list_item';

const CartList = (props) => {
  const items = props.items.map(item => {
    console.log("In CartList item id "+ item.itemID);
    return <CartListItem
      key={item.itemID}
      item={item} />
  });

  return (
    <ul className='list-group'>
      {items}
    </ul>
  );
};

export default CartList;
