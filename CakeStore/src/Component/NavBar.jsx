import React from 'react'
import {useEffect,useState} from 'react'
import { connect } from 'react-redux'
import {Link,withRouter} from'react-router-dom'
function NavBar(props) {
  var title1="Cake"
  var title2="Shop"
  var url
  var text
  var handleSearchChange=(e)=>
  {
     text=e.target.value
      
  }
  var  onSubmitSearch=(e)=>{
    
    if(text && text.length)
    {
       var url="/search?q="+text
       document.getElementById("search").value=""
       props.history.push(url)
    }
    // else{
    //   var url="/search?q="
    //   //  alert(url)
    //   props.history.push(url)
    // }
     
  }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5" style={{boxShadow:"1px 1px 5px gray",boxShadow:"0 10px 10px -6px black"}}>
        <div className="container-fluid">
          <Link to="/"  className="navbar-brand"><a  id="projecttitle" ><h2><i class="fa fa-birthday-cake" style={{color:"orange",padding:"4px",fontStyle:"italic"}}></i>{title1}<span style={{color:"orange",fontStyle:"italic",fontWeight:"bold"}}>{title2}</span></h2></a></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end  " id="navbarSupportedContent">
         
            <div className="d-flex ">
              <input className="form-control me-1" id="search" onChange={handleSearchChange} type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-light" onClick={onSubmitSearch} type="submit"><i className="fa fa-search"></i></button>&nbsp;
            </div>
            {  props.loggedin && <Link to="/additem"><button className="btn btn-outline-light" type="button">Add Cake</button></Link>}
            {  (props.loggedin)
               ?
              (<form className="d-flex m-1">
              <button className="btn btn-danger" type="button" onClick={props.islogout} style={{marginRight:"5px"}}>Logout</button>
              <Link to="/orders"><button className="btn btn-light" type="button">MyOrders</button></Link>
              </form>)
              :
              (<form className="d-flex m-1">
              <Link to="/login"><button className="btn btn-light" type="button">Login</button></Link>
              </form>)
              
             
            }
            {props.loggedin && <Link to="/cart"><button className="btn btn-outline-light" type="button"><i className="fa fa-shopping-cart"></i> Cart</button></Link>}
          </div>
        </div>
      </nav>
    )
}
var TempNavbar=withRouter(NavBar)
export default connect(function(state){
  return {loggedin:state["isloggedin"]}
})(TempNavbar)

