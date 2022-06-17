import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import getData from '../api/getData'
import postData from '../api/postData'

export default class Ajouter_Intervention extends Component {

    constructor(props){
        super(props)
        this.state = {
            validated : false,
            id_automate : '',
            date_inter : "",
            duree_inter : "",
            description : "",
            ing_list :  [],
            automate_list : [],
            ing_list_to_show :  [],
            automate_list_to_show : [],
            piece_list: [],
            piece_list_to_show: [],
            selected_pieces : [],
        }

    }

 


 
    handleSubmit = (event) => {
        $('#error_message').text("")
        $('#image_error').text("")
        const form = event.currentTarget;
        if (form.checkValidity() === false ) {
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
            const dataPromise = postData("ajouter_intervention",{
                id_automate : this.state.id_automate,
                email : JSON.parse(localStorage.getItem("user")).email,
                date_inter : this.state.date_inter,
                duree_inter : this.state.duree_inter,
                description : this.state.description,
                listePieceSelectionner : this.state.selected_pieces
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
                    const data = getData("automates?email="+JSON.parse(localStorage.getItem("user")).email+"&admin="+JSON.parse(localStorage.getItem("user")).admin,null,"get")
                    data.then((res) => {
                        if (res.status = "OK") {
                            this.setState({ automate_list_to_show: res.doc, automate_list: res.doc, id_automate: res.doc[0].idAutomate })
                        }
                        else {
                            this.setState({ automate_list_to_show: [] })
                        }
                    })
                        .catch(e => this.setState({ automate_list_to_show: [] }))
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
    
    searchAutomate = (nom) => {

        if(nom){
            var list = this.state.automate_list.filter((value,index)=>{
                
                if(value.nomAutomate.toLowerCase().search(nom.toLowerCase()) != -1){
                    return value
                    
                }

            })
            this.setState({automate_list_to_show : [...list]})
        }
        else{
            this.setState({automate_list_to_show : [...this.state.automate_list]})
        }
    }

    searchIng = (nom) => {

        if(nom){
            var list = this.state.ing_list.filter((value,index)=>{
                
                if(value.nom.toLowerCase().search(nom.toLowerCase()) != -1){
                    return value
                    
                }

            })
            this.setState({ing_list_to_show : [...list]})
        }
        else{
            this.setState({ing_list_to_show : [...this.state.ing_list]})
        }
    }

    searchPiece = (nom) => {

        if (nom) {
          var list = this.state.piece_list.filter((value, index) => {
   
            if (value.nomPiece.toLowerCase().search(nom.toLowerCase()) != -1) {
              return value
   
            }
   
          })
          this.setState({ piece_list_to_show: [...list] })
        }
        else {
          this.setState({ piece_list_to_show: [...this.state.piece_list] })
        }
      }
   
      addPiece = (piece) => {
   
       if ( piece !== null && piece) {
          var pieceArr = piece.split(",")
   
          var v_arr = this.state.selected_pieces.filter((value, index) => {
            if (value === parseInt(pieceArr[0])) {
              return value
            }
          })
   
          if (v_arr.length !== 0) {
          }
          else {
            this.setState({ selected_pieces: [...this.state.selected_pieces, parseInt(pieceArr[0])] })
            console.log(this.state.selected_pieces)
          }
        }
   
      }
   
      deletePiece = (pieceId) => {
        if(pieceId){
          var v_arr = this.state.selected_pieces.filter(value => {
            if(value !== pieceId){
              return value
            }
          })
          this.setState({selected_pieces : [...v_arr] })
        }
      }

    componentDidMount(){
        const data = getData("automates?email="+JSON.parse(localStorage.getItem("user")).email+"&admin="+JSON.parse(localStorage.getItem("user")).admin,null,"get")
        data.then((res)=>{
            if(res.status = "OK"){
                this.setState({automate_list_to_show : res.doc,automate_list : res.doc,id_automate : res.doc[0].idAutomate})
            }
            else {
                this.setState({automate_list_to_show : [] })
            }
        })
        .catch(e=>this.setState({automate_list_to_show : [] }) )

        const data2 = getData("pieces_rechanges",null,"get")
        data2.then((res)=>{
            if(res.status == 'OK'){
                this.setState({piece_list : res.doc,piece_list_to_show : res.doc})
            }
        })
        .catch(e=>console.log(e.message))

    }

  render() {
    return (
      <div>
            <SideBar>
                
                <div className='interface_header' >
                    <h1 id='header_text' >Ajouter une intervention</h1>

                </div>

                <div className='error_div' >
                    <p id='error_message' > </p>
                </div>


                <Form id='form' className='form_box' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                    <Form.Group className='form_div' as={Row} controlId="validationCustomUsername">
                        <div className='form_headers' >
                            <h1>Fiche d'intervention</h1>
                        </div>
                        <br />
                        <InputGroup className='input_group mb-3' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Automate </InputGroup.Text>
                            <Form.Select
                                required
                                aria-label="Default select example">
                                {this.state.automate_list_to_show.map((value, index) => {
                                    return <option className='option_text' onChange={()=>{this.setState({id_automate : value.idAutomate})}} key={index} value={value.idAutomate}  > {value.nomAutomate} </option>

                                })}
                            </Form.Select>
                            <Form.Control
                                onChange={(e) => this.searchAutomate(e.target.value)}
                                className='input_text'
                                type="text"
                                placeholder="Search par nom d'automate"
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait selectionner une automate.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Date intervention </InputGroup.Text>
                            <Form.Control
                                onChange={(e) => this.setState({ date_inter: e.target.value })}
                                className='input_text'
                                type="date"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait choisir une date.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group mb-3' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Duree intervention </InputGroup.Text>
                            <Form.Control
                                onChange={(e) => this.setState({ duree_inter: e.target.value })}
                                className='input_text'
                                type="text"
                                placeholder="Nombre de heure(s)"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <InputGroup.Text id="inputGroup-sizing-lg">jour (s) </InputGroup.Text>
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée nombre de jours.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Description </InputGroup.Text>
                            <Form.Control
                                onChange={(e) => this.setState({ description: e.target.value })}
                                className='input_text form_textarea  '
                                as="textarea"
                                rows={3}
                                placeholder="Description"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait donner une description.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <div className='form_headers' >
                            <h1>Piéce de rechange utiliser</h1>
                        </div>
                        <br />
                        <InputGroup className='input_group mb-3' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Piéce de rechange </InputGroup.Text>
                            <Form.Select
                                onChange={(e) => this.addPiece(e.target.value)}
                                aria-label="Default select example">
                                <option className='option_text' value={""} > Choisi une piece </option>
                                {this.state.piece_list_to_show.map((value, index) => {
                                    return <option className='option_text' key={index} value={value.idPiece + "," + value.nomPiece} > {value.nomPiece} </option>

                                })}
                            </Form.Select>
                            <Form.Control
                                onChange={(e) => this.searchPiece(e.target.value)}
                                className='input_text'
                                type="text"
                                placeholder="Search par piece"
                            />
                        </InputGroup>
                        <br />
                        <div>
                            {this.state.selected_pieces.length !== 0 ? (
                                <div>
                                    <div className='form_headers' >
                                        <h4>Piéce de rechange choisi</h4>
                                    </div>
                                    <br />
                                    {this.state.selected_pieces.map((value, index) => {
                                        return <b title='Supprimer' className='piece_selected' onClick={() => this.deletePiece(value)} key={index}> {this.state.piece_list.map(v_value => {
                                            if (v_value.idPiece === value) {
                                                return v_value.nomPiece
                                            }
                                        })} ||  </b>
                                    })}
                                </div>
                            ) : null}
                        </div>
                        <Button id='submit' type='submit' variant="primary">Ajouter</Button>

                    </Form.Group>
                </Form>

                
            </SideBar>
      
      </div>
    )
  }
}
