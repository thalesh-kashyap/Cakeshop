import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import './slider.css'
function MyOrders() {
  var [alldata, setAlldata] = useState([]);
  var [isloded,setIsLoded]=useState(false)
  function sortbyDate(x)
  {
      if(alldata.length>0)
      {
        if(x)
        {
          let newData1=alldata.sort((a,b)=>new Date(b.orderdate)-new Date(a.orderdate))
          setAlldata([...newData1])
        }
        else{
          let newData1=alldata.sort((a,b)=>new Date(a.orderdate)-new Date(b.orderdate))
          setAlldata([...newData1])
        }
      }
      
  }
  function sortbyOrderid(x)
  {
      if(alldata.length>0)
      { 
        if(x)
        {
          let newData1=alldata.sort((a,b)=> a.orderid-b.orderid)
          setAlldata([...newData1]) 
        }
        else{
          let newData1=alldata.sort((a,b)=> b.orderid-a.orderid)
          setAlldata([...newData1]) 
        }
    }
  }
  useEffect(() => {
    axios({
      method: "post",
      // url: "https://apibyashu.herokuapp.com/api/cakeorders",
      // url:"http://68.183.80.25:8001/api/myorders/",
      url:"http://127.0.0.1:8000/api/myorders/",
      data: {
        email: localStorage.email,
      },
      headers: {
        Authorization : "Token "+localStorage.token
    },
    }).then(
      (response) => {
        if (response.data) {
          console.log(response.data);
          setAlldata(response.data.cakeorders);
          setIsLoded(true)
        }
      },
      (error) => {
        console.log("Failed to Load myorders", error);
      }
    );
  }, []);
  if (!localStorage.token) {
    return <Redirect to="/login" />;
  } else
  {
    if(isloded)
    {
      if (alldata && alldata.length > 0) 
      {

        return (
          <div className="row" >
            <div className="col-sm-9">
              {alldata.map((ord, index) => {
                var idd = `#${ord.name.slice(0,3)}${ord.id}`;
                var iddd = `${ord.name.slice(0,3)}${ord.id}`;
                return (
                  <div
                    key={index}
                    data-bs-toggle="collapse"
                    id="outer"
                    data-bs-target={idd}
                    className="container p-3"
                    style={{
                      textAlign: "left",
                      marginTop: "2%",
                      width: "90%",
                      borderRadius: "10px",
                      backgroundColor: "rgba(60,80,220,0.1)",
                      
                      boxShadow:"0 10px 10px -6px black"
                    }}
                  >
                    <div
                      className="row p-3 m-3 bg-dark text-light"
                      style={{ borderRadius: "10px",cursor:"pointer" }}
                    >
                      <div className="col-sm-5">
                        <b>OrderId : 1422342{ord.id}</b>
                      </div>
                      <div className="col-sm-6">
                        <b>Order Date : {ord.orderdate.slice(0, 10)}</b>
                          {console.log(idd)}
                      </div>
                      <div className="col-sm-1">
                        <i class="fa fa-angle-down"></i>
                      </div>
                    </div>
                    <div className="row collapse" id={iddd}>
                      <div className="col-sm-6">
                        <div className=" row justify-content-center m-2 p-3">
                          <div className="col-sm-12 m-3">
                            <b>Ordered by : {ord.name}</b>
                          </div>
                          <div className="col-sm-12 m-3">
                            <b>Address : {ord.address}</b>
                          </div>
                          <div className="col-sm-12 m-3">
                            <b>Contact : {ord.phone}</b>
                          </div>
                          <div className="col-sm-12 m-3">
                            <b>City : {ord.city}</b>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-4">
                        <div className="row justify-content-center">
                          <div className="col-sm-12">
                            <div className="row">
                              <div className="col-sm-12">
                                <center>
                                  <h4>Ordered Items ({ord.cakes.length})</h4>
                                </center>
                              </div>
                            </div>
                            {ord.cakes &&
                              ord.cakes.length > 0 &&
                              ord.cakes.map((cake1, index) => {
                                return (
                                  <div key={index} className="row m-2 border p-2">
                                    <div className="col-sm-2 text-right">
                                      <img
                                        src={cake1.image}
                                        alt="show me"
                                        style={{ height: "40px" }}
                                      />
                                    </div>
                                    <div className="col-sm-5 text-right">
                                      <h6> {cake1.name}</h6>
                                    </div>
                                    <div className="col-sm-5 text-right">
                                      <h6>&#x20B9; {cake1.price}</h6>
                                    </div>
                                    <br></br>
                                  </div>
                                );
                              })}
                            <div className="row m-2 border p-2">
                              <div className="col-sm-2 text-right"></div>
                              <div className="col-sm-5 text-right">
                                <h6>Totat Amount :</h6>
                              </div>
                              <div className="col-sm-5 text-right">
                                <h6>
                                  <b>&#x20B9; {ord.price} </b>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-sm-3 mt-4">
                <h4 className="bg-primary text-light p-2 m-2" style={{borderRadius:"4px"}}>Sort Orders by</h4>
                <ul class="list-group px-1 mx-1" >
                    <li class="list-group-item " onClick={()=>sortbyDate(false)}>Oldest orders</li>
                    <li class="list-group-item " onClick={()=>sortbyDate(true)}>Latest orders</li>
                </ul>
            </div>
          </div>
        )
      } else {
        return (
          !alldata.length>0 && (
            <div className="alert alert-warning">
              <h3>No orders made yet!!</h3>
            </div>
          )
        );
      }
    }
    else{
      return <h3>Loading Order Details...</h3>
    }
  } 
}

export default MyOrders;
