import Header from './components/header';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SampleImage from './images/canned-goods.jpg'
import HorizontalScroll from './components/HorizontalScroll';

class Item extends Component {

	constructor(props) {
    super(props);

    this.state = {
      departmentItems: [],
      savingsItems: [{
        name: 'Cream Cheese',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Philly_cream_cheese.jpg/1200px-Philly_cream_cheese.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Bagel',
        image: 'https://d3cizcpymoenau.cloudfront.net/images/24017/SFS_Bagel_V2-14.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      }],
      historyItems: []
    }
  }

	render() {

		const imgDiv = {
			margin: '3%',
			width: '45%',
			height: '500px',
			float: 'left'
		}

		const astext = {
		    background:'none',
		    border:'none',
		    marginLeft:'10%',
		    width: '80px',
		    padding:'0',
		    fontSize: '1em',
			textAlign: 'center',
		}

		const price = true ? 
		(<p style={{marginTop: '5%', color: 'red', fontSize: '1.8em'}}>
			<span style={{color: 'black', textDecoration: 'line-through', webkitTextDecorationColor: 'red'}}>$27.99</span>
			&nbsp;&nbsp;$19.99
		</p>) : 
		(<p style={{marginTop: '5%', fontSize: '1.8em'}}>
			$3.79
		</p>) 

	return (
	  <div>
	    <Header />
	    <div style={imgDiv}>
	    	<img className="img-responsive" style={{width: '100%', width: '100%'}} src='https://d2d8wwwkmhfcva.cloudfront.net/1000x/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_5e16a4a1-116c-41ea-9121-33615a3bff26.jpg' />
	    </div>
	    <div style={{
	    	margin: '3%',
	    	marginLeft: '0%',
			width: '45%',
			height: '500px',
			float: 'right',
		}}>

			<h1 style={{marginTop: '0', fontSize: '2em'}}>Skyy Vodka</h1>
			<p style={{marginTop: '5%', color: 'grey', fontSize: '1.4em'}} >1.75 LTR</p>
			{price}
			<select style={{marginTop: '5%', borderColor: '#CCCCCC', webkitAppearance: 'menulist-button', height: '44px', width: '64px'}}>
    			<option value="1">1</option>
    			<option value="2">2</option>
    			<option value="3">3</option>
    			<option value="4">4</option>
    			<option value="5">5</option>
    			<option value="6">6</option>
    			<option value="7">7</option>
    			<option value="8">8</option>
    			<option value="9">9</option>
  			</select>
  			<button className="primary" style={{marginLeft: '5%', height:'46px', width: '40%'}}>Add to Cart</button>
  			<button className="primaryRedWithHover" style={astext}>
  				<i class="fa fa-th-list fa-2x" style={{width: '80px'}}/>
  				Add to List
  			</button>
  			<HorizontalScroll items={this.state.savingsItems} title="Similar Items"/>
	    </div>
	  </div>
	);
  }
}

export default withRouter(Item);