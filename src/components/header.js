import React, { Component } from 'react';
import logo from '../images/logo.png'
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import './header.css'
import Cart from './Cart'
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';

//Styles
const astext = {
		background:'none',
		border:'none',
		margin:'0',
		padding:'0',
		marginTop: '14px',
		fontSize: '1.25em',
		textAlign: 'center'
}

const dropdownButton = {
	background:'none',
	border:'none',
	margin:'7.5px 0px',
	padding:'0',
	fontSize: '1.15em',
	textAlign: 'center',
	fontWeight: '200'
}

const center = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
}

const pillsLi = {
	margin: 'auto 44px',
		fontSize: '1em',
		marginBottom: '8px',
		textAlign: 'center'
}

const searchBtn = {
	position: 'absolute',
	backgroundColor: '#D30707',
	top: '0',
	right: '0',
	zIndex: '2',
	height: '34px',
	width: '50px'
}

const mobileNav = {
	display: 'inline',
	margin: '0 auto',
	padding: '0',
	display: 'block',
	listStyleType: 'disc',
	fontSize: '11px'
}

const mobileNavItems = {
	display: 'inline-block',
	height: '100%',
	textAlign: 'center',
	float: 'left',
	margin: '0',
	width: '33%'
}

const links = {
	color: '#D30707',
		fontSize: '1.25em',
	textAlign: 'center'
}

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var zip;
var cognitoUser;
var query

var query;

