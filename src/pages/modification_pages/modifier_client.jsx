import React, { Component } from 'react'
import "../../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from '../cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../../js/withRouter'
import putData from '../../api/putData'
import getData from '../../api/getData'

 class Modifier_Client extends Component {

    constructor(props){
        super(props)
        this.state = {
            validated : false,
            nom_labo : '',
            ville : '',
            adresse : '',
            numPhone : '',
            bloquer : '',
            idLabo :  parseInt(props.params.id),
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
            let headers = new Headers()
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Origin','http://localhost:3000');
            headers.append('Authorization','bearer '+localStorage.getItem('access_token'))
            const dataPromise = putData(`client/${this.state.idLabo}`,{
                nom_labo : this.state.nom_labo,
                ville : this.state.ville,
                adresse : this.state.adresse,
                numPhone : this.state.numPhone,
                email : JSON.parse(localStorage.getItem('user')).email,
                bloquer : this.state.bloquer

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
    
    componentDidMount(){
        console.log("id" , this.state.idLabo)
        const email = JSON.parse(localStorage.getItem('user')).email
        const data = getData(`client/${this.props.params.id}/${email}`,null,"get")
        data.then((res)=>{
            console.log(" client res :",res)
            if(res.status == "OK"){
                if(res.doc.length != 0){
                    this.setState({
                        nom_labo : res.doc[0].nom_labo,
                        ville : res.doc[0].ville,
                        adresse : res.doc[0].adresse,
                        numPhone : "0" + res.doc[0].numPhone,
                        bloquer : res.doc[0].bloquer
                     })                
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
                    <h1 id='header_text' >Modifier client</h1>

                </div>

                    <div className='error_div' >
                        <p id='error_message' > </p>
                    </div>
                

                <Form id='form' className='form_box' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

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
                                value={this.state.nom_labo}
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
                                value={this.state.ville}
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée une ville.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Num telephone</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>{
                                    this.setState({numPhone : e.target.value})
                                    this.validePhone( e.target.value)
                                }}
                                className='input_text'
                                type="text"
                                placeholder="Num telephone"
                                aria-describedby="inputGroupPrepend"
                                minLength={10}
                                maxLength={10}
                                required
                                value={this.state.numPhone}
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée une num telephone valide.
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
                                value={this.state.adresse}
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée une adresse.
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
                                S'il vous plait donner l'état de client.
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

export default withRouter(Modifier_Client)