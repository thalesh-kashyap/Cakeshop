import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Component } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
class Forgetpass extends Component {
  
    constructor(props) {
        super(props)

        this.state = {
            error:null,
            email:null,
            senttoken:false,
            allowreset:false,
            gotToken:null,
            password:null,
        }
    }
    
    onEmailChange=(e)=>{
        let temperror=[]
        let errorfield=document.getElementById("errorfield")
        if(!e.target.value)
        {
            temperror["email"]="Email Required!"
            errorfield.style.color="red"
            e.target.style.border="1px solid red"
            this.setState({
                error:temperror,
                email:null
            })
        }
        else if( !validateEmail(e.target.value))
        {
            temperror["email"]="Invalid Email Syntax!"
            errorfield.style.color="red"
            e.target.style.border="1px solid red"
            this.setState({
                error:temperror,
                email:null
            })
        }
        else{
            errorfield.style.color="green"
            e.target.style.border="1px solid green"
            this.setState({
                error:null,
                email:e.target.value
            })
        }
    }
    verifyToken=()=>{
        var form=document.getElementById('form');
        this.setState({
            error:null
        })
        if(!form["elements"]["textfield"].value)
            {
                this.setState({
                    error:{
                        token:"Token Required!",
                    }
                })
                document.getElementById("tokenfield").style.color="red"
                form["elements"]["textfield"].style["border-color"]="red";
            }
        else{
            if (this.state.gotToken==form["elements"]["textfield"].value)
            {
                this.setState({
                    allowreset:true
                })
            }
            else{
                this.setState({
                    error:{
                        token:"Invalid token",
                    }
                })
                document.getElementById("tokenfield").style.color="red"
                form["elements"]["textfield"].style["border-color"]="red";
            }

        }
    }

    sentPassword=()=>{
        if(this.state.email)
        {
            axios({
               method:"post",
            //    url:"https://apibyashu.herokuapp.com/api/recoverpassword",
            url:"http://68.183.80.25:8014/api/recoverpassword/",
            // url:"http://127.0.0.1:8000/api/recoverpassword/",
               data:{"email":this.state.email}, 
            }).then((response)=>{
                if(response.data.message[0]=="N")
                {
                    // "message": "No Such Email exists"
                    toast.error(response.data.message)
                }
                else{
                    // "message": "Password Sent to your email"
                    toast.success(response.data.message)
                    this.setState({
                        senttoken:true,
                        gotToken:response.data.token,
                    })

                }
               
            },(error)=>{
                toast.error("No Such Email exists")
            })
        }
        else{
            toast.error("Email Required!!")
        }
    }
    resetPassword=(e)=>{

        let password=e.target.form["elements"]["passwordfield"].value
        let repassword=e.target.form["elements"]["repasswordfield"].value
        if(password && password==repassword)
        {
            this.setState({
                    password:password,

            },()=>{
                console.log("suceess from reset password",this.state.password,this.state.email)
                axios({
                    method:"post",
                 //    url:"https://apibyashu.herokuapp.com/api/recoverpassword",
                    url:"http://68.183.80.25:8014/api/resetpass/",
                    // url:"http://127.0.0.1:8000/api/resetpass/",
                    data:{"email":this.state.email,"password":this.state.password}, 
                 }).then((response)=>{
                     console.log("Success from forget password",response)
                     if(response.data.message=="success")
                     {
                         // "message": "No Such Email exists"
                         toast.success("Success..")
                         this.props.history.push("/login")
                     }
                     else{
                         // "message": "Password Sent to your email"
                         toast.error("failed try Again!!!")
                         this.props.history.push("/forgetpass")
                     }
                    
                 },(error)=>{
                     console.log("error from forget password",error)
                 })
            })
        }
        else
        {
            let temp={}
            if(!password)
            {
                temp["pass"]="Password required!!"
            }
            if(!repassword)
            {
                temp["pass2"]="Password required!!"
                document.getElementById("matched").style.color="red"
            } 
            this.setState({
                errors:temp
            })  
        }

    }