class Header extends Component {
	constructor(props) {
  		super(props);
  		this.state = {
   			width: window.innerWidth,
				value: '',
				cartClicked: false,
				isLoggedIn: false
 	 	};
    
    this.props.history.listen((location, action) => {
			this.getSearchValue()
		})
    
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.getCurrentUser()
		this.checkZip()
		this.getSearchValue()
		this.handleSignOut = this.handleSignOut.bind(this);
}

handleSignOut() {
    if (window.confirm('Are you sure you want to log out?')) {
      cognitoUser.signOut();
      console.log(this.props)
    } else {
      console.log('cancels')
    }
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

getSearchValue() {
	if(this.props.location !== undefined) {
		const queryParams = new URLSearchParams(this.props.location.search);
		let special = queryParams.get('special')
		if(special != "true") {
			query = queryParams.get('query')
		}
	}
}

checkZip() {
	if(localStorage.getItem('zip') == null) {
		if(cognitoUser === null) {
			this.props.history.push('/')
		} else {
			localStorage.setItem('zip', '95112')
			zip = '95112'
		}
	} else {
		zip = localStorage.getItem('zip')
	}
}

getCurrentUser() {
	// Get poolData
	var poolData;
	if(process.env.NODE_ENV === 'development'){
		poolData = require('../poolData').poolData;
	} else {
		var poolData = {
	        UserPoolId : process.env.REACT_APP_Auth_UserPoolId,
	        ClientId : process.env.REACT_APP_Auth_ClientId
	      };
	}
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

	cognitoUser = userPool.getCurrentUser();
}

handleSearch(event) {
	//search logic
	event.preventDefault();
	this.props.history.push({
		pathname: 'search',
		search: '?query='+query
	})
	window.location.reload()
};

handleSearchChange(event) {
	query = event.target.value
	this.setState({value: event.target.value})
}

showCart = () => {
	//when cart button is clicked
	console.log("cart is clicked");
	const bool = !this.state.cartClicked
	this.setState({cartClicked: bool});
	var body = document.querySelector('#pageBody')
	body.classList.add('overlay');
};

closeCart = (cartClicked) => {
	this.setState({cartClicked});
	var body = document.querySelector('#pageBody')
	body.classList.remove('overlay');
}

handleDepartments = (e) => {
	e.preventDefault()
	this.props.history.push('/departments')
}

handleHistoryClick = (e) => {
	e.preventDefault()
	this.props.history.push('/history')
}

handleZipClick = (e) => {
	e.preventDefault()
	this.props.history.push('/')
}

handleSavingsClick = (e) => {
	e.preventDefault()
	this.props.history.push({
		pathname: 'search',
		search: '?query=savings&special=true'
	})
  	window.location.reload()
}
	
    
renderAccountButton() {
	if(cognitoUser !== null) {
		return (
			<div className="dropdown">
  			<button className="dropdown-toggle primaryRedWithHover" style={astext} type="button" id="dropdownMenuHeader" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Account
    			<span className="caret"></span>
  			</button>
  			<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
			    <li><a href="/accountsettings">
						<button className="primaryRedWithHover" style={dropdownButton}>
							Account Settings</button></a></li>
			    <li><a href="/shoppinglist">
						<button className="primaryRedWithHover" style={dropdownButton}>
							Shopping Lists</button></a></li>
			    <li><a href="/login">
						<button className="primaryRedWithHover" style={dropdownButton} onClick={this.handleSignOut}>
							Sign Out</button></a></li>
  			</ul>
			</div>
		);
	} else {
		return (
			<button className="primaryRedWithHover" style={astext} onClick={() => this.props.history.push('/login')}>
				Log In
			</button>
		);
	}
}

renderMobileAccountButton() {
	if(cognitoUser !== null) {
		return (
			<div className="dropdown">
				<button className="btn btn-danger btn-sm dropdown-toggle" type="button" id="dropdownMenuHeader" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style={{backgroundColor: '#D30707'}}>
					<i class="fas fa-user"></i>
					<span className="caret"></span>
				</button>
  			<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
			    <li><a href="/accountsettings">
						<button className="primaryRedWithHover" style={dropdownButton}>
							Account Settings</button></a></li>
			    <li><a href="/shoppinglist">
						<button className="primaryRedWithHover" style={dropdownButton}>
							Shopping Lists</button></a></li>
			    <li><a href="/login">
						<button className="primaryRedWithHover" style={dropdownButton} onClick={this.handleSignOut}>
							Sign Out</button></a></li>
  			</ul>
			</div>
		);
	} else {
		return (
			<button onClick={() => this.props.history.push('/login')} className="btn btn-danger btn-sm" style={{backgroundColor: '#D30707'}} >
				<i class="fas fa-sign-in-alt"></i>
			</button>
		);
	}
}

  render() {
    
	const  {width}  = this.state;
  
  // At this value the header would be unusable anyway so better to switch to the mobile header
	const isMobile = width <= 767;
  if (isMobile) {
    return (
			<div style={{paddingBottom: '200px'}}>
		    <div className="container" style={{width: '100%', backgroundColor: '#F5F5F5',position: 'fixed', zIndex:'10'}}>
					<div className="row" style={{marginTop: '3%'}}>
						<div className="container-fluid" style={center} >

							<div style={{paddingLeft: '0'}} className="col-xs-2">
								{this.renderMobileAccountButton()}
							</div>

							<div className="col-xs-8" style={{textAlign: 'center', color: '#E6003D'}}>
								<a href="/home">
									<img src={logo} style={{height: '35px', backgroundColor: 'clear'}} />
								</a>
							</div>

							<div style={{paddingRight: '0'}} className="col-xs-2">
								<button onClick={this.showCart} style={{float: 'right', backgroundColor: '#D30707'}} className="btn btn-danger btn-sm">
									<i className="fas fa-shopping-cart" />
								</button>
							</div>

						</div>
					</div>

					<div className="row">
						<div className="container-fluid">
							<div className="form-group"  style={{position: 'relative', margin: '15px 0'}}>
								<form className="form-inline form-horizontal" onSubmit={this.handleSearch} >
									<input name="search" value={query} onChange={this.handleSearchChange} type="text" placeholder="Search" className="form-control" style={{width: '100%', fontSize: '16px'}}/>
									<button type="submit" className="btn btn-danger btn-sm" style={searchBtn}><i className="fas fa-search" /></button>
								</form>
							</div>
						</div>
					</div>

					<div className="row">
							<div className="container">
								<ul className="nav nav-tabs" style={mobileNav}>
										<li style={mobileNavItems}><a style={links} href="">
											<button style={astext} onClick={this.handleDepartments} ><i className="fas fa-th-large" /><br />
												<span>Aisles</span>
											</button></a>
										</li>

										<li style={mobileNavItems}> <a style={links} href="">
											<button style={astext} onClick={this.handleSavingsClick} ><i className="fas fa-tag" /><br />
												<span>Savings</span>
											</button></a>
										</li>

										<li style={mobileNavItems}><a style={links} href="">
											<button style={astext} onClick={this.handleHistoryClick} ><i className="fas fa-history" /><br />
												<span>History</span>
											</button></a>
										</li>
								</ul>
							</div>
					</div>
			<div>
					<ReactCSSTransitionGroup
						transitionName="slide"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>

						{this.state.cartClicked ?
						 <Cart
						 onCloseClick={(cartClicked) => this.closeCart(cartClicked)} /> :
						 null
						}
					</ReactCSSTransitionGroup>
			</div>
	</div>
</div>
    );
  } else {
    return (
    <div style={{paddingBottom: '115px'}}>
	<nav className="navbar navbar-light" style={{width: '100%', backgroundColor: '#F5F5F5', position: 'fixed', zIndex:'10', marginBottom: '115px'}}>

		<div className="container-fluid" style={center}>
			<div className="navbar-header" style={{width: '15%', paddingTop: '3px'}}>
    			<a className="navbar-brand" style={center} href="/home">
    				<img src={logo} style={{height: '35px', backgroundColor: 'clear'}} />
    			</a>
			</div>

			<ul className="nav navbar-nav" style={{width: '55%'}} >
				<form className="form-inline" onSubmit={this.handleSearch} style={{position: 'relative', margin: '15px 0'}}>
					<input name="search" value={query} onChange={this.handleSearchChange} type="text" placeholder="Search" className="form-control" style={{width: '80%'}} />
					<button type="submit" className="primary" style={{height: '34px', width: '44px', borderRadius: '4px'}}><i className="fas fa-search" /></button>
				</form>
		    </ul>

			<ul className="nav navbar-nav navbar-right" style={center, {width: '30%'}}>

		    	<li style={{width: '36%'}}>
		      		<button className="primaryRedWithHover" style={astext} onClick={this.handleZipClick}>
		      			<i className="fas fa-map-marker" /> &nbsp;
		      			{zip}
		      		</button>
		    	</li>

		      <li style={{width: '32%'}}>
		      	{this.renderAccountButton()}
		      </li>

		      <li style={{width: '32%'}}>
		      	<button type="button" className="primary" onClick={this.showCart} style={{ marginTop: '4px', height: '44px', width: '90px'}}>
		      		<i className="fas fa-shopping-cart" />
		      		<span style={{ marginRight: '8px' }} />
		      		Cart
		      	</button>
		      </li>

		    </ul>
		</div>
	    <ul id="pills" className="nav nav-pills" style={center}>
        <li role="navigation" style={pillsLi}><button className="primaryRedWithHover" style={astext} onClick={this.handleDepartments} >Departments</button></li>
        <li role="navigation" style={pillsLi}><button className="primaryRedWithHover" style={astext} onClick={this.handleSavingsClick} >Savings</button></li>
        <li role="navigation" style={pillsLi}><button className="primaryRedWithHover" style={astext} onClick={this.handleHistoryClick} >History</button></li>
	    </ul>
	</nav>
		<div>
			<ReactCSSTransitionGroup
				transitionName="slide"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}>

				{this.state.cartClicked ?
				 <Cart
				 onCloseClick={(cartClicked) => this.closeCart(cartClicked)} /> :
				 null
				}
			</ReactCSSTransitionGroup>
		</div>
	</div>
	    );
	  }
  }
}
export default withRouter(Header);
