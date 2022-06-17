import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'
import getData from "../api/getData"
import deleteData from '../api/deleteData'
class Ingenieurs extends Component {

    constructor(props){
        super(props)
        this.state = {
            ingenieurs_liste : [],
            liste_loaded : false,
            src : null,
            list_to_show : []
        }

        
    }

    
    redirect(path){
        this.props.navigate(path) 
    }

    componentDidMount(){

        const data = getData("ingenieurs",null,"get")
        data.then((res)=>{
            if(res.status == "OK"){
                this.setState({list_to_show : res.doc,ingenieurs_liste : res.doc})
            }
            else{
                console.log(res.message)
            }
        })
        .catch(e=>console.log(e))
        
    }

  render() {
    return (
      <div>
            <SideBar>

                <div className='interface_header' >
                    <h1 id='header_text' >Liste des ingenieurs</h1>

                </div>

                <div className='bar_actions' >
                    <div>
                        <Button variant="info" onClick={()=> this.props.navigate("/ajouter_ingenieur") } className='ajouter_automate_btn' >Ajouter un ingenieur</Button>
                    </div>
                    <div>
                        <InputGroup className="mb-3 search_input">
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                            <FormControl
                                aria-label="Search"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(inputValue)=>{
                                    if(inputValue.target.value.length != 0){
                                        var list = this.state.ingenieurs_liste.filter((value)=>{
                                            if(value.nomIng.toLowerCase().search(inputValue.target.value.toLowerCase()) !=-1){
                                                return value
                                            }
                                            
                                        })
                                        this.setState({list_to_show : [...list]})
                                    }
                                    else {
                                            this.setState({list_to_show : [...this.state.ingenieurs_liste]})
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
                                <th>Nom</th>
                                <th>Num téléphone</th>
                                <th>Email</th>
                                <th>Spécialité</th>
                                <th>Responsable</th>
                                <th>Les actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody_scroll' >
                            {this.state.list_to_show.map((value,index)=>{
                                return (
                                    <tr key={index} >
                                        <td>{value.idIng}</td>
                                        <td>{value.nomIng}</td>
                                        <td>{"0"+value.numIng}</td>
                                        <td>{value.email}</td>
                                        <td>{value.specialite}</td>
                                        <td>{value.admin === 1 ? "Oui" : "Non" }</td>
                                        <td>
                                            <Button onClick={()=>  this.redirect("/modifier_ingenieur/"+value.idIng)} >Modifier</Button>
                                            <Button variant='danger' onClick={()=> {
                                               const data = deleteData(`ingenieur/${value.idAutomate}`,{
                                                email : JSON.parse(localStorage.getItem("user")).email
                                               })
                                               data.then((res)=>{
                                                if(res.status == 200){
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

export default withRouter(Ingenieurs)