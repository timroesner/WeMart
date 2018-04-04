import Header from './components/header';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SampleImage from './images/canned-goods.jpg'
import { Select, MenuItem } from 'ic-snacks';

class Item extends Component {

	render() {

		const imgDiv = {
			margin: '3%',
			width: '45%',
			height: '500px',
			float: 'left',
			border: 'solid', 
			borderWidth: '2px', 
			borderColor: 'black'
		}

		const price = true ? 
		(<p style={{marginTop: '5%', color: 'red', fontSize: '1.8em'}}>
			<span style={{color: 'black', textDecoration: 'line-through', webkitTextDecorationColor: 'red'}}>$3.79</span>
			&nbsp;&nbsp;$2.99
		</p>) : 
		(<p style={{marginTop: '5%', fontSize: '1.8em'}}>
			$3.79
		</p>) 

	return (
	  <div>
	    <Header />
	    <div style={imgDiv}>
	    </div>
	    <div style={{
	    	margin: '3%',
	    	marginLeft: '0%',
			width: '45%',
			height: '500px',
			float: 'right',
			border: 'solid', 
			borderWidth: '2px', 
			borderColor: 'black'}}>

			<h1 style={{marginTop: '0', fontSize: '2em'}}>Super long title that hopefully wraps around</h1>
			<p style={{marginTop: '5%', color: 'grey', fontSize: '1.4em'}} > 8 oz. </p>
			{price}
			<Select name="Amount" floatingLabelText="Amount" style={{marginTop: '5%', width: '100px'}}>
    			<MenuItem label="1" value="1"/>
    			<MenuItem label="2" value="2"/>
    			<MenuItem label="3" value="3"/>
    			<MenuItem label="4" value="4"/>
    			<MenuItem label="5" value="5"/>
    			<MenuItem label="6" value="6"/>
    			<MenuItem label="7" value="7"/>
    			<MenuItem label="8" value="8"/>
  			</Select>
	    </div>
	  </div>
	);
  }
}

export default withRouter(Item);