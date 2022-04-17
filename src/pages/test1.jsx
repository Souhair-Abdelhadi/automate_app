import React, { Component } from 'react'
import {Form,Button,InputGroup,FormControl,Row} from "react-bootstrap"

 class Test1 extends Component {

   constructor(props) {
     super(props)
     this.state = {
       validated: false,
       piece_list: [],
       piece_list_to_show: [],
       selected_pieces : [],
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
    this.setState({piece_list_to_show : [...this.state.piece_list] })
        
   }

  render() {
    return (
      <div>
        <Form className='form_box' >

          <Form.Group className='form_div' as={Row} controlId="validationCustomUsername">

            <InputGroup className='input_group mb-3' hasValidation>
              <InputGroup.Text id="inputGroup-sizing-lg">Piéce de rechange </InputGroup.Text>
              <Form.Select
                required
                onChange={(e)=> this.addPiece(e.target.value) }
                aria-label="Default select example">
                <option className='option_text'  value={""} > Choisi une option </option>
                {this.state.piece_list_to_show.map((value, index) => {
                  return <option  className='option_text' key={index} value={value.id+","+value.nomPiece} > {value.nomPiece} </option>

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
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default Test1