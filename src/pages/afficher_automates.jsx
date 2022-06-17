import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'
import getData from '../api/getData'
import deleteData from '../api/deleteData'
class ShowAutomates extends Component {

    constructor(props){
        super(props)
        this.redirect = this.redirect.bind(this)
        this.state = {
            automates_liste : [],
            liste_loaded : false,
            src : null,
            list_to_show : [],
            imageOpened : false,
        }
        
    }

    redirect(path){
        this.props.navigate(path) 
    }

    toggleImage = (src) => {
        if(!this.state.imageOpened){
            var binary = '';
            var bytes = new Uint8Array( src.data );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode( bytes[ i ] );
            }
            console.log("binary :",binary)
            this.setState({src : binary})
            this.setState({imageOpened : true})
        }
       else {
           this.setState({imageOpened : false})
       }
        $('#image_div').toggle('slow')
    }

    componentDidMount(){
        const data = getData("automates?email="+JSON.parse(localStorage.getItem("user")).email+"&admin="+JSON.parse(localStorage.getItem("user")).admin,null,"get")
        data.then((res)=>{
            console.log(res)
            if(res.status == "OK"){
                this.setState({list_to_show : res.doc})
            }
            else {
                this.setState({list_to_show : []})
            }
        })
        .catch(e=>{
            console.log(e.message)
            this.setState({list_to_show : []})
        })
        
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
                { typeof JSON.parse(localStorage.getItem('user')).admin != 'undefined' && JSON.parse(localStorage.getItem('user')).admin === 1 ? <div>
                        <Button variant="info" onClick={()=> this.redirect("/ajouter_automate") } className='ajouter_automate_btn' >Ajouter une automate</Button>
                    </div> : null}    

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
                                <th>Traiter</th>
                                <th>Image</th>
                                <th>Les actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody_scroll' >
                            {this.state.list_to_show.map((value,index)=>{
                                return (
                                    <tr key={index} >
                                        <td>{value.idAutomate}</td>
                                        <td>{value.idLabo}</td>
                                        <td>{value.id_ing}</td>
                                        <td>{value.nomAutomate}</td>
                                        <td>{value.marqueAutomate}</td>
                                        <td>{value.traiter === 1 ? "Oui" : "Non" }</td>
                                        <td>
                                            <Button variant="primary" onClick={() => this.toggleImage(value.image)} >Voir</Button>
                                        </td>
                                        <td>
                                        {typeof JSON.parse(localStorage.getItem("user")).admin != 'undefined' && JSON.parse(localStorage.getItem("user")).admin === 1 ? 
                                            <Button onClick={()=>  this.redirect("/modifier_automate/"+value.idAutomate)}  >modifier</Button>

                                            :null}  
                                            {typeof JSON.parse(localStorage.getItem("user")).admin != 'undefined' && JSON.parse(localStorage.getItem("user")).admin === 1 ? 
                                                <Button variant='danger' onClick={()=> {
                                                    const data = deleteData(`automate/${value.idAutomate}`,{
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
                                            :null}  
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