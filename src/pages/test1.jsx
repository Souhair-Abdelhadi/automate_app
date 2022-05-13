import React, { Component } from 'react'
import {Form,Button,InputGroup,Row} from "react-bootstrap"
import $ from "jquery"
import "../css/notFound.css"
 class Test1 extends Component {

   constructor(props) {
     super(props)
     this.state = {
       
     }

   }

   componentDidMount(){
    
        
   }

  render() {
    return (
      <div  >

        <header className="top-header">
        </header>

        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>

        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>

        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className='message__title'>Page Not Found</h1>
              <p className="message__text">Nous sommes désolés, la page que vous recherchez ne se trouve pas ici.</p>
            </div>
            <div style={{cursor : 'pointer'}}  className="error__nav e-nav">
              <a onClick={()=>this.props.navigate("/")} target="_blanck" className="e-nav__link"></a>
            </div>
          </div>

        </section>

      </div>
    )
  }
}

export default Test1