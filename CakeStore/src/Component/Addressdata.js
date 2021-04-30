import React from 'react'
import { useState, useEffect } from 'react'
import queryParser from 'query-string'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure();
function Addressdata(props) {
    // var query = queryParser.parse(props.location.search)
    var [error, setError] = useState([])
    var [userdata, setUserData] = useState([])
    function placeOrder(e) {
        e.preventDefault()
        var tempitem = {}
        var form1 = document.getElementById("form")
        tempitem["name"] = form1["elements"]["namefield"].value
        tempitem["phone"] = form1["elements"]["mobilefield"].value
        tempitem["address"] = form1["elements"]["addressfirld"].value
        tempitem["pincode"] = form1["elements"]["pincodefield"].value
        tempitem["city"] = form1["elements"]["cityfield"].value
        tempitem["email"] = localStorage.email
        tempitem["cakes"]=props.location.state.cake
        tempitem["price"]=props.location.state.totalamt
        var flag = 0
        if (!tempitem["name"]) {
            errors["fname"] = "Name Required!!"
            flag = 1
        }
        if (!tempitem["phone"]) {
            errors["mobile"] = "Mobile Number Required!!"
            flag = 1
        }
        if (!tempitem["pincode"]) {
            errors["pin"] = "Pin code Required!!"
            flag = 1
        }
        if (!tempitem["address"]) {
            errors["address"] = "Address Required!!"
            flag = 1
        }
        if (!tempitem["city"]) {
            errors["city"] = "City Required!!"
            flag = 1
        }
        if (flag == 1) {
            setError(errors)
            console.log(errors)

            toast.error("Errors in Information")
        }
        else {
            setError([])
            console.log("...............tempitem in Checkout",tempitem)
                axios({
                    method: "post",
                    // url: "https://apibyashu.herokuapp.com/api/addcakeorder",
                    // url:"http://68.183.80.25:8001/api/placeorder/",
                    url:"http://127.0.0.1:8000/api/placeorder/",
                    data:tempitem,
                    headers: {
                        Authorization : "Token "+localStorage.token
                    }
                }).then((response) => {
                    if(response.data.error)
                    {
                       toast.error(response.data.error) 
                    }
                    else{
                        console.log("................>>>>>>>>>",userdata)
                        console.log("order placed successfully", response)
                        toast.success("Order placed..")
                        props.history.push("/orders")
                    }
                 
                }, (error) => {
                    toast.error("Something went wrong!!")
                    console.log("Failed to place order", error)
                })
           
          
        }

    }
    var errors = {}
    var cake=props.location.state.cake
    // console.log(cake)
    return (
        <div className="container p-3" style={{boxShadow:"0 10px 10px -5px black", textAlign: "left", marginTop: "5%", width: "70%", borderRadius: '10px', backgroundColor: "rgba(60,80,220,0.1)",border:"1px solid rgb(179, 178, 178)"}}>

            <div class="row">
                <div class="col-sm-6">
                    <div className="row justify-content-center">
                        <div className="col-sm-12">

                            <form id="form">
                                <h3>Address Information</h3><br></br>

                                <div class="form-group">
                                    <span style={{ color: "red" }}>{error && error["fname"]}</span>
                                    <input type="text" name="namefield" class="form-control" id="" placeholder="Enter Name.." /><br></br>

                                </div>

                                <div class="form-group">
                                    <span style={{ color: "red" }}>{error && error["mobile"]}</span>
                                    <input type="text" name="mobilefield" class="form-control" id="" placeholder="Enter Mobile Number.." /><br></br>

                                </div>

                                <div class="form-group">
                                    <span style={{ color: "red" }}>{error && error["address"]}</span>
                                    <textarea name="addressfirld" class="form-control" placeholder="Enter Your Address.." rows="3"></textarea>
                                    <br></br>

                                    <div class="form-group">
                                        <span style={{ color: "red" }}>{error && error["pin"]}</span>
                                        <input type="text" name="pincodefield" class="form-control" id="" placeholder="Enter Pincode.." /><br></br>
                                    </div>

                                    <div class="form-group">
                                        <span style={{ color: "red" }}>{error && error["city"]}</span>
                                        <input type="text" name="cityfield" class="form-control" id="" placeholder="Enter city.." /><br></br>
                                    </div>

                                </div>
                                <div class="form-group " style={{ textAlign: "left" }}>
                                    <button type="submit" class="btn btn-primary" onClick={placeOrder}>Order place</button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div className="row justify-content-center">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <center><h4>All Items ({props.location.state.count})</h4></center>
                                </div>
                            </div>
                         {
                                cake && cake.map(cake1=>{
                                    return(
                                        <div className="row m-2 border p-2">
                                        <div className="col-sm-2 text-right">
                                            <img src={cake1.image} alt="show me" style={{ height: "40px" }} />
                                        </div>
                                        <div className="col-sm-5 text-right">
                                            <h6> {cake1.name}</h6>
                                        </div>
                                        <div className="col-sm-5 text-right">  
                                            <h6>&#x20B9; {cake1.price}</h6>
                                        </div>
                                        <br></br>
                                    </div>
                                    )
                                })
                            }
                             <div className="row m-2 border p-2">
                                        <div className="col-sm-2 text-right">
                                            
                                        </div>
                                        <div className="col-sm-5 text-right">
                                            <h6>Totat Amount :</h6>
                                        </div>
                                        <div className="col-sm-5 text-right">  
                                            <h6><b>&#x20B9; {props.location.state.totalamt} </b></h6>
                                        </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addressdata
