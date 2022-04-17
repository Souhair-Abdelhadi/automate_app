import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'

 class Piece_Rechange extends Component {

    constructor(props){
        super(props)
        this.state = {
            piece_rechange_liste : [],
            liste_loaded : false,
            src : null,
            list_to_show : []
        }
        for(var i=1; i<= 15; i++){
            var obj = {
                id : i,
                nom_piece : "piece "+i,
                marque_piece : "marque "+i,

            }
            this.state.piece_rechange_liste.push(obj)
            this.setState({list_to_show : [...this.state.piece_rechange_liste]})
            if( i == 15){
                this.setState({liste_loaded : true})
            }
        }
    }

    

    toggleImage = (src) => {
        this.setState({src : src})
        $('#image_div').toggle('slow')
    }

    componentDidMount(){
        console.log(this.state.piece_rechange_liste)
        this.setState({list_to_show : [...this.state.piece_rechange_liste]})
    }

  render() {
    return (
      <div>
            <SideBar>
                <div className='image_div' id='image_div'  >
                    <AiFillCloseCircle  className='close_icon' onClick={()=> this.toggleImage()} />
                    <img src={this.state.src} alt="Automate image" id='image' className='image' />
                </div>
                <div className='interface_header' >
                    <h1 id='header_text' >Liste des pieces de rechanges</h1>

                </div>

                <div className='bar_actions' >
                    <div>
                        <Button variant="info" onClick={()=>this.props.navigate("/ajouter_piece")} className='ajouter_automate_btn' >Ajouter une piece de rechange</Button>
                    </div>
                    <div>
                        <InputGroup className="mb-3 search_input">
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                            <FormControl
                                aria-label="Search"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(inputValue)=>{
                                    if(inputValue.target.value.length != 0){
                                        var list = this.state.piece_rechange_liste.filter((value)=>{
                                            if(value.nom_piece.search(inputValue.target.value) !=-1){
                                                return value
                                            }
                                            
                                        })
                                        this.setState({list_to_show : [...list]})
                                    }
                                    else {
                                            this.setState({list_to_show : [...this.state.piece_rechange_liste]})
                                        }
                                }}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className='interface_table' >
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>id </th>
                                <th>Nom de piece</th>
                                <th>Marque de piece</th>
                                <th>Les actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody_scroll' >
                            {this.state.list_to_show.map((value,index)=>{
                                return (
                                    <tr key={index} >
                                        <td>{value.id}</td>
                                        <td>{value.nom_piece}</td>
                                        <td>{value.marque_piece}</td>
                                        <td>

                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </Table>
                </div>
            </SideBar>
      
      </div>
    )
  }
}


export default withRouter(Piece_Rechange)