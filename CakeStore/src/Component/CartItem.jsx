import axios from 'axios'
import React from 'react'
import {withRouter} from 'react-router-dom'
function Cart(props) {
    function handleCakeId()
    {
        props.removeCartItem(props.mykey,props.item.cakeid)
    }
    
    return (
       <div className="row">
           <div className="col-sm-1">
               <img src={props.item.image} alt="show me" style={{height:"30px"}}/>
           </div>
           <div className="col-sm-2">
               {console.log(props.mykey)}
               <h6> {props.item.name}</h6>
           </div>
           <div className="col-sm-2">
               <h6>{props.item.price}</h6>
           </div>
           <div className="col-sm-7 ml-5">
               <button className="btn btn-warning" onClick={handleCakeId}><i className="fa fa-trash"></i>  Remove</button>
           </div>
       </div>
    )
}

export default withRouter(Cart)
