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
        margin: '30px',
        borderRadius: '5px', /* 5px rounded corners */
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
  }

  const scrollerTitle = {
    color: '#E6003D',
    height: '20%',
    paddingLeft: '30px',
    marginLeft:'12px',
    marginBotton: '20px'
  }

  const wrapper = {
        position:'relative',
        margin:'0 auto',
        overflow:'hidden',
        paddingTop: '20px',
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        alignItems: 'center'
  }

  const list = {
        position:'relative',
        left:'0px',
        top:'0px',
      	minWidth:'10px',
        height: '100%',
        float: 'none',
        alignItems: 'center',
  }

  return (
    <div style={scrollWrapper}>
      <div style={scrollerTitle}>
        <h4 style={{fontSize: '2em'}}>{props.title}</h4>
      </div>
      <div style={wrapper}>
        <ul className="nav" style={list}>
          {items}
        </ul>
        </div>
      </div>
  );
};

export default HorizontalScroll;
