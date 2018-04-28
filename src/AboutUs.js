import React, { Component } from 'react';
import TextFileReader from './components/TextFileReader'
import aboutus from './images/aboutus.jpg'
import Header from './components/header';
import Footer from './components/Footer';
import Radium from 'radium';

//Team Pictures
import aayush from './images/Team/Aayush.jpg'
import ian from './images/Team/Ian.jpeg'
import jonathan from './images/Team/Jonathan.jpg'
import juan from './images/Team/Juan.jpg'
import raj from './images/Team/Raj.JPG'
import tim from './images/Team/Tim.jpg'
import daanyaal from './images/Team/Daanyaal.jpg'
import leo from './images/Team/Leo.png'


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
        transition: "filter 0.25s",
        ':hover': {
          filter: "none",
        }
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


            <div style = {divBorderW}>
              <h1 style={title}> The Team</h1>
              <div style={profileHolder}>

                <div style={eachProfile}>
                  <img src={aayush} style={profile}/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center", margin:"auto"}}>Backend Developer / Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={ian} style={profile}/>
                  <h3 style={title}>Ian Duron</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={jonathan} style={profile}/>
                  <h3 style={title}>Jonathon Wong</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={juan} style={profile}/>
                  <h3 style={title}>Juan Castillo</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={raj} style={profile}/>
                  <h3 style={title}>Raj Makda</h3>
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
                  <img src={aayush} style={profile} key= "key1"/>
                  <h3 style={title}>Aayush Dixit</h3>
                  <p style={{textAlign:"center", margin:"auto"}}>Backend Developer / Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={ian} style={profile}  key= "key2"/>
                  <h3 style={title}>Ian Duron</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={jonathan} style={profile}  key= "key3"/>
                  <h3 style={title}>Jonathan Wong</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={juan} style={profile}  key= "key4"/>
                  <h3 style={title}>Juan Castillo</h3>
                  <p style={{textAlign:"center"}}>Frontend Developer / Tester</p>
                </div>

                <div style={eachProfile}>
                  <img src={tim} style={profile}  key= "key5"/>
                  <h3 style={title}>Tim Roesner</h3>
                  <p style={{textAlign:"center"}}>Frontend Lead</p>
                </div>

                <div style={eachProfile}>
                  <img src={raj} style={profile}  key= "key6"/>
                  <h3 style={title}>Raj Makda</h3>
                  <p style={{textAlign:"center"}}>Frontend Developer / Tester</p>
                </div>

                <div style={eachProfile}>
                  <img src={daanyaal} style={profile}  key= "key7"/>
                  <h3 style={title}>Daanyaal Saeed</h3>
                  <p style={{textAlign:"center"}}>Frontend Developer / Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={leo} style={profile}  key= "key8"/>
                  <h3 style={title}>Leonardo Pangco</h3>
                  <p style={{textAlign:"center"}}>Backend Developer/Documentation</p>
                </div>

                <div style={eachProfile}>
                  <img src={raj} style={profile}/>
                  <h3 style={title}>Shayan Ahmed</h3>
                  <p style={{textAlign:"center"}}>Backend Lead</p>
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


export default Radium(AboutUs);
