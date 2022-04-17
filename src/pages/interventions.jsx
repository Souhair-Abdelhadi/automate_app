import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'

 class Interventions extends Component {

    constructor(props){
        super(props)
        this.redirect = this.redirect.bind(this)
        this.state = {
            interventions_liste : [],
            liste_loaded : false,
            list_to_show : []
        }
        for(var i=1; i<= 15; i++){
            var obj = {
                id : i,
                id_automate : i,
                nom_automate : "nom "+i,
                id_ing	: i,
                nom_ing : "ing "+ i,
                date_inter : "date "+i,
                duree_inter : i+" jour(s)",
                description : "description " +i,

            }
            this.state.interventions_liste.push(obj)
            this.setState({list_to_show : [...this.state.interventions_liste]})
            if( i == 15){
                this.setState({liste_loaded : true})
            }
        }
    }

    redirect(path){
        this.props.navigate(path) 
    }

    toggleImage = (src) => {
        this.setState({src : src})
        $('#image_div').toggle('slow')
    }

    componentDidMount(){
        console.log(this.state.interventions_liste)
        this.setState({list_to_show : [...this.state.interventions_liste]})
    }

  render() {
    return (
      <div>
            <SideBar>
                
                <div className='interface_header' >
                    <h1 id='header_text' >Liste des interventions</h1>

                </div>

                <div className='bar_actions' >
                    <div>
                        <Button variant="info" onClick={()=> this.redirect("/ajouter_intervention") } className='ajouter_automate_btn' >Ajouter une intervention</Button>
                    </div>
                    <div>
                        <InputGroup className="mb-3 search_input">
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                            <FormControl
                                aria-label="Search"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(inputValue)=>{
                                    if(inputValue.target.value.length != 0){
                                        var list = this.state.interventions_liste.filter((value)=>{
                                            if(value.nom_automate.toLowerCase().search(inputValue.target.value.toLowerCase()) !=-1){
                                                return value 
                                            }
                                            
                                        })
                                        this.setState({list_to_show : [...list]})
                                    }
                                    else {
                                            this.setState({list_to_show : [...this.state.interventions_liste]})
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
                                <th>id automate</th>
                                <th>Nom automate</th>
                                <th>id ing</th>
                                <th>Nom ing</th>
                                <th>Date intervention</th>
                                <th>Duree intervention</th>
                                <th>Description</th>
                                <th>Les actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody_scroll' >
                            {this.state.list_to_show.map((value,index)=>{
                                return (
                                    <tr key={index} >
                                        <td>{value.id}</td>
                                        <td>{value.id_automate}</td>
                                        <td>{value.nom_automate}</td>
                                        <td>{value.id_ing}</td>
                                        <td>{value.nom_ing}</td>
                                        <th>{value.date_inter}</th>
                                        <th>{value.duree_inter}</th>
                                        <th>{value.description}</th>

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


export default withRouter(Interventions)