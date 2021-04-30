import React from 'react'

import {withRouter} from 'react-router-dom'
function SearchItem(props) {
    function gotoDescription()
    {
        let url="showcake/"+props.item.cakeid
        props.history.push(url)
    }
    return (
            <div class="row m-5 border p-3"  onClick={gotoDescription} style={{textAlign:"left",boxShadow:"0 10px 10px -6px black",borderRadius:"10px"}}>
                <div class="col-sm-3 ">
                    <img src={props.item.image} style={{width:"250px",height:"250px",borderRadius:"5px",border:"1px solid rgb(179, 178, 178)"}}/>
                </div>
                <div class="col-sm-6">
                    <h3>{props.item.name}</h3>
                   
                    <h6>{props.item.description}</h6>
                    {props.item.ratings && <div><b>Ratings</b>  {props.item.ratings}</div>}
                    {<div><b>Eggless</b>  {props.item.eggless ? <span>Yes</span> :<span>No</span>}</div>}
                    {props.item.flavour && <div><b>Flavour</b>  {props.item.flavour}</div>}
                    {props.item.type && <div><b>Cake Type</b>  {props.item.type}</div>}
                    {props.item.ingredients  && <div><b>Ingredients</b>  {props.item.ingredients}</div>}
                    {props.item.discount && <small>{props.item.discount}</small>}<br></br>
                  
                </div>
                <div className="col-sm-3 text-center">
                    <h5>{props.item.price}</h5>
                    <button className="btn btn-warning">Show Details</button>
                </div>
            </div>
    )
}

export default withRouter(SearchItem)
