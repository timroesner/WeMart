import React from 'react';
import ItemCard from './ItemCard';

const ScrollItem = ({item}) => {

const liStyle = {
  display:'inline-block',
  position:'relative',
  textAlign:'center',
  cursor:'pointer',
  verticalAlign:'middle',
  padding: '0 30px',
  width: '250px'
}

const footer = {
  backgroundColor: 'white',
  padding: '2.5px 15px',
  height: '30px',
  border: '0'
}

const panelStyle = {
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '5px', /* 5px rounded corners */
  width: '18rem'
}

    return (
      // <li style={liStyle}>
      //     <div className="panel panel-default" style={{panelStyle}}>
      //       <div style={{backgroundColor: 'white', padding: '2.5px 15px'}} className="panel-heading">
      //         <h5>{item.name}</h5>
      //       </div>
      //       <div className="panel-body" style={{height: '14.1rem', padding: '0'}}>
      //         <img style={{width: '100%', height: '100%'}} className="img-responsive" src={item.image} />
      //       </div>
      //       <div className="panel-footer" style={{footer}}>
      //         <p><span style={{float: 'left'}}>${item.price}</span><span style={{float: 'right'}}>{item.quantity}</span></p>
      //       </div>
      //     </div>
      // </li>
      <li style={liStyle}>
        <ItemCard
            itemID={item.itemid} name={item.name} image={item.image} price={item.price} inCart={item.inCart}
            weight={item.quantity} salePrice={item.sale} departmentid={item.departmentid} />
      </li>
    );
};

export default ScrollItem;
