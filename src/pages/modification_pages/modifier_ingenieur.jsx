import React, { Component } from 'react'
import "../../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from '../cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../../js/withRouter'
import putData from '../../api/putData'
import getData from '../../api/getData'
 class Modifier_Ingenieur extends Component {

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
            bloquer : '',
            idIng : parseInt(props.params.id),
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
            
            const dataPromise = putData(`ingenieur/${this.state.idIng}`,{
                nomIng : this.state.nomIng,
                numIng : this.state.numIng,
                target_email : this.state.email,
                password : this.state.password,
                specialite : this.state.specialite,
                admin : this.state.admin,
                email : JSON.parse(localStorage.getItem('user')).email,
                bloquer : this.state.bloquer
                
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
        console.log("phone :",e)
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
        const email = JSON.parse(localStorage.getItem('user')).email
        const data = getData(`ingenieur/${this.state.idIng}/${email}`,null,"get")
        data.then((res)=>{
            console.log(" ing res :",res)
            if(res.status == "OK"){
                if(res.doc.length != 0){
                    this.setState({
                        nomIng : res.doc[0].nomIng,
                        numIng : "0"+ res.doc[0].numIng,
                        email : res.doc[0].email,
                        password : res.doc[0].password,
                        specialite : res.doc[0].specialite,
                        admin : res.doc[0].admin,
                        bloquer : res.doc[0].bloquer
                     })         
                     this.validePhone("0"+ res.doc[0].numIng)       
                }
                
            }
            
        })
        .catch(e=>console.log(e.message))

    }

  render() {
    return (
      <div>
            <SideBar>
                
                <div className='interface_header' >
                    <h1 id='header_text' >Modifier Ingenieur</h1>

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
                                value={this.state.nomIng}
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée un nom.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Num téléphone</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>{
                                    this.setState({numIng : e.target.value})
                                    this.validePhone(e.target.value)
                                }}
                                className='input_text'
                                type="text"
                                placeholder="Num téléphone"
                                aria-describedby="inputGroupPrepend"
                                maxLength={10}
                                minLength={10}
                                required
                                value={this.state.numIng}
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
                                value={this.state.email}
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
                                value={this.state.specialite}
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
                                <option  className='option_text' value={0} > Non </option>
                                <option selected={ this.state.admin == 1 ? true :false } className='option_text' value={1} > Oui </option>
                            </Form.Select>
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait donner responsabilié.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Bloquer</InputGroup.Text>
                            <Form.Select
                                onChange={(e) => this.setState({bloquer : e.target.value})}
                                aria-label="Default select example">
                                <option  className='option_text' value={0} > Non </option>
                                <option selected={ this.state.bloquer == 1 ? true :false } className='option_text' value={1} > Oui </option>
                            </Form.Select>
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait donner l'état d'access.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <Button id='submit' type='submit' variant="primary">Modifier</Button>

                    </Form.Group>
                </Form>

                
            </SideBar>
      
      </div>
    )
  }
}

export default withRouter(Modifier_Ingenieur)