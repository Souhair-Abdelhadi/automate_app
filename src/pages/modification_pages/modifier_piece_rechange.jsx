import React, { Component } from 'react'
import "../../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from '../cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../../js/withRouter'
import putData from '../../api/putData'
import getData from '../../api/getData'

class Modifier_Piece_Rechange extends Component {

    constructor(props){
        super(props)
        this.state = {
            validated : false,
            nom_piece : '',
            marque_piece : '',
            supprimer : '',
            idPiece : props.params.id
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
            const dataPromise = putData(`pieces_rechange/${this.state.idPiece}`,{
                nom_piece : this.state.nom_piece,
                marque_piece : this.state.marque_piece,
                email : JSON.parse(localStorage.getItem("user")).email
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
        const email = JSON.parse(localStorage.getItem('user')).email
        const data = getData(`pieces_rechange/${this.state.idPiece}/${email}`,null,"get")
        data.then((res)=>{
            console.log(" piece res :",res)
            if(res.status == "OK"){
                if(res.doc.length != 0){
                    this.setState({
                        nom_piece : res.doc[0].nomPiece,
                        marque_piece : res.doc[0].marquePiece,
                        supprimer : res.doc[0].supprimer
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
                    <h1 id='header_text' >Modifier piece de rechange</h1>

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
                                value={this.state.nom_piece}
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
                                value={this.state.marque_piece}
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée marque de piece.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Supprimer</InputGroup.Text>
                            <Form.Select
                                onChange={(e) => this.setState({supprimer : e.target.value})}
                                aria-label="Default select example">
                                <option  className='option_text' value={0} > Non </option>
                                <option selected={ this.state.supprimer == 1 ? true :false } className='option_text' value={1} > Oui </option>
                            </Form.Select>
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée donner responsabilié.
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

export default withRouter(Modifier_Piece_Rechange)