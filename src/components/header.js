import React, { Component } from 'react';
import logo from '../images/logo.png'
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import './header.css'
import Cart from './Cart'

class Header extends Component {
	constructor() {
  		super();
  		this.state = {
   			width: window.innerWidth,
				value: '',
				cartClicked: false
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
	const bool = !this.state.cartClicked
	this.setState({cartClicked: bool});
};

handleAccountClick = () => {
	//when account button is clicked
	console.log("account button clicked");
}

handleDepartments = () => {
	this.props.history.push('/departments')
}

handleZipClick = () => {
	this.props.history.push('/')
}


  render() {
  const  {width}  = this.state;
	const center = {
		  display: 'flex',
		  justifyContent: 'center',
		  alignItems: 'center'
	}
	const astext = {
	    background:'none',
	    border:'none',
	    margin:'0',
	    padding:'0',
	    marginTop: '14px',
	    fontSize: '1.25em',
		textAlign: 'center',
	}

	const pillsLi = {
		margin: 'auto 44px',
	    fontSize: '1em',
	    marginBottom: '8px',
	    textAlign: 'center'
	}

	const searchBtn = {
		position: 'absolute',
		backgroundColor: 'red',
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
		color: 'red',
	    fontSize: '1.25em',
		textAlign: 'center'
	}

  const isMobile = width <= 500;
  if (isMobile) {
    return (
			<div>
			<div style={{paddingBottom: '200px'}}>
		    <div className="container" style={{width: '100%', backgroundColor: '#F5F5F5',position: 'fixed', zIndex:'10'}}>
					<div className="row" style={{marginTop: '3%'}}>
						<div className="container-fluid" style={center} >

							<div style={{paddingLeft: '0'}} className="col-xs-2">
								<button onClick={this.handleAccountClick} className="btn btn-danger btn-sm" style={{backgroundColor: 'red'}} >
									<i className="far fa-user" />
								</button>
							</div>

							<div className="col-xs-8" style={{textAlign: 'center', color: '#E6003D'}}>
								<img src={logo} style={{height: '35px', backgroundColor: 'clear'}} />
							</div>

							<div style={{paddingRight: '0'}} className="col-xs-2">
								<button onClick={this.showCart} style={{float: 'right', backgroundColor: 'red'}} className="btn btn-danger btn-sm">
									<i className="fas fa-shopping-cart" />
								</button>
							</div>

						</div>
					</div>

					<div className="row">
						<div className="container-fluid">
							<div className="form-group"  style={{position: 'relative', margin: '15px 0'}}>
								<form className="form-inline form-horizontal" onSubmit={this.handleSearch} >
									<input name="search" value={this.state.value} onChange={this.handleSearchChange} type="text" placeholder="Search" className="form-control" style={{width: '100%'}}/>
									<button type="submit" className="btn btn-danger btn-sm" style={searchBtn}><i className="fas fa-search" /></button>
								</form>
							</div>
						</div>
					</div>

					<div className="row">
							<div className="container">
								<ul className="nav nav-tabs" style={mobileNav}>
										<li style={mobileNavItems}><a style={links} href="#">
											<button style={astext}><i className="fas fa-th-large" /><br />
												<span>Aisles</span>
											</button></a>
										</li>

										<li style={mobileNavItems}> <a style={links} href="#">
											<button style={astext}><i className="fas fa-tag" /><br />
												<span>Savings</span>
											</button></a>
										</li>

										<li style={mobileNavItems}><a style={links} href="#">
											<button style={astext}><i className="fas fa-history" /><br />
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
						 onCloseClick={(cartClicked) => this.setState({cartClicked})} /> :
						 null
						}
					</ReactCSSTransitionGroup>
			</div>
		</div>

		<div className="row">
				<div className="container">
					<ul className="nav nav-tabs" style={mobileNav}>
							<li style={mobileNavItems}><a style={links} href="#">
								<button style={astext} onClick={this.handleDepartments}><i className="fas fa-th-large" /><br />
									<span>Aisles</span>
								</button></a>
							</li>

							<li style={mobileNavItems}> <a style={links} href="#">
								<button style={astext}><i className="fas fa-tag" /><br />
									<span>Savings</span>
								</button></a>
							</li>

							<li style={mobileNavItems}><a style={links} href="#">
								<button style={astext}><i className="fas fa-history" /><br />
									<span>History</span>
								</button></a>
							</li>
					</ul>
				</div>
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
    			<a className="navbar-brand" style={center} href="/">
    				<img src={logo} style={{height: '35px', backgroundColor: 'clear'}} />
    			</a>
			</div>

			<ul className="nav navbar-nav" style={{width: '55%'}} >
				<form className="form-inline" onSubmit={this.handleSearch} style={{position: 'relative', margin: '15px 0'}}>
					<input name="search" value={this.state.value} onChange={this.handleSearchChange} type="text" placeholder="Search" className="form-control" style={{width: '80%'}} />
					<button type="submit" className="primary" style={{height: '34px', width: '44px', borderRadius: '4px'}}><i className="fas fa-search" /></button>
				</form>
		    </ul>

			<ul className="nav navbar-nav navbar-right" style={center, {width: '30%'}}>

		    	<li style={{width: '36%'}}>
		      		<button className="primaryRedWithHover" style={astext} onClick={this.handleZipClick}>
		      			<i className="fas fa-map-marker" style={{marginRight: '5px'}} />
		      			<span style={{ marginRight: '4px' }} />
		      			95112
		      		</button>
		    	</li>

		      <li style={{width: '32%'}}>
		      	<button className="primaryRedWithHover" onClick={this.handleAccountClick} style={astext}>
		      		Account
		      	</button>
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
			<li role="navigation" style={pillsLi}><button className="primaryRedWithHover" style={astext}>Savings</button></li>
			<li role="navigation" style={pillsLi}><button className="primaryRedWithHover" style={astext}>History</button></li>
	    </ul>
	</nav>
		<div>
			<ReactCSSTransitionGroup
				transitionName="slide"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}>

				{this.state.cartClicked ?
				 <Cart
				 onCloseClick={(cartClicked) => this.setState({cartClicked})} /> :
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
