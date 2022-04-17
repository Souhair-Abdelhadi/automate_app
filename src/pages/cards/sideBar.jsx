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
                <GiExitDoor className="exit_icon" />
                <div >
                    <Nav defaultActiveKey="/home" className="flex-column nav_scroll"
                        navbarScroll={true} style={{ left: 0 }} >
                        <div className="profile">
                            <img src="https://flyclipart.com/thumb2/download-person-free-vector-png-137844.png" alt="user image" className="user_image" />
                            <div className="user_name_email" >
                                <p>SOUHAIR abdelhadi</p>
                                <p>souhairabdelhadi@gmail.Com</p>
                            </div>

                        </div>
                        <Link className="item" to="/automates">Automates</Link>
                        <Link className="item" to="/clients">Clients</Link>
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