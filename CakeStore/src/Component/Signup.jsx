import React, { PureComponent } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router';
import { traverseTwoPhase } from 'react-dom/test-utils';
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
class Signup extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            errors:null,
            user:{}
        }
    }
    handleEmail=(e)=>{
        let email=e.target.value
        if(!email)
        {  
            e.target.style.border='2px solid red'
            this.setState({
                errors:{
                    email:"Please Enter Mail!!"
                }
            })
          
        }
        else if(!validateEmail(email))
        {
            this.setState({
                errors:{
                    email:"Invalid Email Syntax!"
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
    handlename=(e)=>{
        let name=e.target.value
        if(!name)
        {
            e.target.style.border="2px solid red"
            this.setState({
                errors:{
                    name:"Please Enter Name!!"
                }
            })
        }
        else if(name.length<6){
            e.target.style.border="2px solid red"
            this.setState({
                errors:{
                    name:"Name should have at least 6 characters!!"
                }
            })
        }
        else{
            this.setState({
                errors:{
                    name:null
                }
            })
            e.target.style.border="2px solid green"
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

    onFormSubmit=(e)=>{
        e.preventDefault()
        let eemail=e.target.form["elements"]["emailfield"].value
        let password=e.target.form["elements"]["passwordfield"].value
        let repassword=e.target.form["elements"]["repasswordfield"].value
        let nname=e.target.form["elements"]["namefield"].value
        this.setState({
            errors:null
        })
        if(eemail && password && password==repassword && nname)
        {
            this.setState({
                user:{
                    email:eemail,
                    password:password,
                    username:eemail
                }
            },()=>{
                return(axios   ({
                    // url:'https://apibyashu.herokuapp.com/api/register',
                    // url:'http://68.183.80.25:8001/api/register/',
                    url:'http://127.0.0.1:8000/api/register/',
                    method:'post',
                    data:this.state.user
                }).then((response)=>{
                    console.log(response)
                    if(response.data.message=="User Registered")
                    {
                        toast.success(response.data.message)
                        this.props.history.push("/login")
                    }
                    else{
                        toast.error(response.data.message)
                    }
                    
                    console.log("response from signup api",response)
                }),(error)=>{
                    toast.error("Error",error)
                    console.log("Error from signup api",error)
                })
            })
        }
        else
        {
            let temp={}
            if(!nname)
            {
                temp["name"]="Name required!!!"
            } 
            if(!eemail)
            {
                temp["email"]="Email required!!"
            } 
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


    render() {
        return (
            <div className="container p-3" style={{ textAlign:"left",marginTop:"10%",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60,80,220,0.1)",boxShadow:"1px 1px 10px gray"}}>
            <div className="row justify-content-center">
                <div className="col-sm-7">
                   <form id="form">
                        <h3>SignUp Form</h3><br></br>                    
                            <span style={{color:"red"}}>{this.state.errors && this.state.errors.name}</span>
                            <input type="name" name="namefield" class="form-control" id="" placeholder="Enter name"  onChange={this.handlename} />  <br></br>
                            <span style={{color:"red"}}>{this.state.errors && this.state.errors.email}</span>
                            <input type="email" name="emailfield" class="form-control"  placeholder="Enter Email address"  onChange={this.handleEmail} /><br></br>
                            <span style={{color:"red"}}>{this.state.errors && this.state.errors.pass}</span>
                            <input type="password" name="passwordfield" class="form-control" id="p1" placeholder="Enter Password" onChange={this.handlePassword} /><br></br>
                            <span id="matched" >{this.state.errors && this.state.errors.pass2}</span>
                            <input type="password" name="repasswordfield" class="form-control" id="p2" placeholder="Re-Enter Password" onChange={this.checkPassword} /><br></br>
                        <div style={{color:"red"}}>
                            <h6 id="warning"></h6>
                        </div>
                        <div style={{textAlign:"left"}}>
                            <button type="submit" class="btn btn-primary" onClick={this.onFormSubmit} >SignUp</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        )
    }
}

export default Signup