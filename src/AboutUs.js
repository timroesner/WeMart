import React, { Component } from 'react';
import TextFileReader from './components/TextFileReader'
import aboutus from './images/aboutus.jpg'
import Header from './components/header';
import Footer from './components/Footer';


class AboutUs extends Component {


  constructor(){
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
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
    this.setState({ width: window.innerWidth, height: window.innerHeight, });
  };



  render() {
    const  width  = this.state.width;
    const  height  = this.state.height;
    console.log(width);
    console.log(height);
    var myTxt = require("./text/About.txt");

    const title={
      width: "100%",
      textAlign: 'center',
      marginTop:"0.5em",
      fontWeight: "500",
    };

    const imageHolder={
      overflow: "hidden",
      height: "25em",
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 30%, 50% 100%, 0% 30%)',
    };

    const imageHolderSmall={
      overflow: "hidden",
      height: "10em",
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

          <div style ={{minHeight:(this.state.height-260)}}>
            <div style={imageHolderSmall}>
              <img src={aboutus} style={image}/>
            </div>

            <div>
              <h1 style={title}> About Us </h1>
            </div>

            <div style={text}>
              <TextFileReader txt={myTxt}/>
            </div>
          </div>

          <Footer />
        </div>
    );
  }else{
     return (
       <div >
         <Header />

         <div style ={{minHeight:this.state.height-201}}>
           <div style={imageHolder}>
             <img src={aboutus} style={image}/>
           </div>

           <div>
             <h1 style={title}> About Us </h1>
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


export default AboutUs;
