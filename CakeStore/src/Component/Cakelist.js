import React, { PureComponent } from 'react'
import { useEffect} from 'react';
import Cake from './Cake'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {useState} from 'react'
import Slider from './Slider'
import data from './cakedata'

function Cakelist() {
    var [cake,setCake]=useState([...data.cakes])
    function filterprice(price)
    {
        if(price=="500-")
        {
            let tempitems=data.cakes.filter(obj=>obj.price<=500)
            setCake([...tempitems])
        }
        else if(price=="500+"){
            let tempitems=data.cakes.filter(obj=>obj.price>500)
            setCake([...tempitems])
        }
        else if(price=="1000-"){
            let tempitems=data.cakes.filter(obj=>obj.price<=1000)
            setCake([...tempitems])
        }
        else{
            let tempitems=data.cakes.filter(obj=>obj.price>1000)
            setCake([...tempitems])
        }
    }
    function sortCakes(order)
    {
        if(order=="asc")
        {
            let tempitems=data.cakes.sort((a,b)=>a.price-b.price)
            setCake([...tempitems])
        }
        else        {
            let tempitems=data.cakes.sort((a,b)=>b.price-a.price)
            setCake([...tempitems])
        }
    }
    //here useEffect is working like componentdidMount since second paramerter to it is []
    useEffect(() => {
        if(!cake.length>0)
        {
            axios({
                method: "get",
                // url: "https://apibyashu.herokuapp.com/api/allcakes"
               url: "http://127.0.0.1:8000/api/allcakes/",
                // url:"http://68.183.80.25:8001/api/allcakes/",
                // headers: {
                //     Authorization : "Bearer "+localStorage.token
                // }
            }).then((response) => {
                console.log("sucesssssss from allcakes", response)
                if (response.data) {
                   setCake(response.data)
                   data.cakes=[...response.data]
                   console.log("data.cakes>>>>>",data.cakes)
                }
            }, (error) => {
                console.log("Failed from all cakes", error)
            }) 
        }
    }, []);
      
        return (
            <>
                <Slider/>
                <div className="container-flex m-3">
                    <div className="row">
                        <div className="col-sm-10 mt-3">
                            <div className="row">
                                    {cake && cake.map((cake) => {
                                        return (
                                        <div className="col-sm-2 mt-3">
                                                <Cake item={cake} key={cake.cakeid}/>
                                            </div>
                                        )
                                    })}
                                </div>
                        </div>
                        <div className="col-sm-2">
                            <h4 className="bg-primary text-light mt-4 p-3" style={{borderRadius:"4px"}}>Filter</h4>
                            <ul class="list-group px-1 mx-1" >
                                <li class="list-group-item " onClick={()=>filterprice("500-")}> <b>Cakes below &#8377;500</b></li>
                                <li class="list-group-item " onClick={()=>filterprice("1000-")}><b>Cakes below &#8377;1000</b></li>
                                <li class="list-group-item " onClick={()=>filterprice("500+")}> <b>Cakes above &#8377;500</b></li>
                                <li class="list-group-item " onClick={()=>filterprice("1000+")}> <b>Cakes above &#8377;1000</b></li>
                            </ul>
                            <br></br>
                            <h4 className="bg-primary text-light mt-4 p-3" style={{borderRadius:"4px"}}>Sort</h4>
                            <ul class="list-group px-1 mx-1" >
                                <li class="list-group-item "  onClick={()=>sortCakes("asc")}> <b>&#8377; price low-high</b></li>
                                <li class="list-group-item " onClick={()=>sortCakes("desc")}><b>&#8377; price high-low</b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )  
}

export default withRouter(Cakelist)
