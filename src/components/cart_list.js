import React from 'react';
import CartListItem from './cart_list_item';

const CartList = (props) => {
  const items = props.items.map(item => {
    return <CartListItem
      key={item.id}
      item={item} />
  });

  return (
    <ul className='list-group'>
      {items}
    </ul>
  );
};

export default CartList;
