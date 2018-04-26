import React,{Component} from 'react';

class DepartmentCard extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    var dept = this.props.department
    const gridItem = {
		  border: '1px solid #d3d3d3',
		  borderRadius: '10px',
		  fontSize: '1.4em',
		  textAlign: 'center',
		  marginBottom: '5vw',
		  height: 'minmax(150px, 1fr)',
		  cursor: 'pointer',
		}

    return(
      <div style={gridItem} >
				<img src={dept.image} style={{width: '80%', marginLeft:'20%', borderRadius: '0 10px 0 0'}} />
			     <span style={{display: 'block'}}>{dept.name}</span>
			</div>
    );
  }
}

export default DepartmentCard;
