import React from 'react'
import {Link} from 'react-router-dom'
function OrderPlaced() {
    return (
        <div className="alert alert-success">
            <h2>Order Placed successfully</h2>
            <br></br><br></br>
            <Link to="/"><button className="btn btn-warning">Continue Shopping</button></Link>
        </div>
    )
}

export default OrderPlaced
