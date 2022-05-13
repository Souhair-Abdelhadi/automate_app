import {Nav} from "react-bootstrap"
import React, { Component } from 'react'
import "../../css/sidebar.css"
import {GiExitDoor} from "react-icons/gi"
import { withRouter } from "../../js/withRouter"
import {Link} from 'react-router-dom'

class SideBar extends Component {
  render() {
    return (
        <div className="sidebar_grid">
            <div className="sidebar_container" >
                <GiExitDoor className="exit_icon" title="Logout" onClick={()=> {
                    localStorage.setItem("isAuthenticated",false)
                    this.props.navigate("/")
                } }  />
                <div >
                    <Nav defaultActiveKey="/home" className="flex-column nav_scroll"
                        navbarScroll={true} style={{ left: 0 }} >
                        <div className="profile">
                            <div className="user_name_email" > 
                                <p> BONJOUR :   </p>
                                <p> {  JSON.parse(localStorage.getItem("user")).nomIng ? JSON.parse(localStorage.getItem("user")).nomIng.toUpperCase() : "" }  </p>
                                <p>{JSON.parse(localStorage.getItem("user")).email}</p>
                            </div>

                        </div>
                        <Link className="item" to="/automates">Automates</Link>
                        { typeof JSON.parse(localStorage.getItem('user')).admin != 'undefined' && JSON.parse(localStorage.getItem('user')).admin === 1 ? <Link className="item" to="/ingenieurs">Ingenieurs</Link> : null}    
                        { typeof JSON.parse(localStorage.getItem('user')).admin != 'undefined' && JSON.parse(localStorage.getItem('user')).admin === 1 ? <Link className="item" to="/clients">Clients</Link> : null}    
                        <Link className="item" to="/interventions">Intervention</Link>
                        <Link className="item" to="/piece_rechange">Piece de rechange</Link>
                    </Nav>
                </div>
            </div>
            <div className="props_children" >
                {this.props.children}
            </div>
        </div>
    )
  }
}


export default withRouter(SideBar)