import React, { Component } from 'react'
import "../css/notFound.css"
import { withRouter } from '../js/withRouter'

 class PageNotFound extends Component {

   
   componentDidMount(){

    document.body.style.backgroundColor = "#181828"
        
   }
   
   componentWillUnmount(){
    document.body.style.backgroundColor = "white"
   }

   

  render() {
    return (
      <div className='pagenotfound__body'  >

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
            <div style={{cursor : 'pointer'}} onClick={()=>this.props.navigate("/")} className="error__nav e-nav">
              <a  target="_blanck" className="e-nav__link"></a>
            </div>
          </div>

        </section>

      </div>
    )
  }
}

export default withRouter(PageNotFound)