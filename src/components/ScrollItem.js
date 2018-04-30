import React,{Component} from 'react';
import ItemCard from './ItemCard';
import DepartmentCard from './DepartmentCard';

class ScrollItem extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const item = this.props.item

    var liStyle = {}

    if(window.innerWidth < 550) {
      liStyle = {
        display:'inline-block',
        position:'relative',
        cursor:'pointer',
        verticalAlign:'middle',
        padding: '0 3%',
        width: '150px',
        whiteSpace: 'initial',
        textAlign: 'center',
      }
    } else {
      liStyle = {
        display:'inline-block',
        position:'relative',
        cursor:'pointer',
        verticalAlign:'middle',
        padding: '0 3%',
        width: '250px',
        whiteSpace: 'initial',
        textAlign: 'center',
      }
    }

    function Items(props) {
      return <ItemCard
          itemid={item.itemid} name={item.name} image={item.image} price={item.price} quantityInCart={item.quantityInCart}
          quantity={item.quantity} sale={item.sale} department={item.department} />
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
