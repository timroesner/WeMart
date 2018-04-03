import React, { Component } from 'react';

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
	const center = {
		  display: 'flex',
		  justifyContent: 'center',
		  alignItems: 'center'
	}
	const astext = {
	    background:'none',
	    border:'none',
	    margin:'0',
	    padding:'0'
	}

	const pillsLi = {
		margin: 'auto 15px',
	  fontSize: '1em'
	}

	const searchBtn = {
		position: 'absolute',
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
		color: '#E6003D',
	  fontSize: '1.25em',
		textAlign: 'center'
	}

  const isMobile = width <= 500;
  if (isMobile) {
    return (
      <div className="container" style={{backgroundColor: '#F5F5F5'}}>
				<div className="row">
					<div className="container-fluid" style={center} >
							<div style={{paddingLeft: '0'}} className="col-xs-2">
								<button onClick={this.handleAccountClick} className="btn btn-danger btn-sm"><i className="far fa-user" /></button>
							</div>
							<div className="col-xs-8" style={{textAlign: 'center', color: '#E6003D'}}>
								<h3>WeMart</h3>
							</div>
							<div style={{paddingRight: '0'}} className="col-xs-2">
								<button onClick={this.showCart} style={{float: 'right'}} className="btn btn-danger btn-sm"><i className="fas fa-shopping-cart" /></button>
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
									<li style={mobileNavItems}><a style={links} href="#"><button style={astext}><i className="fas fa-th-large"></i><br /><span>Departments</span></button></a></li>
									<li style={mobileNavItems}><a style={links} href="#"><button style={astext}><i className="fas fa-tag"></i><br /><span>Savings</span></button></a></li>
									<li style={mobileNavItems}><a style={links} href="#"><button style={astext}><i className="fas fa-history"></i><br /><span>History</span></button></a></li>
							</ul>
						</div>
				</div>
			</div>
    );
  } else {
    return (
					<nav className="navbar navbar-light" style={{backgroundColor: '#F5F5F5'}}>
						<div className="container-fluid" style={center}>
                <div className="navbar-header" style={{width: '15%', paddingTop: '3px'}}>
                    <a className="navbar-brand" style={center} href="/"><h3 style={links}>WeMart</h3></a>
                </div>
								<ul className="nav navbar-nav" style={{width: '55%'}} >
										<form className="form-inline" onSubmit={this.handleSearch} style={{position: 'relative', margin: '15px 0'}}>
											<input name="search" value={this.state.value} onChange={this.handleSearchChange} type="text" placeholder="Search" className="form-control" style={{width: '80%'}} />
											<button type="submit" className="btn btn-danger btn-sm"><i className="fas fa-search" /></button>
										</form>
						    </ul>
								<ul className="nav navbar-nav navbar-right" style={center, {width: '30%'}}>
						      <li style={{width: '36%'}}><a style={links} href="#"><button style={astext}><i className="fas fa-map-marker" style={{marginRight: '5px'}}></i>95112</button></a></li>
						      <li style={{width: '32%'}}><a style={links} href="#"><button onClick={this.handleAccountClick} style={astext}>Account</button></a></li>
						      <li style={{width: '32%'}}><a href="#"><button type="button" className="btn btn-danger" onClick={this.showCart}><i className="fas fa-shopping-cart" /><span style={{ marginRight: '8px' }} />Cart</button></a></li>
						    </ul>
						  </div>
							<ul id="pills" className="nav nav-pills" style={center}>
							  <li role="navigation" style={pillsLi}><a style={links} href="#"><button style={astext}>Departments</button></a></li>
							  <li role="navigation" style={pillsLi}><a style={links} href="#"><button style={astext}>Savings</button></a></li>
							  <li role="navigation" style={pillsLi}><a style={links} href="#"><button style={astext}>History</button></a></li>
							</ul>
					</nav>
    			);
				}
  	}
}
export default Header;
