import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'
import postData from '../api/postData'

 class Ajouter_Piece_Rechange extends Component {

    constructor(props){
        super(props)
        this.state = {
            validated : false,
            nom_piece : '',
            marque_piece : '',
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

            // fetch('http://localhost:3001/ajouter_piece_rechange',{
            //     mode :'cors',
            //     method : 'POST',
            //     headers : headers,
            //     body : JSON.stringify({
            //         nom_piece : this.state.nom_piece,
            //         marque_piece : this.state.marque_piece,
            //     })
            // })
            const dataPromise = postData("ajouter_piece_rechange",{
                nom_piece : this.state.nom_piece,
                marque_piece : this.state.marque_piece,
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
                    })
                    .catch(e => console.log(e))
                    $('#form').trigger('reset')
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
                    <h1 id='header_text' >Ajouter une piece de rechange</h1>

                </div>

                    <div className='error_div' >
                        <p id='error_message' > </p>
                    </div>
                

                <Form id='form' className='form_box' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                    <Form.Group className='form_div' as={Row} controlId="validationCustomUsername">

                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Nom de piece</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({nom_piece : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Nom de piece"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée nom de piece.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Marque de piece</InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({marque_piece : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Marque de piece"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée marque de piece.
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

export default withRouter(Ajouter_Piece_Rechange)