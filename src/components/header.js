import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';

class Header extends Component {
	constructor() {
  		super();
  		this.state = {
   			width: window.innerWidth,
				value: ''
 	 	};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

componentWillMount() {
  window.addEventListener('resize', this.handleWindowSizeChange);
}

// make sure to remove the listener
// when the component is not mounted anymore
componentWillUnmount() {
  window.removeEventListener('resize', this.handleWindowSizeChange);
}

handleWindowSizeChange = () => {
  this.setState({ width: window.innerWidth });
};

handleSearch(event) {
	//search logic
	console.log("search for "+ this.state.value);
	event.preventDefault();
};

handleSearchChange(event) {
    this.setState({value: event.target.value});
  }

showCart = () => {
	//when cart button is clicked
	console.log("cart is clicked");
};

handleAccountClick = () => {
	//when account button is clicked
	console.log("account button clicked");
}


  render() {
  const  {width}  = this.state;
  const isMobile = width <= 500;
  if (isMobile) {
    return (
      <div className="container headerbg">
				<div className="row">
					<div className="container-fluid center">
							<div style={{paddingLeft: '0'}} className="col-xs-2">
								<button onClick={this.handleAccountClick} className="btn btn-danger btn-sm"><i className="far fa-user" /></button>
							</div>
							<div id="mobile-brand" className="col-xs-8">
								<h3>WeMart</h3>
							</div>
							<div style={{paddingRight: '0'}} className="col-xs-2">
								<button onClick={this.showCart} style={{float: 'right'}} className="btn btn-danger btn-sm"><i className="fas fa-shopping-cart" /></button>
							</div>
						</div>
					</div>
				<div className="row">
					<div className="container-fluid">
						<div id="search-form" className="form-group">
							<form className="form-inline form-horizontal" onSubmit={this.handleSearch} >
									<input name="search" value={this.state.value} onChange={this.handleSearchChange} type="text" placeholder="Search" className="form-control" style={{width: '100%'}}/>
									<button type="submit" className="btn btn-danger btn-sm search-btn"><i className="fas fa-search" /></button>
								</form>
						</div>
					</div>
				</div>
				<div className="row">
						<div className="container">
							<ul id="mobile-nav" className="nav nav-tabs">
									<li className="mobile-nav-items" style={{width: '33%'}}><a href="#"><button className="astext"><i className="fas fa-th-large"></i><br /><span>Departments</span></button></a></li>
									<li className="mobile-nav-items" style={{width: '33%'}}><a href="#"><button className="astext"><i className="fas fa-tag"></i><br /><span>Savings</span></button></a></li>
									<li className="mobile-nav-items" style={{width: '33%'}}><a href="#"><button className="astext"><i className="fas fa-history"></i><br /><span>History</span></button></a></li>
							</ul>
						</div>
				</div>
			</div>
    );
  } else {
    return (
					<nav className="navbar navbar-light headerbg">
						<div className="container-fluid center">
                <div className="navbar-header" style={{width: '15%', paddingTop: '3px'}}>
                    <a className="navbar-brand center" href="/"><h3>WeMart</h3></a>
                </div>
								<ul className="nav navbar-nav" style={{width: '55%'}} >
										<form id="search-form" className="form-inline" onSubmit={this.handleSearch} >
											<input name="search" value={this.state.value} onChange={this.handleSearchChange} type="text" placeholder="Search" className="form-control" style={{width: '80%'}} />
											<button type="submit" className="btn btn-danger btn-sm"><i className="fas fa-search" /></button>
										</form>
						    </ul>
								<ul className="nav navbar-nav navbar-right center" style={{width: '30%'}}>
						      <li style={{width: '36%'}}><a href="#"><button className="astext"><i className="fas fa-map-marker" style={{marginRight: '5px'}}></i>95112</button></a></li>
						      <li style={{width: '32%'}}><a href="#"><button onClick={this.handleAccountClick} className="astext">Account</button></a></li>
						      <li style={{width: '32%'}}><a href="#"><button type="button" className="btn btn-danger" onClick={this.showCart}><i className="fas fa-shopping-cart" /><span style={{ marginRight: '8px' }} />Cart</button></a></li>
						    </ul>
						  </div>
							<ul id="pills" className="nav nav-pills center">
							  <li role="navigation"><a href="#"><button className="astext">Departments</button></a></li>
							  <li role="navigation"><a href="#"><button className="astext">Savings</button></a></li>
							  <li role="navigation"><a href="#"><button className="astext">History</button></a></li>
							</ul>
					</nav>
    			);
				}
  	}
}
export default Header;
