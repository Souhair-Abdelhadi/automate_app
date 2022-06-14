
import React, { Component } from 'react'
// import Helmet from 'react-helmet'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Container,Navbar,Nav,Form,Button,InputGroup,Row} from "react-bootstrap"
import Radium,{StyleRoot} from "radium"
import { fadeIn,fadeOut,fadeInUp,fadeInRight } from 'react-animations'
import $ from 'jquery'
import Map from './cards/map.js'
import '../css/bootstrap.min.css'
import YoutubeEmbeded from './cards/youtube.js'
import styles_v from "../css/style.module.css"
import "../css/component.css"
import "../css/green.css"
import playImage from '../images/play.png'
import Person from '../images/person.jpeg'
import Settings from '../images/setttings.png'
import LoginModal from './cards/loginModal.jsx'
import { withRouter } from '../js/withRouter.js';
import postData from '../api/postData.js';

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

 class Test1 extends Component {

    constructor(props) {
        super(props)
        try {
            const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"))
            // console.log("root isAutehnticated",isAuthenticated)
            if(typeof isAuthenticated != 'undefined' && isAuthenticated){
                // console.log("root isAutehnticated 2",isAuthenticated)
                this.props.navigate("/automates")
            }
        } catch (error) {
            console.log(error)
        }

        this.aboutUsRef = React.createRef()
        this.homeRef = React.createRef()
        this.contactRef = React.createRef()
        this.servicesRef = React.createRef()

        this.state = {
            validated: false,
            piece_list: [],
            piece_list_to_show: [],
            selected_pieces: [],
            nom: '',
            email: '',
            phone: '',
            message: '',
            numPhoneValide: false,
            visibility: false,
            showVideo: false,
            modalShow: false,
            servicesVisible : false,
            stopFade : false
        }

    }


   validePhone = (e) =>{
        var list = ["05","06","07"]
        if(e.length === 10){
            this.setState({numIng : e})
            var ext = list.includes(e.substring(0,2))
            console.log("ext",ext,e.substring(0,2))
            var isNumber = parseInt(e)
            if(ext && !isNaN(isNumber) ){
                this.setState({numPhoneValide : true})
                console.log("phone number verified")
            }
            else {
                console.log("phone number not verified")
                this.setState({numPhoneValide : false})

            }   
        }
        else {
            console.log("phone number not verified")
            this.setState({numPhoneValide : false})

        }
    }

    handleSubmit = (event) => {
        $('#error_message').text('')
        const form = event.currentTarget;
        if (form.checkValidity() === false || this.state.numPhoneValide === false) {
        event.preventDefault();
        event.stopPropagation();
        if(!this.state.numPhoneValide){
            $('#error_message').text("Numéro de téléphone n'est pas valider, donner un numéro valide et la début soit 05,06,07")
            .css("color","red")
        }

        }
        else {
            event.preventDefault()
            const dataPromise = postData("send_email",{
                fullName : this.state.nom,
                phone : this.state.phone,
                message : this.state.message,
                email : this.state.email,
            })
            
            dataPromise.then((res)=>{
                
                if(res.status === 400) {
                    $('#error_message').css("color","red")
                    $('#error_message').text("Les données envoyer ne sont pas complete!")
                    .fadeIn("slow")
                    
                }
                else if ( res.status === 200 ){
                    $('#error_message').css("color","#021B40")
                    res.json().then((data)=>{
                        $('#error_message').text(data.message)
                        .fadeIn("slow")
                    })
                    .catch(e => console.log(e))
                    $("#form").trigger('reset')
                }
                else {
                    $('#error_message').css("color","red")
                    $('#error_message').text("Error survenu durant la traitement de requet")
                        .fadeIn("slow")
                }
            })
            .catch(e => {
                console.log(e.message)
            })
        }
        this.setState({validated : true})


    }


    onHide(e){
        e.setState({
            modalShow : false
        })
    }
    
   fadeServices = () => {
     const elem = document.getElementById("services");
     const rect = elem.getBoundingClientRect();
     var navTop = $('nav').offset().top
     $('.nav').find("a").hover(function () {
       $(this).mouseenter(function () {
         $(this).css("color", "#77dfa2")
       })
       $(this).mouseleave(function () {
         if (navTop < 100) {
           $(this).css("color", "white")
         }
         else {
           $(this).css("color", "black")
         }
       })
     })
     if (navTop > 100) {
       $('nav').css("backgroundColor", "white")
       $('nav').css("boxShadow", "0 2px 4px 0 rgba(0,0,0,.2)")
       $('#logo').css("color", "black")
       $('.nav').find("a").css("color", "black")
     }
     else if (navTop < 100) {
       $('nav').css("backgroundColor", "transparent")
       $('#logo').css("color", "white")
       $('.nav').find("a").css("color", "white")
       $('nav').css("boxShadow", "0 2px 4px 0 transparent")
     }
     if (rect.y <= 496 && !this.state.visibility) {
       this.setState({ visibility: !this.state.visibility })
       console.log("message shown")
       // document.getElementById('services').style = styles.fadeUpGrids
     }

   }

   onScroll = (ref) => {
    ref.current.scrollIntoView({behavior : 'smooth' })
   }

  componentDidMount(){
    // document.addEventListener('scroll',this.fadeServices)

    this.observe = new IntersectionObserver(([entry]) => {

      if(entry.isIntersecting ){
        this.setState({ servicesVisible: true })
        console.log("dzyuizaydiuye")
      }

    })

    this.observe.observe(this.servicesRef.current)
    
  }

  componentWillUnmount(){
    // document.removeEventListener('scroll',this.fadeServices)
    this.observe.disconnect()
  }

  render() {
    return (
        <StyleRoot >
        <div  >

            {/* <div className={styles_v.application}>
                <Helmet>
                    <meta  charSet='UTF-8' />
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <title>M-AUTOMATE</title>
                    <link href='http://fonts.googleapis.com/css?family=Signika+Negative:300,400,600,700' rel='stylesheet' type='text/css' />
                    <link href='http://fonts.googleapis.com/css?family=Kameron:400,700' rel='stylesheet' type='text/css' />
                </Helmet>
                
            </div> */}
            

            <Navbar bg="dark"  variant="dark" sticky='top' className={styles_v.l_navbar_custom}  >
                    <Container>
                        <Navbar.Brand style={{cursor : 'pointer'}}  onClick={()=> { this.onScroll(this.homeRef)}}   id='index_logo' >M-AUTOMATE</Navbar.Brand>
                        <Navbar.Collapse className="me-auto justify-content-end">
                            <Nav.Link onClick={()=> { this.onScroll(this.homeRef)}}  className={styles_v.nav_elem} >HOME</Nav.Link>
                            <Nav.Link onClick={()=> { this.onScroll(this.servicesRef)}}  className={styles_v.nav_elem} >SERVICES</Nav.Link>
                            <Nav.Link onClick={()=> { this.onScroll(this.aboutUsRef)}}   className={styles_v.nav_elem} >ABOUT US</Nav.Link>
                            <Nav.Link onClick={()=> { this.onScroll(this.contactRef)}}  className={styles_v.nav_elem} >CONTACT</Nav.Link>
                            <Nav.Link  className={styles_v.nav_elem}  onClick={()=>this.setState({modalShow : true})} >Login</Nav.Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <LoginModal modalShow={this.state.modalShow} onHide={this.onHide} this={this}  />

            <section className={styles_v.main_home} ref={this.homeRef} id="home">
                <div className={styles_v.home_page_photo}  ></div> 
                <div style={styles.fadeInAppDescription}  >

                    <Box sx={{ flexGrow: 1,marginTop : -20 }}>
                    <Grid container spacing={2}>
                            <Grid item xs={5}  >
                                <div className={styles_v.left_grid_bg} >
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


            <section id="services" 
              style={ this.state.servicesVisible ? [styles.fadeUpGrids, {display : 'block'}] : {display : 'none'}}
              className={styles_v.services} ref={this.servicesRef}  >

              <div className="container" id='services-div'   >
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
                          <img src={Settings} alt='' style={{ height: 50, weight: 50, fill: "orange" }} />
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
                          <img src={Settings} alt='' style={{ height: 50, weight: 50, fill: "orange" }} />
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
                          <img src={Settings} alt='' style={{ height: 50, weight: 50, fill: "orange" }} />
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
                          <img src={Settings} alt='' style={{ height: 50, weight: 50, fill: "orange" }} />
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
                          <img src={Settings} alt='' style={{ height: 50, weight: 50, fill: "orange" }} />
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
                          <img src={Settings} alt='' style={{ height: 50, weight: 50, fill: "orange" }} />
                        </div>
                        <h5>Magic Touch</h5>
                        <p>Nulla vitae libero pharetra augue. Etiam porta malesuada magna mollis euismod consectetur sem urdom tempus porttitor.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="about-us" ref={this.aboutUsRef} >
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

                <section id="contact" ref={this.contactRef} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="title text-center">Contact Us</h3>
                                <div className="titleHR"><span></span></div>

                                <Form id='form' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                                    <div className='error_div' >
                                        <p id='error_message' > </p>
                                    </div>
                                    <Form.Group className='form_div' as={Row} controlId="validationCustomUsername">
                                        <InputGroup className='input_group ' hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-lg" className='inputGroup-sizing-lg-index' >Nom </InputGroup.Text>
                                            <Form.Control
                                                onChange={(e) => this.setState({ nom: e.target.value })}
                                                className='input_text'
                                                type="text"
                                                placeholder='Nom'
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            <Form.Control.Feedback className='feed_back' type="invalid">
                                                S'il vous plait entrer votre nom.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <br />
                                        <InputGroup className='input_group' hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-lg" className='inputGroup-sizing-lg-index' >E-mail </InputGroup.Text>
                                            <Form.Control
                                                onChange={(e) => this.setState({ email: e.target.value })}
                                                className='input_text'
                                                type="email"
                                                placeholder='E-mail'
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            <Form.Control.Feedback className='feed_back' type="invalid">
                                                S'il vous plait entrer E-mail.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <br />
                                        <InputGroup className='input_group ' hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-lg" className='inputGroup-sizing-lg-index' >Numéro téléphone </InputGroup.Text>
                                            <Form.Control
                                                onChange={(e) => {
                                                    this.setState({ phone: e.target.value })
                                                    this.validePhone(e.target.value)
                                                }}
                                                className='input_text'
                                                type="text"
                                                placeholder="Numéro téléphone"
                                                aria-describedby="inputGroupPrepend"
                                                maxLength={10}
                                                minLength={10}
                                                required
                                            />
                                            <Form.Control.Feedback className='feed_back' type="invalid">
                                                S'il vous plait entrée Numéro téléphone.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <br />
                                        <InputGroup className='input_group' hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-lg" className='inputGroup-sizing-lg-index' >Message </InputGroup.Text>
                                            <Form.Control
                                                onChange={(e) => this.setState({ message: e.target.value })}
                                                className='input_text form_textarea  '
                                                as="textarea"
                                                rows={3}
                                                placeholder="Message"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            <Form.Control.Feedback className='feed_back' type="invalid">
                                                S'il vous plait donner Message.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <br />
                                        <Button id='submit' type='submit' style={{
                                            backgroundColor : 'rgb(16, 19, 18)',
                                            borderColor :'rgb(16, 19, 18)'
                                        }}
                                            onMouseEnter={(e)=> {
                                                e.currentTarget.style.backgroundColor = "white";
                                                e.currentTarget.style.color = "black"
                                            }}
                                            onMouseLeave={(e)=>{
                                                e.currentTarget.style.backgroundColor = 'rgb(16, 19, 18)';
                                                e.currentTarget.style.color = "white"
                                            }}
                                         >Envoyer</Button>

                                    </Form.Group>
                                </Form>
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

export default withRouter(Test1)