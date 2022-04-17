import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'

export default class Ajouter_Automate extends Component {

    constructor(props){
        super(props)
        this.state = {
            validated : false,
            id_labo : '',
            id_ing : '',
            nom_automate : '',
            marque_automate : '',
            src : '',
            ing_list :  [],
            labo_list : [],
            ing_list_to_show :  [],
            labo_list_to_show : [],
        }

        for(var i = 1; i <= 10; i++){
            this.state.ing_list.push({
                id : i,
                nom : "ing "+i
            })
            this.setState({ing_list_to_show : [...this.state.ing_list] })
            
        }

        for(var i = 1; i <= 10; i++){
            this.state.labo_list.push({
                id : i,
                nom : "labo "+i
            })
            this.setState({labo_list_to_show : [...this.state.labo_list] })
        }

    }

    toggleImage = () => {
        $('#image_div').toggle('slow')
    } 


    verifyImage = (file) => {
        var ext_list = ["jpg", "jpeg", "png"]
        
        var ext = file.target.value.substring(file.target.value.lastIndexOf('.') + 1, file.target.value.length) || null;
        var reader = new FileReader()
         
        reader.onload = () =>{
            
            $("#image").attr("src",reader.result)
            this.setState({src : reader.result})
            console.log("data after setState :",this.state.src)
        }
        if(file.target.value.length > 0){
            if (ext && ext_list.includes(ext) ) {
                console.log("image a été selectionné")
                $("#image_error").text("image a été selectionné").css("color", "green")
                reader.readAsDataURL(file.target.files[0])
                
            }
            else {
                console.log("le fichier selectionné n'est une image ")
                $("#image_error").text("le fichier selectionné n'est pas une image ").css("color", "red")
            }
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
            var list = this.state.labo_list.filter((value,index)=>{
                
                if(value.nom.toLowerCase().search(nom.toLowerCase()) != -1){
                    return value
                    
                }

            })
            this.setState({labo_list_to_show : [...list]})
        }
        else{
            this.setState({labo_list_to_show : [...this.state.labo_list]})
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


    componentDidMount(){
        this.setState({ing_list_to_show : [...this.state.ing_list] })
        this.setState({labo_list_to_show : [...this.state.labo_list] })
    }

  render() {
    return (
      <div>
            <SideBar>
                <div className='image_div' id='image_div'  >
                    <AiFillCloseCircle className='close_icon' onClick={() => this.toggleImage()} />
                    <img src={this.state.src} alt="Automate image" id='image' className='image' />
                </div>
                <div className='interface_header' >
                    <h1 id='header_text' >Ajouter une automate</h1>

                </div>

                <div className='error_div' >
                    <p id='error_message' > </p>
                </div>


                <Form className='form_box'  noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                    <Form.Group className='form_div' as={Row} controlId="validationCustomUsername">

                        <br />
                        <InputGroup className='input_group mb-3' hasValidation>
                            <InputGroup.Text   id="inputGroup-sizing-lg">Labo </InputGroup.Text>
                            <Form.Select 
                                required
                                aria-label="Default select example">
                                {this.state.labo_list_to_show.map((value,index)=>{
                                    return <option  className='option_text' key={index} value={value.id} > {value.nom} </option>
                                
                                })}
                            </Form.Select>
                            <Form.Control
                                onChange={(e)=>this.searchLabo(e.target.value)}
                                className='input_text'
                                type="text"
                                placeholder="Search par nom de labo"
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait selectionner une labo.
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
                                onChange={(e)=>this.searchIng(e.target.value)}
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
                            <InputGroup.Text id="inputGroup-sizing-lg">Nom d'automate </InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({adresse : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Nom d'automate"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée nom d'automate.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Marque d'automate </InputGroup.Text>
                            <Form.Control
                                onChange={(e)=>this.setState({adresse : e.target.value})}
                                className='input_text'
                                type="text"
                                placeholder="Marque d'automate"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback className='feed_back' type="invalid">
                                S'il vous plait entrée marque d'automate.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                        <InputGroup className='input_group mb-3' hasValidation>
                            <InputGroup.Text id="inputGroup-sizing-lg">Image </InputGroup.Text>
                            <input type="file"  id="automate_img"  onChange={(e)=>this.verifyImage(e)}  />
                            <Button onClick={()=>{this.toggleImage()}} variant="primary" id="view_button">
                                View
                            </Button>
                            
                        </InputGroup>
                        <br />
                        <div >
                            <p id="image_error" ></p>
                        </div>
                        <br />

                        <Button id='submit' type='submit' variant="primary">Ajouter</Button>

                    </Form.Group>
                </Form>

                
            </SideBar>
      
      </div>
    )
  }
}
