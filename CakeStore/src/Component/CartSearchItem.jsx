import React from 'react'
import SearchItem from './SearchItem'
import CartItem from './CartItem'

function CartSearchItem(props) {

   if(props.location1=="cart")
   {
       return(
             <CartItem item={props.item} mykey={props.key1}  removeCartItem={props.removeCartItem} />
       )
   }
   else if(props.location1=="search")
   {
       return(
           <SearchItem item={props.item}/>
       )
   }
}

export default CartSearchItem;
