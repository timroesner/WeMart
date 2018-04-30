import React from 'react';
import ScrollItem from './ScrollItem';


const HorizontalScroll = (props) => {

  const items = props.items.map(item => {
    return <ScrollItem
        item={item}
          key={item.itemid} />
  });

  const scrollWrapper = {
        backgroundColor: 'white',
        border: '2px solid #efefef',
        margin: '3%',
        borderRadius: '5px', /* 5px rounded corners */
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        
  }

  const scrollerTitle = {
    color: 'red',
    position: 'sticky',
    height: '20%',
    backgroundColor: 'white',
    padding: '0',
    borderRadius: '0',
    margin: '8px 0 12px 3%'
  }

  const wrapper = {
        overflow: 'auto',
        whiteSpace: 'nowrap',
  }

  const list = {
        position:'relative',
        left:'0px',
        top:'0px',
      	minWidth:'10px',
        height: '100%',
        width: '100%',
        float: 'none',
        alignItems: 'center',
  }

  return (
    <div style={scrollWrapper}>
      <div style={scrollerTitle} >
        <span className="lead">{props.title}</span>
        <button onClick={props.onSeeMoreClick} style={{float: 'right', background: 'none', border: 'none', paddingRight:'3%'}}>See more <i class="fas fa-chevron-right"/></button>
      </div>
      <div style={wrapper} > 
          {items}
      </div>
    </div>
  );
};

export default HorizontalScroll;
