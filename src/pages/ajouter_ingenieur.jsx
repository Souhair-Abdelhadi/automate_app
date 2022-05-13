import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'
import postData from '../api/postData'

 class Ajouter_Ingenieur extends Component {

    constructor(props){
        super(props)
        this.state = {
            validated : false,
            nomIng : '',
            numIng : '',
            email : '',
            password : '',
            specialite : '',
            admin : 0,
            numPhoneValide : false,
        }
        
    }

    
    handleSubmit = (event) => {
        $('#error_message').text("")
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
            
            const dataPromise = postData("ajouter_ingenieur",{
                nomIng : this.state.nomIng,
                numIng : this.state.numIng,
                email : this.state.email,
                password : this.state.password,
                specialite : this.state.specialite,
                admin : this.state.admin,
                
            })
            
            dataPromise.then((res)=>{
                if(res.status === 400) {
                    $('#error_message').css("color","red")
                    $('#error_message').text("Les données envoyer ne sont pas complete/valider!")
                    .fadeIn("slow")
                }
                else if ( res.status === 200 ){
                    $('#error_message').css("color","#021B40")
                    res.json().then((data)=>{
                        console.log(data)
                        $('#error_message').text(data.message)
                        .fadeIn("slow")
                        $('#form').trigger('reset')
                    })
                    .catch(e => console.log(e))
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

    };
    
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
    
    generatePassword = () => {
        var randomstring = Math.random().toString(36).slice(-11);
        this.setState({password : randomstring})
        
        
    }


    componentDidMount(){

    }

  render() {
    return (
      <div>
            <SideBar>
                
                <div className='interface_header' >
                    <h1 id='header_text' >Ajouter un Ingenieur</h1>

                </div>

                    <div className='error_div' >
                        <p id='error_message' > </p>
                    </div>
                

                <Form id='form' className='form_box' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                    <Form.Group className='form_div' as={Row} controlId="validationCustomUsername">

                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Nom d'ingenieur</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({nomIng : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Nom d'ingenieur"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée un nom.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Num téléphone</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.validePhone(e.target.value)}
                                className='input_text'
                                type="text"
                                placeholder="Num téléphone"
                                aria-describedby="inputGroupPrepend"
                                maxLength={10}
                                minLength={10}
                                
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée num téléphone.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">E-mail</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({email : e.target.value})}
                                className='input_text'
                                type="email"
                                placeholder="E-mail"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée un email.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group mb-3'  hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Mot de passe</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({password : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Mot de passe"
                                minLength={8}
                                maxLength={16}
                                value={this.state.password}
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Button variant='info' onClick={()=> this.generatePassword()}  > Generer </Button>
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée le mot de passe.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Spécialité</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({specialite : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Spécialité"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée la spécialité.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Responsable</InputGroup.Text>
                            <Form.Select
                                onChange={(e) => this.setState({admin : e.target.value})}
                                aria-label="Default select example">
                                <option className='option_text' value={0} > Non </option>
                                <option className='option_text' value={1} > Oui </option>
                            </Form.Select>
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée donner responsabilié.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <Button id='submit' type='submit' variant="primary">Ajouter</Button>

                    </Form.Group>
                </Form>

                
            </SideBar>
      
      </div>
    )
  }
}

export default withRouter(Ajouter_Ingenieur)