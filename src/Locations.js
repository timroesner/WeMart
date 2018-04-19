import React, { Component } from 'react';
import TextFileReader from './components/TextFileReader'
import location from './images/SanJose.jpg'
import Header from './components/header';
import Footer from './components/Footer'

class Locations extends Component {
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
    console.log(width);
    const  {width}  = this.state;
    var myTxt = require("./text/Locations.txt");
    const title={
      width: "100%",
      textAlign: 'center',
      fontFamily: 'calibri',
      marginTop:"0.5em",
    };

    const imageHolder={
      overflow: "hidden",
      height: "25em",
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 30%, 50% 100%, 0% 30%)',
        };

    const image={
      width: "100%",
    };

    const text={
      width: '80%',
      margin: 'auto',
    }

    const isMobile = width <= 500;
    if (isMobile) {
      return (
        <div>
          <Header />

        <div style={{height: "10em",}}>
          <img src={location} style={image}/>
        </div>

        <div>
          <h1 style={title}> About Us </h1>
        </div>

        <div style={text}>
          <TextFileReader txt={myTxt}/>
        </div>

        <Footer />
      </div>
    );
  }else{
     return (
       <div>
         <Header />

       <div style={imageHolder}>
         <img src={location} style={image}/>
         </div>

       <div>
         <h1 style={title}>Locations</h1>
       </div>

       <div style={text}>
         <TextFileReader txt={myTxt}/>
       </div>

       <Footer />
     </div>
     );
  }
}
}


export default Locations;
