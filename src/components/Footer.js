import React, { Component } from 'react';
import '../App.css';
class Footer extends Component {



  constructor(){
    super();

  }


  render() {
    const divStyle={
      backgroundColor: 'red',
      bottom: 0,
      width: "100%",
      color: "white",
      textAlign: 'left',
    };


    return (
      <div style={divStyle}>

        <div>
          <ul class="footer">
            <li><a href="#">About Us</a></li>

            <li><a href="#">Contact Us</a></li>

            <li><a href="#">Locations</a></li>

            <li><a href="#">Privacy</a></li>

            <li><a href="#">Terms</a></li>
          </ul>

        </div>

        <div>
          <p style={{textAlign: 'center',}}> Copyright © 2018 WeMart Inc.</p>
        </div>

      </div>
    );
  }
}

Footer.propTypes = {
  //categories: PropTypes.array,
  //addProject: PropTypes.func
}

export default Footer;