import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'
import getData from "../api/getData"
import deleteData from '../api/deleteData'
class Clients extends Component {

    constructor(props){
        super(props)
        this.state = {
            clients_liste : [],
            liste_loaded : false,
            src : null,
            list_to_show : []
        }

        // for(var i=1; i<= 15; i++){
        //     var obj = {
        //         id : i,
        //         nom_labo : "Labo "+i,
        //         ville : "Ville "+i,
        //         adresse	: "adresse "+i

        //     }
        //     this.state.clients_liste.push(obj)
        //     this.setState({list_to_show : [...this.state.clients_liste]})
        //     if( i == 15){
        //         this.setState({liste_loaded : true})
        //     }
        // }
    }

    redirect(path){
        this.props.navigate(path) 
    }


    componentDidMount(){

        const data = getData("clients",null,"get")
        data.then((res)=>{
            if(res.status == "OK"){
                this.setState({list_to_show : res.doc,clients_liste: res.doc})
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
                    <h1 id='header_text' >Liste des clients</h1>

                </div>

                <div className='bar_actions' >
                    <div>
                        <Button variant="info" onClick={()=> this.props.navigate("/ajouter_client") } className='ajouter_automate_btn' >Ajouter une client</Button>
                    </div>
                    <div>
                        <InputGroup className="mb-3 search_input">
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                            <FormControl
                                aria-label="Search"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(inputValue)=>{
                                    if(inputValue.target.value.length != 0){
                                        var list = this.state.clients_liste.filter((value)=>{
                                            if(value.nom_labo.toLowerCase().search(inputValue.target.value.toLowerCase()) !=-1){
                                                return value
                                            }
                                            
                                        })
                                        this.setState({list_to_show : [...list]})
                                    }
                                    else {
                                            this.setState({list_to_show : [...this.state.clients_liste]})
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
                                <th>Nom labo</th>
                                <th>Num téléphone</th>
                                <th>Ville</th>
                                <th>Adresse</th>
                                <th>Les actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody_scroll' >
                            {this.state.list_to_show.map((value,index)=>{
                                return (
                                    <tr key={index} >
                                        <td>{value.idLabo}</td>
                                        <td>{value.nom_labo}</td>
                                        <td>{"0"+value.numPhone}</td>
                                        <td>{value.ville}</td>
                                        <td>
                                            {value.adresse}
                                        </td>
                                        <td>
                                            <Button onClick={()=>  this.redirect("/modifier_client/"+value.idLabo)} >Modifier</Button>
                                            <Button variant='danger' onClick={()=> {
                                               const data = deleteData(`client/${value.idLabo}`,{
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

export default withRouter(Clients)