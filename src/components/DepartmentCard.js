import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';

class DepartmentCard extends Component {
  constructor(props) {
    super(props)

  }

  handleClick(dep) {
  	this.props.history.push({
		pathname: 'search',
		search: '?query='+dep+'&special=true'
	})
  }

  render() {
    var dept = this.props.department
    const gridItem = {
		  border: '1px solid #d3d3d3',
		  borderRadius: '10px',
		  fontSize: '1.4em',
		  textAlign: 'center',
		  cursor: 'pointer',
		  marginBottom: '25px',
	}

	const webkitEllipsis = {
		display: '-webkit-box',
		webkitLineClamp: '1',
		webkitBoxOrient: 'vertical',
		overflow: 'hidden'
  	}

    return(
      	<div style={gridItem} onClick={() => this.handleClick(dept.name)} >
				<img src={dept.image} style={{width: '80%', marginLeft:'20%', borderRadius: '0 10px 0 0'}} />
			     <span style={webkitEllipsis}>{dept.name}</span>
		</div>
    );
  }
}

export default withRouter(DepartmentCard);
