import React from 'react'

const CartItem = ({item}) => {

  const itemStyle = {
    padding: '20px 30px',
    height: '120px',
    display: 'flex'
  }

  const description = {
    paddingTop: '10px',
    marginRight: '60px',
    width: '115px'
  }

  const descriptionSpan = {
    display: 'block',
    fontSize: '14px',
    color: '#43484D',
    fontWeight: '400'
  }
  const totalPrice = {
    width: '83px',
    paddingTop: '27px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#43484D',
    fontWeight: '300'
  }

  const deleteButton = {
    background:'none',
    border:'none',
    Cursor: 'pointer',
    width: '18px',
    height: '17px',
  }
  return (
      <li className="list-group-item">
        <div style={itemStyle}>
          <div style={{marginRight: '50px'}}>
            <img style={{width: '100%', height: '100%'}} className="img-responsive" src={item.image} />
          </div>
          <div style={description}>
            <span style={descriptionSpan}>{item.name}</span>
          </div>
          <div style={{paddingTop: '20px', marginRight: '60px'}}>
            <input type="number" name="quantity" min="1" max="25" />
          </div>
          <div style={totalPrice}>
            {item.price}
          </div>
        </div>
      </li>
  );
};

export default CartItem;
