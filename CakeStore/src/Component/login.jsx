import React, { PureComponent } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
toast.configure();
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(p) {
        var 
        count=0;
        if (p.length < 8) {
            count+=1;
            //errors.push("Your password must be at least 8 characters"); 
        }
        if (p.search(/[a-z][A-z]/i) < 0) {
           // errors.push("Your password must contain at least one letter.");
            count+=1;
        }
        if (p.search(/[0-9]/) < 0) {
            //errors.push("Your password must contain at least one digit."); 
            count+=1;
        }
        if (count > 0) {
            return false;
        }
        return true;
}

class Login extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
           errors:null,
           user:null
        }
    }
    submitLogin=(e)=>{
        e.preventDefault()
        this.setState({
            errors:null
        })
        var form=document.getElementById('form');
        
        if(!form["elements"]["emailfield"].value)
        {
            if(!form["elements"]["passwordfield"].value)
            {
                this.setState({
                    errors:{
                        email:"Email Required!",
                        password:"Password Required!"
                    }
                })
                form["elements"]["emailfield"].style["border-color"]="red";
            }
            else if(!validatePassword(form["elements"]["passwordfield"].value))
            {
                this.setState({
                    errors:{
                        email:"Email Required!",
                        password:"Password Must Contain at Least 8 Characters,1 letter and 1 digit"
                    }
                })
                form["elements"]["passwordfield"].style["border-color"]="red";
            }
            else
            {
                this.setState({
                    errors:{
                        email:"Email Required!",
                    }
                })
                form["elements"]["emailfield"].style["border-color"]="red";
            }
        }
        else if(!validateEmail(form["elements"]["emailfield"].value))
        {
            this.setState({
                errors:{
                    email:"Invalid Email Syntax!!"
                }
            })
            form["elements"]["emailfield"].style["border-color"]="red";
        }
        else if(!form["elements"]["passwordfield"].value)
        {
            this.setState({
                errors:{
                    password:"Enter Password!!"
                }
            })
            form["elements"]["passwordfield"].style["border-color"]="red"; 
        }
        else if(!validatePassword(form["elements"]["passwordfield"].value))
        {
            this.setState({
                errors:{
                    password:"Password Must Contain at Least 8 Characters,1 letter and 1 digit"
                }
            })
            form["elements"]["passwordfield"].style["border-color"]="red";
        }
        else{
            // this.setState({
            //     errors:null,
            //     user:{
            //         email:form["elements"]["emailfield"].value,
            //         password:form["elements"]["passwordfield"].value
            //     }
            // },()=>{
            //     return(axios   ({
            //         url:'https://apibyashu.herokuapp.com/api/login',
            //         method:'post',
            //         data:this.state.user
            //     }).then((response)=>{
            //         console.log(response)
            //         if(response.data.message)
            //         {
            //             toast.error(response.data.message)
            //         }
            //         if(response.data.token)
            //         {   
            //             console.log("response from login api",response)
            //             localStorage.token=response.data.token
            //             localStorage.email=response.data.email
            //             localStorage.name=response.data.name
            //             // this.props.inform_login()
            //             this.props.dispatch({
            //                 type:"LOGIN"
            //             })
            //             this.props.history.push("/")
            //         }
                    
            //     }),(error)=>{
            //         toast.error("Error",error)
            //         console.log("Error from login api",error)
            //     })
            // })

            this.setState({
                errors:null,
                user:{
                    username:form["elements"]["emailfield"].value,
                    password:form["elements"]["passwordfield"].value
                }
            },()=>{
                return(axios   ({
                    url:'http://68.183.80.25:8014/api/login/',
                    // url:'http://127.0.0.1:8000/api/login/',
                    method:'post',
                    data:this.state.user
                }).then((response)=>{
                    console.log(response)
                    if(response.data.message)
                    {
                        toast.error(response.data.message)
                    }
                    if(response.data.token)
                    {   
                        console.log("response from login api",response)
                        localStorage.token=response.data.token
                        localStorage.email=response.data.email
                        localStorage.name=response.data.username
                        localStorage.id=response.data.id
                        // this.props.inform_login()
                        this.props.dispatch({
                            type:"LOGIN"
                        })
                        this.props.history.push("/")
                    }
                    
                }),(error)=>{
                    toast.error("Error",error)
                    console.log("Error from login api",error)
                })
            })
            form["elements"]["emailfield"].style["border-color"]="green";
            form["elements"]["passwordfield"].style["border-color"]="green";
        }
    }
    render() {
        if(!this.props.loggedin)
        {
            return (
                <div className="container p-3" style={{ textAlign:"left",marginTop:"10%",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60,80,220,0.1)",boxShadow:"1px 1px 10px gray"}}>
                <div className="row justify-content-center">
                    <div className="col-sm-7">
    
                        <form id="form">
                            <h3>Login Form</h3><br></br>
    
                            <div class="form-group">
                                <span style={{color:"red"}}>{this.state.errors && this.state.errors.email}</span>
                                <input type="email" name="emailfield" class="form-control" id="" placeholder="Enter Username"  /><br></br>
                               
                            </div>
                            <div class="form-group">
                                <label style={{color:"red"}}>{this.state.errors && this.state.errors.password}</label>
                                <input type="password" name="passwordfield" class="form-control" id="p" placeholder="Enter Password"  /><br></br>
                                
                            </div>
                            <div class="form-group " style={{textAlign:"left"}}>
                                <button type="submit" class="btn btn-primary" onClick={this.submitLogin}>Login</button>
                                <Link to="/forgetpass" style={{padding:"10px",fontStyle:"italic",fontSize:"13px"}}>Forget Password?</Link>
                            </div>
                        </form>
                        <p>New User?<Link to="/signup" style={{padding:"10px",fontStyle:"italic",fontSize:"13px"}}>Sign_Up Now</Link></p>
    
                    </div>
                </div>
            </div>
            )
        }
        else{
           return <Redirect to="/"></Redirect>
        }
    }
}
var tempLogin=withRouter(Login)
export default connect()(tempLogin)
