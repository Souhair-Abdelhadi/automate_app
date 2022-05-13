import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'
import getData from '../api/getData'

 class Interventions extends Component {

    constructor(props){
        super(props)
        this.redirect = this.redirect.bind(this)
        this.state = {
            interventions_liste : [],
            liste_loaded : false,
            list_to_show : [],
            description : ''
        }
        
    }

    redirect(path){
        this.props.navigate(path) 
    }

    toggleImage = (src) => {
        this.setState({src : src})
        $('#image_div').toggle('slow')
    }

    
     
    formatDate = (date) => {
        try {
            var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        return [day, month, year].join('/');
        } catch (error) {
            console.log(error)
            return "undefined"
        }
      }


      closeDescription = (e) => {
          this.setState({description : e})
          $('#image_div').toggle()
      }

    componentDidMount(){
        const data = getData("interventions?email="+JSON.parse(localStorage.getItem("user")).email,null,"get")
        data.then((res)=>{
            if(res.status == "OK"){
                this.setState({list_to_show : res.doc,interventions_liste : res.doc})
            }
            else {
                console.log(res.message)
            }
        })
        .catch(e=>console.log(e.message))
    }

  render() {
    return (
      <div>
            <SideBar>
                
                <div className='image_div' id='image_div'  >
                <AiFillCloseCircle  className='close_icon' onClick={()=> this.closeDescription('')} />
                    <div className="description_modal">
                        <h4> Description de l'intervention </h4>
                        <div className='description_text' >
                            <p> {this.state.description} </p>
                        </div>
                    </div>
                </div>

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
                                            if(value.nomAutomate.toLowerCase().search(inputValue.target.value.toLowerCase()) !=-1){
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
                                        <td>{value.idInter}</td>
                                        <td>{value.id_automate}</td>
                                        <td>{value.nomAutomate}</td>
                                        <td>{value.nomIng}</td>
                                        <th>{ this.formatDate(value.date_inter) }</th>
                                        <th>{value.duree_inter}</th>
                                        <th><Button variant='info' onClick={()=> this.closeDescription(value.description) }   >Voir</Button></th>

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