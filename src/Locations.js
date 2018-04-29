import React, { Component } from 'react';
import TextFileReader from './components/TextFileReader'
import location from './images/SanJose2.jpg'
import Header from './components/header';
import Footer from './components/Footer'

class Locations extends Component {
  constructor(){
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
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
    this.setState({ width: window.innerWidth, height: window.innerHeight});
  };



  render() {
    console.log(width);
    const  {width}  = this.state;
    var myTxt = require("./text/Locations.txt");


    const title={
      width: "100%",
      textAlign: 'center',
      marginTop:"3%",
      fontWeight: "500",
    };

    const imageHolder={
      overflow: "hidden",
      height: "30em",
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%)',
      webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%)',
      marginTop: '-15px',
    };

    const imageHolderSmall={
      overflow: "hidden",
      height: "10em",
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%)',
      webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%)',
      marginTop: '-15px',
    };


    const image={
      width: "100%",
    };

    const text={
      margin: '3%',
      textAlign: 'center',
    }

    const isMobile = width <= 500;
    if (isMobile) {
      return (
        <div>
          <Header />

          <div style ={{minHeight:(this.state.height-283)}}>
            <div style={imageHolderSmall}>
              <img src={location} style={image}/>
            </div>

            <div>
              <h1 style={title}>Locations</h1>
            </div>

            <div style={{textAlign: 'justify', margin: '3%'}}>
              <TextFileReader txt={myTxt}/>
            </div>
          </div>

        <Footer />
      </div>
    );
  }else{
     return (
       <div>
         <Header />

         <div style ={{minHeight:this.state.height-195}}>
           <div style={imageHolder}>
             <img src={location} style={image}/>
           </div>

           <div>
             <h1 style={title}>Locations</h1>
           </div>

           <div style={text}>
             <TextFileReader txt={myTxt}/>
           </div>
         </div>

         <Footer />
     </div>
     );
  }
}
}


export default Locations;
