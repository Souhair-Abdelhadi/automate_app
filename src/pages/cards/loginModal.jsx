import React, { Component } from 'react'
import "../../css/authentication/login.css"
import {FaEye,FaEyeSlash} from "react-icons/fa"
import $ from 'jquery'
import validator from "validator";
import {Modal,Button,Form} from "react-bootstrap"

export default class Test extends React.Component {

    state =  {
        email : '',
        password : '',
        passwordType : "password",
        showPassword : true,
        isPending : false,
        error : '',
        modalShow : false
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.setState({
            error : "",isPending : true,
        })
        $("emailInput").css({
            "border-color" : "white !important",
        })
        $("passwordEmail").css({
            "border-color" : "white !important",
        })
        if( validator.isEmail(this.state.email) && this.state.password.length >= 8)
        {

            
            let headers = new Headers()
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Origin','http://localhost:3000');
            headers.append('Authorization','bearer '+localStorage.getItem('access_token'))

            this.setState({isPending : true})

            fetch('http://localhost:3001/login',{
                mode :'cors',
                method : 'POST',
                headers : headers,
                body : JSON.stringify({
                    email : this.state.email,
                    password : this.state.password
                })
            })
            .then((res)=>{
                res.json().then((data)=>{
                    this.setState({isPending : false})
                    console.log("data : ",data)
                    if(data.status == "OK"){
                        localStorage.setItem('access_token',data.access_token);
                        localStorage.setItem('refresh_token',data.refresh_token);
                        localStorage.setItem('email',this.state.email )
                        console.log(localStorage.getItem('email'))
                    }
                    else if( data.status == "LOGIN_ERROR")  {
                        this.setState({error : data.message})

                    }
                })
                .catch(e=>{
                    console.log(e)
                    this.setState({isPending : false})
                })
            })
            .catch(e=>{
                console.log(e)
                this.setState({isPending : false})
            })
            
        }
        else {
            this.setState({isPending : false})
            if(!validator.isEmail(this.state.email))
            {
                this.setState({
                    error : "enter a valid email"
                })
                $("emailInput").css({
                    "border-color" : "red !important",
                })
            }
            else if(this.state.password.length < 8)
            {
                this.setState({
                    error : "enter password of length >= 8"
                })
                $("passwordEmail").css({
                    "border-color" : "red !important",
                })
            }
            
        }
    }
    showPassword = () =>{
        if(this.state.passwordType === "password"){
            this.setState({passwordType : "text",showPassword : false})
        }
        if(this.state.passwordType === "text"){
            this.setState({passwordType : "password",showPassword : true})
        }
    }

   

  render() {
    return (

            <Modal
                show={this.props.modalShow}
                onHide={()=>{this.props.onHide(this.props.this)}}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="login_modal_height"
            >
                <Modal.Header className='login_modal_header'  closeButton>
                    <Modal.Title className='login_modal_title'  id="contained-modal-title-vcenter">
                        Authentication
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e)=>{                        
                        this.handleSubmit(e)

                    }} >
                            <Form.Group className="mb-3" >
                                <div className='login_error_message' >
                                {this.state.error } 
                                </div>
                            </Form.Group>
                            
                        <div className='center_elems' >
                        <Form.Group className="mb-3 login_input"  controlId="formBasicEmail">
                            <Form.Label id="email" >Email address</Form.Label>
                            <Form.Control className='emailInput'  type="email" placeholder="Enter email" onChange={(e)=>this.setState({email : e.target.value})} required />
                            
                        </Form.Group>

                        <Form.Group className="mb-3 login_input" controlId="formBasicPassword">
                            <Form.Label id="password" >Password</Form.Label>
                            <Form.Control className='passwordEmail'   type={!this.state.showPassword ? "text" : "password"} placeholder="Password" onChange={(e)=>this.setState({password : e.target.value})} required />
                            {this.state.showPassword && <FaEye  onClick={this.showPassword} style={{
                                height : 20,
                                width : 20,
                                position : 'relative',
                                left : "90%",
                                marginTop : "-15%"
                            }} />}
                            {!this.state.showPassword && <FaEyeSlash  onClick={this.showPassword} style={{
                                height : 20,
                                width : 20,
                                position : 'relative',
                                left : "90%",
                                marginTop : "-15%"
                            }} />}
                        </Form.Group>
                        </div>
                        
                        {!this.state.isPending && <Button className='submit_elem'  variant="primary" size="lg" type="submit">
                            Login
                        </Button>}
                        {this.state.isPending && <Button className='submit_elem'  variant="primary" size="lg" type="submit">
                            Login to your account ...
                        </Button>}
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor : "rgba(67, 140, 235, 0.692)"}} >
                </Modal.Footer>
            </Modal>

    )
  }
}

