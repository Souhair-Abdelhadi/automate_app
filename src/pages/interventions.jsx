import React, { Component } from 'react'
import "../css/interfaces_style.css"
import {Table,Button,InputGroup,FormControl} from "react-bootstrap"
import SideBar from './cards/sideBar'
import {AiFillCloseCircle} from "react-icons/ai"
import $ from 'jquery'
import { withRouter } from '../js/withRouter'
import getData from '../api/getData'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    'Roboto' : {
        normal : 'Roboto-Regular.ttf',
        bold : 'Roboto-Medium.ttf',
        italics : 'Roboto-Italic.ttf',
        bolditalics : 'Roboto-Italic.ttf'
    }
}

 class Interventions extends Component {

    constructor(props){
        super(props)
        this.redirect = this.redirect.bind(this)
        this.state = {
            interventions_liste : [],
            liste_loaded : false,
            list_to_show : [],
            description : '',
            piecesListe : []
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

      showPieces = (idInter) => {
        const data = getData(`pieces_automate_intervention/${idInter}`,null,"get")
        data.then((res)=>{
            if(res.status == "OK"){
                this.setState({piecesListe :  res.doc})
                $('#piece_div').toggle()
            }
            else {
                console.log(res.message)
            }
        })
        .catch(e=>console.log(e.message))
      }

      closeDescription = (e) => {
          this.setState({description : e})
          $('#image_div').toggle()
      }

      pdfContent = (sections,pageWidth,pageHeight) => {
        const pageSize = {
            width : pageWidth * 50,
            height : pageHeight * 30
        }
        const pageMargins = [5,5,40,60]
        let content = []
        sections.forEach((section,si)=>{

            content.push({
                text : 'Diagnostic Systems \t Fiche d\'intervention ',
                fontSize : 40,
                alignment : 'left',
                margin : [30,30],
                pageBreak : si === 0 ? null : 'before'
            })

            content.push({
                text : 'Nom labo : '+section.nom_labo,
                fontSize : 18,
                alignment : 'left',
                margin : [15,15],
                pageBreak : si === 0 ? null : 'before'
            })

            content.push({
                text : 'Id d\'intervention : '+section.idInter,
                fontSize : 18,
                alignment : 'left',
                margin : [15,15],
                pageBreak : si === 0 ? null : 'before'
            })
            content.push({
                text : 'Id d\'automate : '+section.id_automate,
                fontSize : 18,
                alignment : 'left',
                margin : [15,15],
                pageBreak : si === 0 ? null : 'before'
            })
            content.push({
                text : 'Id d\'ingénieur : '+section.id_ing,
                fontSize : 18,
                alignment : 'left',
                margin : [15,15],
                pageBreak : si === 0 ? null : 'before'
            })
            content.push({
                text : 'Date d\'intervention : '+ this.formatDate(section.date_inter),
                fontSize : 18,
                alignment : 'left',
                margin : [15,15],
                pageBreak : si === 0 ? null : 'before'
            })
            content.push({
                text : 'Durée d\'intervention : '+section.duree_inter + ' heure(s)',
                fontSize : 18,
                alignment : 'left',
                margin : [15,15],
                pageBreak : si === 0 ? null : 'before'
            })
            content.push({
                text : 'Description  : '+section.description,
                fontSize : 18,
                alignment : 'left',
                margin : [15,15],
                pageBreak : si === 0 ? null : 'before'
            })
        })
        return {
            pageSize,content,pageMargins
        }
      }

      printPdf = (sections,pageWidth,pageHeight,type) => {
        const {pageSize,content,pageMargins} = this.pdfContent(sections,pageWidth,pageHeight)
        const docDefinition = {
            pageSize,
            content : content,
            pageMargins,
            footer : function(currentPage,pageCount){
                return {
                    text : "Page "+ currentPage.toString() + ' of '+pageCount,
                    alignment : 'left' ,
                    style : 'normalText',
                    margin : [10,10,10,10]
                }
            }
        }
        console.log(docDefinition)
        if(type === "print"){
            pdfMake.createPdf(docDefinition).print()
        }
        if(type === "open"){
            pdfMake.createPdf(docDefinition).open({},window) 
        }
      }


    componentDidMount(){
        const data = getData("interventions?email="+JSON.parse(localStorage.getItem("user")).email+"&admin="+JSON.parse(localStorage.getItem("user")).admin,null,"get")
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
                <div className='image_div' id='piece_div'  >
                <AiFillCloseCircle  className='close_icon' onClick={()=> $('#piece_div').toggle()} />
                    <div className="description_modal">
                        <h4> Pieces de rechanges utiliser  </h4>
                        <div className='description_text' >
                            {this.state.piecesListe.length != 0 ? this.state.piecesListe.map((value,index)=>{
                              return  <p> {"Nom de Piece : "+value.nomPiece+ " , "+ "marque de Piece : "+value.marquePiece} </p>
                            }) : <p>Rien utiliser</p> }
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
                                <th>Pieces de rechanges</th>
                                <th>Fiche</th>
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
                                        <th>{value.duree_inter+" heure(s)"}</th>
                                        <th><Button variant='info' onClick={()=> this.showPieces(value.idInter) }   >Voir</Button></th>
                                        <th><Button style={{backgroundColor : 'green'}}  
                                            onClick={()=> this.printPdf([this.state.list_to_show[index]],20,20,"open") } >voir</Button>
                                        </th>
                                        <td>
                                            {typeof JSON.parse(localStorage.getItem("user")).admin != 'undefined' && JSON.parse(localStorage.getItem("user")).admin === 1 ?
                                                <Button onClick={()=> this.props.navigate(`/modifier_intervention/${value.idInter}`)} >Modifier</Button>
                                                :null
                                            }
                                            <Button style={{backgroundColor : 'green'}}  
                                             onClick={()=> this.printPdf([this.state.list_to_show[index]],20,20,"print") } >imprimer</Button>

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