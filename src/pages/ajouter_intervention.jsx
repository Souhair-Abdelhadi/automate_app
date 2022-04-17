import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'

export default class Ajouter_Intervention extends Component {

    constructor(props){
        super(props)
        this.state = {
            validated : false,
            id_automate : '',
            id_ing : '',
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

        for(var i = 1; i <= 10; i++){
            this.state.ing_list.push({
                id : i,
                nom : "ing "+i
            })
            this.setState({ing_list_to_show : [...this.state.ing_list] })
            
        }

        for(var i = 1; i <= 10; i++){
            this.state.automate_list.push({
                id : i,
                nom : "automate  "+i
            })
            this.setState({automate_list_to_show : [...this.state.automate_list] })
        }
        for (var i = 1; i <= 10; i++) {
            this.state.piece_list.push({
              id: i,
              nomPiece: "nom " + i,
              marquePiece: "marque " + i,
            })
            this.setState({ piece_list_to_show: [...this.state.piece_list] })
     
          }

    }

 


 
    handleSubmit = (event) => {
        $('#error_message').text("")
        $('#image_error').text("")
        const form = event.currentTarget;
        if (form.checkValidity() === false || !this.state.src ) {
            if(!this.state.src){
                $("#image_error").text("Il faut selectionner une image de l'automate ").css("color", "red")

            }
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
                    nom_labo : "",
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
    
    searchLabo = (nom) => {

        if(nom){
            var list = this.state.automate_list.filter((value,index)=>{
                
                if(value.nom.toLowerCase().search(nom.toLowerCase()) != -1){
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
        this.setState({ing_list_to_show : [...this.state.ing_list] })
        this.setState({automate_list_to_show : [...this.state.automate_list] })
        this.setState({piece_list_to_show : [...this.state.piece_list] })

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


                <Form className='form_box' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

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
                                    return <option className='option_text' key={index} value={value.id} > {value.nom} </option>

                                })}
                            </Form.Select>
                            <Form.Control
                                onChange={(e) => this.searchLabo(e.target.value)}
                                className='input_text'
                                type="text"
                                placeholder="Search par nom d'automate"
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait selectionner une automate.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group mb-3' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Ingénieur </InputGroup.Text>
                            <Form.Select
                                required
                                aria-label="Default select example">
                                {this.state.ing_list_to_show.map((value, index) => {
                                    return <option className='option_text' key={index} value={value.id} > {value.nom} </option>

                                })}
                            </Form.Select>
                            <Form.Control
                                onChange={(e) => this.searchIng(e.target.value)}
                                className='input_text'
                                type="text"
                                placeholder="Search par nom d'ingénieur"
                                aria-describedby="inputGroupPrepend"
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait selectionner une ing.
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
                                placeholder="Nombre de jours"
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
                                onChange={(e) => this.setState({ duree_inter: e.target.value })}
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
                                    return <option className='option_text' key={index} value={value.id + "," + value.nomPiece} > {value.nomPiece} </option>

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
                                            if (v_value.id === value) {
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
