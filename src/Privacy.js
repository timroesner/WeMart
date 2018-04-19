import React, { Component } from 'react';
import TextFileReader from './components/TextFileReader'
import aboutus from './images/aboutus.jpg'
import Header from './components/header';
import Footer from './components/Footer'

class Privacy extends Component {


  constructor(){
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    window.scrollTo(0, 0);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };



  render() {
    var myTxt = require("./text/Privacy.txt");

    const title={
      color: "white",
      margin: "0",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)",
      textAlign: "center",
    };

    const text={
      width: '80%',
      margin: 'auto',
      marginTop: '30px'
    }

    const styles={
      backgroundColor: "red",
      height: "12em",
    }

      return (
        <div>
          <Header />
            <div style={styles}>
              <h1 style={title}> Privacy </h1>
            </div>

            <div style={text}>
              <h2>Last Updated: April 19, 2018</h2>
              <TextFileReader txt={myTxt}/>
            </div>
        <Footer />
      </div>
    );

}
}


export default Privacy;
