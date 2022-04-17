
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Container,Navbar,Nav} from "react-bootstrap"
import Radium,{StyleRoot} from "radium"
import { fadeIn,fadeOut,fadeInUp,fadeInRight } from 'react-animations'
import VisibilitySensor from 'react-visibility-sensor';
import $ from 'jquery'
import Map from './cards/map.js'
import YoutubeEmbeded from './cards/youtube.js'
import "../css/bootstrap.min.css"
import "../css/style.css"
import "../css/font-awesome.min.css"
import "../css/component.css"
import "../css/owl.carousel.css"
import "../css/owl.theme.css"
import "../css/style.css"
import "../css/green.css"
import playImage from '../images/play.png'
import Person from '../images/person.jpeg'
import Settings from '../images/setttings.png'
import LoginModal from './cards/loginModal.jsx'
import { withRouter } from '../js/withRouter.js';

const styles = {
    fadeInRight: {
      animation: 'x 2s',
      animationName: Radium.keyframes(fadeInRight, 'fadeInRight')
    },
    fadeInAppDescription: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
      },
      fadeUpGrids: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
      },
  }

 class Index extends Component {

    

    state = {
        visibility: false,
        showVideo : false,
        modalShow : false
      }



      onHide(e){
        e.setState({
            modalShow : false
        })
    }
      fadeServices = () =>{
        const elem = document.getElementById("services");
        const rect = elem.getBoundingClientRect();
        var navTop = $('nav').offset().top
        $('.nav').find("a").hover(function(){
            $(this).mouseenter(function(){
                $(this).css("color" , "#77dfa2" )
            })
            $(this).mouseleave(function(){
                if(navTop < 100){
                    $(this).css("color" , "white" )
                }
                else {
                    $(this).css("color" , "black" )
                }
            })
        })
        if (navTop > 100) {
            $('nav').css("backgroundColor","white")
            $('nav').css("boxShadow","0 2px 4px 0 rgba(0,0,0,.2)")
            $('#logo').css("color","black")
            $('.nav').find("a").css("color","black")
        }
        else if (navTop < 100) {
            $('nav').css("backgroundColor","transparent")
            $('#logo').css("color","white")
            $('.nav').find("a").css("color","white")
            $('nav').css("boxShadow","0 2px 4px 0 transparent")
        }
        if(rect.y <= 496 && !this.state.visibility){
            this.setState({ visibility : !this.state.visibility})
            console.log("message shown")
            // document.getElementById('services').style = styles.fadeUpGrids
        }

        
          
      }

      componentDidMount(){
        
        document.addEventListener('scroll',this.fadeServices)
      }

      componentWillUnmount(){
          document.removeEventListener('scroll',this.fadeServices)
      }

  render() {
    return (
        <StyleRoot>
        <div>

            <div className="application">
                <Helmet>
                    <meta  charSet='UTF-8' />
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <title>M-AUTOMATE</title>
                    <link href='http://fonts.googleapis.com/css?family=Signika+Negative:300,400,600,700' rel='stylesheet' type='text/css' />
                    <link href='http://fonts.googleapis.com/css?family=Kameron:400,700' rel='stylesheet' type='text/css' />
                    {/* <script src="../js/jquery.min.js" type='javascript' ></script>
                    <script src="../js/jquery.nav.js" type='javascript' ></script> */}
                </Helmet>
                
            </div>
            

            <Navbar bg="dark"  variant="dark" sticky='top' className='l_navbar-custom'  >
                    <Container>
                        <Navbar.Brand href="#home"  id='index_logo' >M-AUTOMATE</Navbar.Brand>
                        <Navbar.Collapse className="me-auto justify-content-end">
                            <Nav.Link href="#home" className='nav_elem' >HOME</Nav.Link>
                            <Nav.Link href="#services" className='nav_elem' >SERVICES</Nav.Link>
                            <Nav.Link href="#about-us" className='nav_elem' >ABOUT US</Nav.Link>
                            <Nav.Link href="#contact" className='nav_elem' >CONTACT</Nav.Link>
                            <Nav.Link  className='nav_elem'  onClick={()=>this.setState({modalShow : true})} >Login</Nav.Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <LoginModal modalShow={this.state.modalShow} onHide={this.onHide} this={this}  />

            <section className="main-home" id="home">
                <div className="home-page-photo"></div> 
                <div style={styles.fadeInAppDescription}  >

                    <Box sx={{ flexGrow: 1,marginTop : -20 }}>
                    <Grid container spacing={2}>
                            <Grid item xs={5}  >
                                <div className='left-grid-bg' >
                                    <div>
                                        <p id='left-grid-bg-Text-1' >Groupe M-AUTOMATE</p>
                                    </div>
                                    <div>
                                        <p id='left-grid-bg-Text-2' >là pour vous servir au mieux</p>
                                    </div>
                                    <div id='left-grid-bg-round-div' >
                                        <img src={playImage} id='playImage' alt="watch" />
                                        <div onClick={()=>{this.setState({showVideo : true})}} >
                                            <p id='left-grid-bg-round-div-text' >Watch</p>
                                        </div>
                                    </div>
                                </div>

                            </Grid>

                        <Grid item xs={6}>
                            <div className='youtube-embed' style={!this.state.showVideo ? {display : "none"} : [styles.fadeInAppDescription ,{display : "block"} ] }   >
                                <YoutubeEmbeded embedId='KkFt7OGMjCM' width='400' height='400' />
                            </div>
                        </Grid>

                    </Grid>
                    </Box>
                    </div>
            </section>


            <section id="services"  style={!this.state.visibility ? {backgroundColor : '#77dfa2'} : [{backgroundColor : 'white',transition :  'ease-in',transitionDuration : '600ms'}]  } >
                <div className="container" id='services-div'  style={!this.state.visibility ? {opacity : 0} : [styles.fadeUpGrids,{opacity : 1,transition :  'ease-in',transitionDuration : '600ms'}]  } >
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="title text-center">Best Services</h3>
                            <div className="titleHR"><span></span></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Settings} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Creative Ideas</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Settings} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Rapid Solution</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Settings} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Magic Touch</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>
                    </div> 

                    <div className="row">
                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Settings} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Creative Ideas</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Settings} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Rapid Solution</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Settings} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Magic Touch</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div> 
            </section>


            <section id="about-us"  >
                <div className="container" id='services-div'   >
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="title text-center">About Us</h3>
                            <div className="titleHR"><span></span></div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Person} alt='' style={{height : 150,weight : 150}}   />
                                    </div>
                                    <h5>Gregoire Person</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Person} alt='' style={{height : 150,weight : 150}}   />
                                    </div>
                                    <h5>Gregoire Person</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={Person} alt='' style={{height : 150,weight : 150}}   />
                                    </div>
                                    <h5>Gregoire Person</h5>
                                    <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                                </div>
                            </div>
                        </div>
                    </div> 

                    
                </div> 
            </section>

                <section id="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="title text-center">Contact Us</h3>
                                <div className="titleHR"><span></span></div>

                                <form role="form" name="ajax-form" id="ajax-form"   className="form-main">
                                    <div className="col-xs-12">
                                        <div className="row">
                                            <div className="form-group col-xs-6">
                                                <label htmlFor="name2">Name</label>
                                                <input className="form-control" id="name2" name="name"  type="text" placeholder="Name" />
                                                    <div className="error" id="err-name" >Please enter name</div>
                                            </div>
                                            <div className="form-group col-xs-6">
                                                <label htmlFor="email2">Email</label>
                                                <input className="form-control" id="email2" name="email" type="text"  placeholder="E-mail" />
                                                    <div className="error" id="err-emailvld" >E-mail is not a valid format</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-xs-12">
                                                <label htmlFor="message2">Message</label>
                                                <textarea className="form-control" id="message2" name="message" placeholder="Message" ></textarea>
                                                <div className="error" id="err-message" >Please enter message</div>
                                            </div>
                                        </div>
                                       
                                        <div className="row">
                                            <div className="col-xs-12 text-center">
                                                <div id="ajaxsuccess">E-mail was successfully sent.</div>
                                                <div className="error" id="err-form" >There was a problem validating the form please check!</div>
                                                <div className="error" id="err-timedout">The connection to the server timed out!</div>
                                                <div className="error" id="err-state"></div>
                                                <button type="submit" className="btn btn-custom" id="send">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                
                <footer id="footer">
                    <div className="footer-widgets-wrap">
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-sm-4 col-md-4">
                                    <div className="footer-content">
                                        <h4>Voir nous sur</h4>
                                        <div className="footer-socials">
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                            <a href="#"><i className="fa fa-google-plus"></i></a>
                                            <a href="#"><i className="fa fa-twitter"></i></a>
                                            <a href="#"><i className="fa fa-pinterest"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <div className="footer-content">
                                        <h4>ADDRESS</h4>
                                        <p>577, Route de Casa <br />
                                            Settat</p>
                                        <p>+212577829502</p>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <div className="footer-content">
                                        <Map />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
        </div>
       </StyleRoot>


    )
  }
}

export default withRouter(Index)