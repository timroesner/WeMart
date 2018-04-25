import React, { Component } from 'react';
import TextFileReader from './components/TextFileReader'
import aboutus from './images/aboutus.jpg'
import aayush from './images/Team/Aayush.jpg'
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
      marginBottom:"0.5em",
      fontWeight: "500",
    };

    const imageHolder={
      overflow: "hidden",
      height: "25em",
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 30%, 50% 100%, 0% 30%)',
    };

    const profileHolder={
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    };

    const imageHolderSmall={
      overflow: "hidden",
      height: "10em",
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 30%, 50% 100%, 0% 30%)',
    };

    const image={
      width: "100%",
    };

    const profile={
      width: "70%",
      clipPath: 'circle(45%)',
      filter: "grayscale(100%)",
      display: "block",
      margin: "auto",
    };

    const text={
      width: '60%',
      margin: 'auto',
    }

    const divBorderW={
      borderBottom: "0.5px solid rgba(238,245,244,1)",
      width: "100%",
      backgroundColor: "#FFFFFF"
    }

    const divBorderG={
      borderTop: "0.5px solid rgba(238,245,244,1)",
      borderBottom: "0.5px solid rgba(238,245,244,1)",
      width: "100%",
      backgroundColor: "#FCFCFC"
    }

    const eachProfile={
      width:"20em",
      display: "inline-block",
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

            <div style = {divBorderW}>
              <div>
                <h1 style={title}> About Us </h1>
              </div>

              <div style={text}>
                <TextFileReader txt={myTxt}/>
              </div>
            </div>


            <div style = {divBorderG}>
              <h1 style={title}> The Team</h1>
              <div style={profileHolder}>

                <div stlyle={eachProfile}>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer / Documentation</p>
                </div>

                <div>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

              </div>
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

            <div style = {divBorderW}>
              <div>
                <h1 style={title}> About Us </h1>
              </div>

              <div style={text}>
                <TextFileReader txt={myTxt}/>
              </div>
            </div>

            <div style = {divBorderG}>
              <h1 style={title}> The Team</h1>
              <div style={profileHolder}>

                <div style={eachProfile}>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center", margin:"auto"}}>Backend Developer / Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    }
  }
}


export default AboutUs;
