
import React, { Component } from 'react'
// import Helmet from 'react-helmet'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {BsTelephoneFill,BsLinkedin} from "react-icons/bs"
import {FaFax} from "react-icons/fa"
import {GrMail} from "react-icons/gr"
import {GiPositionMarker} from "react-icons/gi"
import {Container,Navbar,Nav,Form,Button,InputGroup,Row} from "react-bootstrap"
import Radium,{StyleRoot} from "radium"
import { fadeIn,fadeOut,fadeInUp,fadeInRight } from 'react-animations'
import $, { getJSON } from 'jquery'
import Map from './cards/map.js'
import '../css/bootstrap.min.css'
import YoutubeEmbeded from './cards/youtube.js'
import "../css/style.css"
import "../css/component.css"
import "../css/green.css"
import playImage from '../images/play.png'
import Person from '../images/person.jpeg'
import A1 from '../images/1.png'
import A2 from '../images/2.png'
import A3 from '../images/3.png'
import A4 from '../images/4.png'
import A5 from '../images/5.png'
import Logo from '../images/logo.jpg'
import Analyse_bio from '../images/analyse_biomedicale.jpg'
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

 class Index extends Component {

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
        this.serviceItem = React.createRef()

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

    onScroll = (ref) => {
        ref.current.scrollIntoView({behavior : 'smooth' })
    
    }
    
    componentDidMount() {
        // document.addEventListener('scroll',this.fadeServices)

        if(JSON.parse(localStorage.getItem("user")).email){
            this.props.navigate("/automates")
        }

        this.observe = new IntersectionObserver(([entry]) => {

            if (entry.isIntersecting) {
                this.setState({ servicesVisible: true })
            }

        })

        this.observe.observe(this.serviceItem.current)

    }

    componentWillUnmount(){

        this.observe.disconnect()
    }

  render() {
    return (
        <StyleRoot >
        <div  >

            {/* <div className="application">
                <Helmet>
                    <meta  charSet='UTF-8' />
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <title>M-AUTOMATE</title>
                    <link href='http://fonts.googleapis.com/css?family=Signika+Negative:300,400,600,700' rel='stylesheet' type='text/css' />
                    <link href='http://fonts.googleapis.com/css?family=Kameron:400,700' rel='stylesheet' type='text/css' />
                </Helmet>
                
            </div> */}
            

            <Navbar  sticky='top' className='l_navbar-custom'  >
                    <Container>
                        <Navbar.Brand onClick={()=> { this.onScroll(this.homeRef)}}  id='index_logo' >Diagnostic Systems</Navbar.Brand>
                        <Navbar.Collapse className="me-auto justify-content-end">
                            <Nav.Link onClick={()=> { this.onScroll(this.homeRef)}} className='nav_elem' >HOME</Nav.Link>
                            <Nav.Link onClick={()=> { this.onScroll(this.servicesRef)}} className='nav_elem' >SERVICES</Nav.Link>
                            <Nav.Link onClick={()=> { this.onScroll(this.aboutUsRef)}} className='nav_elem' >ABOUT US</Nav.Link>
                            <Nav.Link onClick={()=> { this.onScroll(this.contactRef)}}  className='nav_elem' >CONTACT</Nav.Link>
                            <Nav.Link className='nav_elem'  onClick={()=>this.setState({modalShow : true})} >Login</Nav.Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <LoginModal modalShow={this.state.modalShow} onHide={this.onHide} this={this}  />

            <section className="main-home" id="home" ref={this.homeRef} >
                <div className="home-page-photo"></div> 
                <div style={styles.fadeInAppDescription}  >

                    <Box sx={{ flexGrow: 1,marginTop : -20 }}>
                        <Grid container spacing={2}>
                                <Grid item xs={5}  >
                                    <div className='left-grid-bg' >
                                        <div>
                                            <p id='left-grid-bg-Text-1' >Diagnostic Systems</p>
                                        </div>
                                        <div>
                                            <p id='left-grid-bg-Text-2' >Importation et distribution de Matériels et Réactifs de laboratoires</p>
                                        </div>
                                        
                                    </div>

                                </Grid>
                        </Grid>
                    </Box>
                    </div>
            </section>


            <section id="services"
            style={ this.state.servicesVisible ? [styles.fadeUpGrids, {display : 'block'}] : {display : 'none'}}

             ref={this.servicesRef} >
                <div className="container" id='services-div' ref={this.serviceItem}  >
                    <div className="row">
                        <div className="col-md-12">
                            <h1 id='service_title'  className="title text-center">Nos Services</h1>
                            <div className="titleHR"><span></span></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={A1} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Service Qualité</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={A2} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Service Ingénieurs d'Application</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={A3} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Service Aprèes-Vente</h5>
                                </div>
                            </div>
                        </div>
                    </div> 

                    <div className="row">
                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={A4} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Contrat de Maintenance Préventive</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4"> 
                            <div className="text-center services-item">
                                <div className="col-wrapper">
                                    <div className="icon-border">
                                        <img  src={A5} alt='' style={{height : 50,weight : 50,fill : "orange"}}   />
                                    </div>
                                    <h5>Enquête de satisfaction client</h5>
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
                            <h1 id='about-us-title' className="title text-center">About Us</h1>
                            <div className="titleHR"><span></span></div>
                        </div>
                    </div>

                    
                    <Box sx={{ flexGrow: 1,marginTop : 5 }}>
                    <Grid container spacing={2}>
                            <Grid item xs={5}  >
                                <div className='left-grid-bg' >
                                    <div id='analyse_bio_img'  style={{height : 400,width : 500}} />
                                    
                                </div>

                            </Grid>

                        <Grid item xs={4}>
                            <div className='about-us-text-container'  style={{marginLeft: "30%",height : 400,width : 580}} >

                                <p className='about-us-text' >
                                    La société Diagnostic Systems a été fondée en Avril 2005 par M. Mohamed LAHJOUJI. Bénéficiant d’une expérience de plus de 17 ans dans le secteur de la biologie, ce leader a pour trait principal de caractère : la Persévérance.
                                </p>
                                <p className='about-us-text'>
                                Spécialisée dans l'importation et la distribution des automates , matériel et consommables de laboratoire, Diagnostic Systems est une société à taille humaine qui sera toujours à votre écoute pour répondre, de façon personnalisée et avec le plus grand soin, à l'ensemble de vos requêtes techniques et commerciales.
                                </p>

                            </div>
                        </Grid>

                    </Grid>
                    </Box>
                    
                </div> 
            </section>

                <section id="contact" ref={this.contactRef} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 id='contact-title'  className="title text-center">Contacter-nous</h1>
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
                                            backgroundColor : 'rgb(23, 102, 167)',
                                            borderColor :'rgb(23, 102, 167)'
                                        }}
                                            onMouseEnter={(e)=> {
                                                e.currentTarget.style.backgroundColor = "white";
                                                e.currentTarget.style.color = "black"
                                            }}
                                            onMouseLeave={(e)=>{
                                                e.currentTarget.style.backgroundColor = 'rgb(23, 102, 167)';
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
                                
                                <div className="col col-md-4">
                                    <div className="footer-content">
                                        <h1>Contact</h1>
                                        <br />
                                        <div className='footer-content-div'  >
                                            <BsTelephoneFill className='icon_size'  />
                                            <p>05 22 89 88 37 / 05 22 93 81 82</p>
                                        </div>
                                        <div className='footer-content-div'  >
                                            <FaFax className='icon_size'  />
                                            <p>05 22 93 81 83</p>
                                        </div>
                                        <div className='footer-content-div'  >
                                            <GrMail className='icon_size'  />
                                            <p>contact@diagnosticsystems.ma</p>
                                        </div>
                                        <div id='gps-pos' className='footer-content-div'  >
                                            <GiPositionMarker  className='icon_size'  />
                                            <p>234, QUARTIER NASSIM-LISSASSFA HAY HASSANI-CASABLANCA</p>
                                        </div>
                                        <div  className='footer-content-div'  >
                                            <BsLinkedin  className='icon_size'  />
                                            <a id='linkedin_ref' target={'_blank'}  href="https://www.linkedin.com/company/diagnosticsystems/">Diagnostic Systems, s.a.r.l</a>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginLeft: "20%",marginTop: "3%"}}  className="col-sm-2 col-md-2">
                                    <h1>Localisation</h1>
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