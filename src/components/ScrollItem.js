import React,{Component} from 'react';
import ItemCard from './ItemCard';
import DepartmentCard from './DepartmentCard';

class ScrollItem extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const item = this.props.item
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

    function Items(props) {
      return <ItemCard
          itemid={item.itemid} name={item.name} image={item.image} price={item.price} inCart={item.inCart}
          weight={item.quantity} sale={item.sale} departmentid={item.departmentid} />
    }

    function Departments(props) {
      return <DepartmentCard department={props.dept} />
    }

    function RenderScrollItem(props) {
      const isDepartment = props.isDepartment
      if(isDepartment) {
        return <Departments dept={item}/>
      } else {
        return <Items />
      }
    }

    return(
      <li style={liStyle}>
        <RenderScrollItem isDepartment={item.itemid == null} />
      </li>
    );
  }
}

export default ScrollItem;
