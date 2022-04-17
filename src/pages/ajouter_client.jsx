import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'

 class Ajouter_Client extends Component {

    constructor(props){
        super(props)
        this.state = {
            validated : false,
            nom_labo : '',
            ville : '',
            adresse : ''
        }
        
    }

    
    handleSubmit = (event) => {
        $('#error_message').text("")
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        else { 
            event.preventDefault()
            let headers = new Headers()
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Origin','http://localhost:3000');
            headers.append('Authorization','bearer '+localStorage.getItem('access_token'))

            fetch('http://localhost:3001/ajouter_client',{
                mode :'cors',
                method : 'POST',
                headers : headers,
                body : JSON.stringify({
                    nom_labo : this.state.nom_labo,
                    ville : this.state.ville,
                    adresse : this.state.adresse,
                })
            })
            .then((res)=>{
                if(res.status === 400) {
                    $('#error_message').css("color","red")
                    $('#error_message').text("Les données envoyer ne sont pas complete!")
                    .fadeIn("slow")
                }
                else if ( res.status === 200 ){
                    $('#error_message').css("color","#021B40")
                    res.json().then((data)=>{
                        console.log(data)
                        $('#error_message').text(data.message)
                        .fadeIn("slow")
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
    
    
    
    componentDidMount(){

    }

  render() {
    return (
      <div>
            <SideBar>
                
                <div className='interface_header' >
                    <h1 id='header_text' >Ajouter un client</h1>

                </div>

                    <div className='error_div' >
                        <p id='error_message' > </p>
                    </div>
                

                <Form className='form_box' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                    <Form.Group className='form_div' as={Row} controlId="validationCustomUsername">

                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Nom de labo</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({nom_labo : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Nom de labo"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée un nom.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Ville</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({ville : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Ville"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée une ville.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Adresse</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({adresse : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Adresse"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée une adresse.
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

export default withRouter(Ajouter_Client)