    handlePassword=(e)=>{
        let pass=e.target.value
        if(!pass)
        {  e.target.style.border='2px solid red'
            this.setState({
                errors:{
                    pass:"Please Enter Password!!"
                }
            })
          
        }
        else if(!validatePassword(pass))
        {
            this.setState({
                errors:{
                    pass:"Password Must Contain at Least 8 Characters,1 letter and 1 digit"
                }
            })
            e.target.style.border="2px solid red"
        }
        else{
            this.setState({
                errors:null
            })
            e.target.style.border="2px solid green"
        }
    }
    checkPassword=(e)=>{
        let recheck=e.target.value;
        if(!recheck)
        {
            this.setState({
                errors:{
                    pass2:"Please Enter Password!"
                }
            })
            e.target.style.border="2px solid red"
            document.getElementById("matched").style.color="red"
        }
        else if(recheck==document.getElementById("p1").value)
        {
            this.setState({
                errors:{
                    pass2:"Password Matched.."
                }
            })
            e.target.style.border="2px solid green"
            document.getElementById("matched").style.color="green"
        }
        else{
            this.setState({
                errors:{
                    pass2:"Not Matched.."
                }
            })
            e.target.style.border="2px solid red"
            document.getElementById("matched").style.color="red"
        }
    }

    render() {
        if(localStorage.token)
        {
            return <Redirect to="/"/>
        }
        else if(!this.state.allowreset)
        {
            return (
                <div className="container p-3" style={{ textAlign:"left",marginTop:"10%",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60,80,220,0.1)",boxShadow:"1px 1px 10px gray"}}>
                <div className="row justify-content-center">
                    <div className="col-sm-7">

                        {!this.state.senttoken && <form id="form">
                            <h3>Forget Password?</h3><br></br>
        
                            <div class="form-group">
                                <span id="errorfield" >{this.state.error && this.state.error.email}</span>
                                <input type="email" name="emailfield" class="form-control" id="" placeholder="Email_Id (Required..)"  onChange={this.onEmailChange}/><br></br>
                               
                            </div>
                            <div class="form-group " style={{textAlign:"left"}}>
                                <button type="button" class="btn btn-primary" onClick={this.sentPassword}>Sent Token</button>
                               
                            </div>
                        </form>
                        }
                        {
                            this.state.senttoken &&
                            <form id="form">
                                <h3>Enter Token</h3><br></br>
            
                                <div class="form-group">
                                    <span id="tokenfield" >{this.state.error && this.state.error.token}</span>
                                    <input type="text" name="textfield" class="form-control" id="" placeholder="Token (Required..)" required/><br></br>
                                
                                </div>
                                <div class="form-group " style={{textAlign:"left"}}>
                                    <button type="button" class="btn btn-primary" onClick={this.verifyToken}>Verify Token</button>
                                
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
            )
        }
        else{
            return (
                <div className="container p-3" style={{ textAlign:"left",marginTop:"10%",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60,80,220,0.1)",boxShadow:"1px 1px 10px gray"}}>
                <div className="row justify-content-center">
                    <div className="col-sm-7">
        
                        <form id="form">
                            <h3>Reset Password</h3><br></br>
        
                            <span style={{color:"red"}}>{this.state.errors && this.state.errors.pass}</span>
                            <input type="password" name="passwordfield" class="form-control" id="p1" placeholder="Enter Password" onChange={this.handlePassword} /><br></br>
                            <span id="matched" >{this.state.errors && this.state.errors.pass2}</span>
                            <input type="password" name="repasswordfield" class="form-control" id="p2" placeholder="Re-Enter Password" onChange={this.checkPassword} /><br></br>
                            <button type="button" class="btn btn-primary" onClick={this.resetPassword}>Sent Token</button>
                            
                        </form>
                    </div>
                </div>
            </div>
            )

        }
        
    }
}

export default Forgetpass
