import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'

export default class Intervention extends Component {

    constructor(props){
        super(props)
        this.state = {
            intervention_liste : [],
            liste_loaded : false,
            src : null,
            list_to_show : []
        }
        for(var i=1; i<= 15; i++){
            var obj = {
                id : i,
                id_automate : i,
                date_inter : "date "+i,
                id_ing	: i,
                duree_inter : "duree "+i,
                description : "description "+i,

            }
            this.state.intervention_liste.push(obj)
            this.setState({list_to_show : [...this.state.intervention_liste]})
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
        console.log(this.state.intervention_liste)
        this.setState({list_to_show : [...this.state.intervention_liste]})
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
                        <Button variant="info" onClick={()=>console.log("redirect to the page")} className='ajouter_automate_btn' >Faire une intervention</Button>
                    </div>
                    <div>
                        <InputGroup className="mb-3 search_input">
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                            <FormControl
                                aria-label="Search"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(inputValue)=>{
                                    if(inputValue.target.value.length != 0){
                                        var list = this.state.intervention_liste.filter((value)=>{
                                            if(value.id_automate == inputValue.target.value ){
                                                return value
                                            }
                                            
                                        })
                                        this.setState({list_to_show : [...list]})
                                    }
                                    else {
                                            this.setState({list_to_show : [...this.state.intervention_liste]})
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
                                <th>Date</th>
                                <th>id ingenieur</th>
                                <th>Duree</th>
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
                                        <td>{value.date_inter}</td>
                                        <td>{value.id_ing}</td>
                                        <td>{value.duree_inter}</td>
                                        <td>
                                        {value.description}
                                        </td>
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
