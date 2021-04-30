//cakecart
import React, { useEffect ,useState} from 'react';
import CartItem from './CartItem';
import CartSearchItem from './CartSearchItem';
import axios from 'axios'
import cakedata from './cakedata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect,Link } from 'react-router-dom';
toast.configure();

// function CartSearchItem(props){
// return <div>
//     Hi Item {props.key}
// </div>
// }

function CartList(props) {
    var cartTotal=0
    var countItem=0
    var [isloded,setIsLoded]=useState(false)
    function orderDetails()
    {   console.log("before push item",[...data1])
       // let url="address/?q="+JSON.stringify(data1)+"&pricee="+cartTotal+"&items="+countItem
       let url="address/"
       var tempdata={
           cake:data1,
           totalamt:cartTotal,
           count:countItem
       }
        props.history.push(url,tempdata)
        
    }
    function removeCartItem(index,cakeidd)
    {
            
            axios({
                method: "post",
                // url: "http://68.183.80.25:8001/api/removefromcart/",
                url: "http://127.0.0.1:8000/api/removefromcart/",
                data:{
                    cakeid:cakeidd,
                    email:localStorage.email
                },
                headers: {
                    Authorization : "Token "+localStorage.token
                }
            }).then((response) => {
                console.log("Item removed from cart Succefully",response)
                toast.success("Item Successfully Removed")
                data1.splice(index,1)
                setdata([...data1])
                console.log(data1)  
            }, (error) => {
                console.log("Failed to remove Item from cart", error)
            })                      
    }
    var [data1,setdata]=useState([])
    //here useEffect is working like componentdidMount since second paramerter to it is []
       useEffect(()=>{
        axios({
            method: "post",
            // url: "http://68.183.80.25:8001/api/cart/",
            url: "http://127.0.0.1:8000/api/cart/",
            data:{
                "email":localStorage.email
            },
            headers: {
                    Authorization : "Token "+localStorage.token
            }
        }).then((response) => {
            console.log("sucesssssss from showcart", response.data)
            if (response.data) {
               setdata(response.data.data)
               setIsLoded(true)
            }
        }, (error) => {
            console.log("Failed from showcart", error)
        }) 
       },[])
      
    if(!localStorage.token)
    {
        return <Redirect to="/"/>
    }
    else{
       if(isloded)
       {
        return (
            <div className="container-fluid ">
                <div class="row mb-3">
                    <div class="col-sm-12" style={{textAlign:"center"}}>
                        <h3 className="alert alert-success"><i className="fa fa-shopping-cart"></i> Your Cart</h3>
                    </div>
                </div>
    
                { data1 && data1.length>0 && <div class="row">
    
                    <div class="col-sm-8">
                        {data1.map((ob, i) => {
                            console.log("each loop" , ob,i)
                            return (
                                <div style={{ margin: "10px", padding: "8px", border: "1px solid rgba(0,0,0,0.2)", borderRadius: "4px",backgroundColor:"rgba(0,0,0,0.1)" }}>
                                    <div style={{display:"none"}}>{cartTotal+=ob.price}{countItem+=1}</div>
                                     
                                    <CartSearchItem  item={ob} location1="cart" key1={i} removeCartItem={removeCartItem} />
                                </div>
                            )
                        })}
    
    
                    </div>
                    <div class="col-sm-4 left" >
    
                        <div class="row border p-2 m-3" style={{backgroundColor:"rgba(0,0,0,0.1)",border:"1px solid black",borderRadius:"4px"}}>
                            <div class="col-sm ">
                                <h6><u>Total Items</u></h6>
                                <h6>{countItem}</h6>
                            </div>
                            <div class="col-sm">
                                <h6><u>Total Price</u></h6>
                                <h6>Rs {cartTotal}</h6>
                            </div>
                        </div>
    
                    </div>
                </div>
                }
               { data1 && data1.length>0 &&  <div class="row">
                    <div className="col-sm-10">
    
                    </div>
                    <div class="col-sm-2">
                      
                        <button className="btn btn-success " onClick={orderDetails}>Checkout</button>
                    </div>
                </div>
                
                }
                { data1 && data1.length==0 && <div><img src="./EmptyCartImg.png" style={{width:"30%"}}/><br></br>
                <Link to="/"><button className="btn btn-success m-5">Continue Shopping</button></Link></div> }
    
            </div>
    
    
        )
       }
       else{
           return <h3>Loading Cart...</h3>
       }
    }
   
}

export default CartList
