import React from 'react'
import CartSearchItem from './CartSearchItem';
import { useState, useEffect } from 'react'
import axios from 'axios'
import queryParser from "query-string"
// var cakedata=[...data];
function SearchList(props) {
    var query = queryParser.parse(props.location.search)
    console.log("query",query)
    var [cakedata, setCakeData] = useState([])
    var [isloded,setIsLoded]=useState(false)
    useEffect(() => {
        axios({
            method: "get",
            // url: `https://apibyashu.herokuapp.com/api/searchcakes?q=` + query.q
            url:"http://68.183.80.25:8014/api/searchcakes/"+query.q
            // url:"http://127.0.0.1:8000/api/searchcakes/"+query.q
        }).then((response) => {
            console.log("sucesssssss from searchcakes", response.data)
            if (response.data) {
                setCakeData(response.data.data)
                setIsLoded(true)
            }
        }, (error) => {
            console.log("Failed from all  searchcakes", error)
        })
    }, [query.q])
    if(isloded)
    {
        if (cakedata && cakedata.length > 0) 
        {
            return(
                <div className="container ">
                     <h2>Cake Found</h2>
                     {cakedata && cakedata.length > 0 && cakedata.map(cake => {
                    return (
                        <CartSearchItem item={cake} location1={"search"} />
                    )
                })}
                </div>
            )
        }
        else {
            return (
                <div className="alert alert-warning"><h2>Oops Cake not Found!!!</h2></div>
            )
        }
    
    }
    else{
        return <h3>Loading Items...</h3>
    }
    
}

export default SearchList
