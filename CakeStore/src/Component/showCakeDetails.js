import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams, Link, withRouter } from 'react-router-dom'
import data from './cakedata'
import cakedata from './cakedata'
import Cart from './CartItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function ShowCakeDetails(props) {
    var { cakeid } = useParams()
    var [cake, setCake] = useState(data.cake)
    console.log("cake")
    console.log(">>>>>>>>>>> cake id from data.js file", data.cake.cakeid)
    if (data.cake.cakeid != cakeid) {
        // bring all the details of that cake from backend
        // var apiurl = "https://apibyashu.herokuapp.com/api/cake/" + cakeid
        // axios({
        //     url: apiurl,
        //     method: "get"
        // }).then((response) => {
        //     console.log("all the details of selected cake response", response)
        //     data.cake = response.data.data
        //     setCake(response.data.data)

        // }, (error) => {
        //     console.log(">>>>> error from cake details api", error)
        // })

        
        // var apiurl = "http://68.183.80.25:8001/api/cake/" + cakeid
        var apiurl = "http://127.0.0.1:8000/api/cakes/" + cakeid
        axios({
            url: apiurl,
            method: "get",
        }).then((response) => {
            console.log("all the details of selected cake response", response)
            data.cake = response.data.data
            setCake(response.data.data)

        }, (error) => {
            console.log(">>>>> error from cake details api", error)
        })

    }
    function addcaketocart() {
        if (!localStorage.token) {
            props.history.push("/login")
        }
        else {
            let cartcakedata = {
                cakeid: cake.cakeid,
                name: cake.name,
                price: cake.price,
                weight: cake.weight,
                image: cake.image,
                email: localStorage.email
            }
            axios({
                // url: "http://68.183.80.25:8001/api/addcaketocart/",
                url: "http://127.0.0.1:8000/api/addcaketocart/",
                method: "post",
                data: cartcakedata,
                headers: {
                    Authorization : "Token "+localStorage.token
                }
            }).then((response) => {
                toast.success("Item Added to Cart")
                console.log("Successs while adding into cart", response)
            }, error => {
                console.log("Error while adding into cart", error)
            })
        }
    }
    console.log("cake id", cakeid)
    return (
        <div className="container bg-light" style={{boxShadow:"0 10px 10px -9px black",borderRadius:"10px",border:"1px solid rgb(179, 178, 178)"}}>
            <div className="row">
                <div className="col-sm-3 p-3 m-3" style={{ padding: '10px'}}>
                    <img src={cake.image} style={{ height: '300px', width: '300px' ,borderRadius:"10px" }}></img>
                </div>

                <div className="col-sm-8" style={{ textAlign: "left" }}>
                    <div className="row" style={{ margin: "10px" }}>

                        <div className="col-sm-12">
                            <h3 style={{ margin: '10px', textAlign: 'center' }}>{cake.name}</h3>
                        </div>


                        <div className="col-6">
                            <form id="cakeform" >
                                <div className="form-group row">
                                    <div className="col-sm-12">

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <span className="col-sm-4"><b>Rating</b></span>
                                    <div className="col-sm-8">
                                        {cake.ratings}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <span className="col-sm-4"><b>Flavour</b></span>
                                    <div className="col-sm-8">
                                        {cake.flavour}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <span className="col-sm-4"><b>Eggless</b></span>
                                    <div className="col-sm-1">
                                        {cake.eggless ? <div>Yes</div>:<div >No</div>}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <span className="col-sm-4"><b>Weight</b></span>
                                    <div className="col-sm-8">
                                        {cake.weight}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <span className="col-sm-4"><b>Occassion</b></span>
                                    <div className="col-sm-8">
                                        {cake.type}
                                    </div>
                                </div>

                                <div className="form-group row">

                                    <span className="col-sm-4"><b>Ingredients</b></span>

                                    <ul className="col-sm-8 text-secondary" id="ingred" style={{ display: "inline" }}>
                                        {cake.ingredients}
                                    </ul>

                                </div>

                            </form>
                        </div>

                        <div className="col-6">
                            <div className="form-group row" style={{ marginTop: '55px' }}>
                                <div className="col-sm-10">
                                    <h2 style={{ color: "gray" }}>&#x20B9; {cake.price}</h2>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                </div>
                            </div>

                            <br></br>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                       <button type="submit" onClick={addcaketocart} className="btn btn-warning">Add to Cart</button>
                                </div>
                                <div className="col-sm-6">
                                    <Link to="/"> <button className="btn btn-success">Add More</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12 " style={{ textAlign: "left" }}>
                                <label for="Description" className=" col-form-label text-secondary"><b>{cake.description}</b></label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default withRouter(ShowCakeDetails)
