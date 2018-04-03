import React from 'react';

const ScrollItem = ({item}) => {
    return (
      <li>
          <div className="panel panel-default">
            <div id="panel-header" className="panel-heading">
              <h5>{item.name}</h5>
            </div>
            <div className="panel-body">
              <img className="img-responsive" src={item.image} />
            </div>
            <div className="panel-footer">
              <p><span className="item-price">${item.price}</span><span className="item-quantity">{item.quantity}</span></p>
            </div>
          </div>
      </li>
    );
};

export default ScrollItem;
