import React from 'react';
import ScrollItem from './ScrollItem';


const HorizontalScroll = (props) => {

  const items = props.items.map(item => {
    return <ScrollItem
      //onItemSelect={props.onVideoSelect}
      key={item.itemid}
      item={item} />
  });

  return (
    <div className="scrollWrapper">
      <div className="scroller-title">
        <h4>{props.title}</h4>
      </div>
      <div className="wrapper">
        <ul className="nav list" id="myTab">
          {items}
        </ul>
        </div>
      </div>
  );
};

export default HorizontalScroll;
