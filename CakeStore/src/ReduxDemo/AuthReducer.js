export var AuthReduce=function(state={
    isloggedin:localStorage.token && true
},action)
{
    switch(action.type)
    {
        case "LOGIN" :{
            state={...state}
            state["isloggedin"]= true   
            return state
        }
        default:return state
    }
}