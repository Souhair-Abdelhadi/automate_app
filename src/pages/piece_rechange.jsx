import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'
import getData from "../api/getData"
import deleteData from '../api/deleteData'
 class Piece_Rechange extends Component {

    constructor(props){
        super(props)
        this.state = {
            piece_rechange_liste : [],
            liste_loaded : false,
            src : null,
            list_to_show : []
        }
        
    }

    

    toggleImage = (src) => {
        this.setState({src : src})
        $('#image_div').toggle('slow')
    }

    componentDidMount(){
        const data = getData("pieces_rechanges",null,"get")
        data.then((res)=>{
            if(res.status == 'OK'){
                this.setState({list_to_show : res.doc,piece_rechange_liste : res.doc})
            }

        })
        .catch(e=>console.log(e.message))
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
                { typeof JSON.parse(localStorage.getItem('user')).admin != 'undefined' && JSON.parse(localStorage.getItem('user')).admin === 1 ? <div>
                        <Button variant="info" onClick={()=>this.props.navigate("/ajouter_piece")} className='ajouter_automate_btn' >Ajouter une piece de rechange</Button>
                    </div>: null}    
                    
                    <div>
                        <InputGroup className="mb-3 search_input">
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                            <FormControl
                                aria-label="Search"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(inputValue)=>{
                                    if(inputValue.target.value.length != 0){
                                        var list = this.state.piece_rechange_liste.filter((value)=>{
                                            if(value.nomPiece.search(inputValue.target.value) !=-1){
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
                                        <td>{value.idPiece}</td>
                                        <td>{value.nomPiece}</td>
                                        <td>{value.marquePiece}</td>
                                        <td>
                                            {typeof JSON.parse(localStorage.getItem("user")).admin != 'undefined' && JSON.parse(localStorage.getItem("user")).admin === 1 ? 
                                                <Button onClick={()=> this.props.navigate(`/modifier_piece/${value.idPiece}`)} >modifier</Button>
                                            :null}                                            
                                            { typeof JSON.parse(localStorage.getItem("user")).admin != 'undefined' && JSON.parse(localStorage.getItem("user")).admin === 1 ?
                                                <Button variant='danger' onClick={(e)=> {
                                                const data = deleteData(`piece_rechange/${value.idPiece}`,{
                                                    email : JSON.parse(localStorage.getItem("user")).email
                                                })
                                                data.then((res)=>{
                                                    if(res.status == 200){
                                                        res.json().then((res)=>{
                                                            console.log(res)
                                                        })
                                                        window.location.reload()
                                                    }
                                                    else {
                                                    res.json().then((res2)=>{
                                                        window.alert(res2.message);
                                                    })
                                                    .catch((e)=>console.log("error in res.json"))
                                                    }
                                                })
                                                } }  >supprimer</Button>
                                                :null
                                            }
                                            
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