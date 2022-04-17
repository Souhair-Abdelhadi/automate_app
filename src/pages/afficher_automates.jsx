import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'

 class ShowAutomates extends Component {

    constructor(props){
        super(props)
        this.redirect = this.redirect.bind(this)
        this.state = {
            automates_liste : [],
            liste_loaded : false,
            src : null,
            list_to_show : []
        }
        for(var i=1; i<= 15; i++){
            var obj = {
                id : i,
                labo : "Labo"+i,
                ingenieur : "Ingénieur"+i,
                nom_automate	: "Nom automate	"+i,
                marque_automate : "Marque automate	"+i,
                image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSie8A8YLcuD4wg6pVY2mOX46T4DELiI-gITA&usqp=CAU",

            }
            this.state.automates_liste.push(obj)
            this.setState({list_to_show : [...this.state.automates_liste]})
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
        console.log(this.state.automates_liste)
        this.setState({list_to_show : [...this.state.automates_liste]})
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
                    <h1 id='header_text' >Liste des automates</h1>

                </div>

                <div className='bar_actions' >
                    <div>
                        <Button variant="info" onClick={()=> this.redirect("/ajouter_automate") } className='ajouter_automate_btn' >Ajouter une automate</Button>
                    </div>
                    <div>
                        <InputGroup className="mb-3 search_input">
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                            <FormControl
                                aria-label="Search"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(inputValue)=>{
                                    if(inputValue.target.value.length != 0){
                                        var list = this.state.automates_liste.filter((value)=>{
                                            if(value.labo.search(inputValue.target.value) !=-1){
                                                return value
                                            }
                                            
                                        })
                                        this.setState({list_to_show : [...list]})
                                    }
                                    else {
                                            this.setState({list_to_show : [...this.state.automates_liste]})
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
                                <th>Labo</th>
                                <th>Ingénieur</th>
                                <th>Nom automate</th>
                                <th>Marque automate</th>
                                <th>Image</th>
                                <th>Les actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody_scroll' >
                            {this.state.list_to_show.map((value,index)=>{
                                return (
                                    <tr key={index} >
                                        <td>{value.id}</td>
                                        <td>{value.labo}</td>
                                        <td>{value.ingenieur}</td>
                                        <td>{value.nom_automate}</td>
                                        <td>{value.marque_automate}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => this.toggleImage(value.image)} >Voir</Button>
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


export default withRouter(ShowAutomates)