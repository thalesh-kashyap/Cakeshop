import React from 'react'
import {withRouter} from 'react-router-dom'
function Cake(props) {
  var showCake=()=>{
    let url="showcake/"+props.item.cakeid
    props.history.push(url)
  }
  var err="./Noimagefound.jpg"
  return (
      <div className="card " onClick={showCake} style={{boxShadow: "1px 1px 5px rgba(40,40,240,0.3)" ,textAlign:"left",boxShadow:"0 10px 10px -6px black",borderRadius:"10px"}}>

          {props.item.image.includes("fakepath") && <img src={err} style={{ height: "7rem",width:"auto"}} className="card-img-top" alt="..." />}
          {!props.item.image.includes("fakepath") && <img src={props.item.image} style={{ height: "7rem",width:"auto"}} className="card-img-top" alt="..." />}
            <div className="card-body">
              <h6 className="card-title">{props.item.name}</h6>
              <h6>Rs. {props.item.price} </h6>
      
              {props.item.discount && <small style={{ color: "green", fontWeight: "bolder" }}>Discount :{props.item.discount}</small>}
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              <a href="#" className="btn btn-warning"><i class="fa fa-cart-plus" aria-hidden="true"></i> Buy</a>
            </div>
      </div>
  ) 
}

export default withRouter(Cake)
