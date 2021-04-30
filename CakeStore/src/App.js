import logo from './logo.svg';
import './App.css';
import Hello from './Component/Hello';
import Error from './Component/Error'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './Component/NavBar';
import ShowCakeDetails from './Component/showCakeDetails';
import Login from './Component/login';
import Footer from './Component/Footer';
import Signup from './Component/Signup';
import Additem from './Component/Additem'
import Forgetpass from './Component/Forgetpass';
import SearchList  from './Component/SearchList';
import CartList  from './Component/CartList';
import React, { PureComponent } from 'react'
import Addressdata from './Component/Addressdata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderPlaced from './Component/OrderPlaced';
import MyOrders from './Component/MyOrders';
import axios from "axios";

toast.configure();
class App extends PureComponent {
  constructor(props) {
    super(props)
    if (localStorage.token) {
      this.state = {
        isloggedin: true
      }
    }
    else {
        this.state = {
          isloggedin: false
        }
    }
  }
  login_done = () => {
    this.setState({
      isloggedin: true
    })

  }
  logout_done = () => {
    axios({
      method: "get",
      url:"http://68.183.80.25:8014/api/logout/",
      // url:"http://127.0.0.1:8000/api/logout/",
      headers: {
        Authorization : "Token "+localStorage.token
    },
    }).then(
      (response) => {
        console.log("Logout successfull....")
        localStorage.clear()
        this.setState({
          isloggedin: false
        },()=>{window.location.href="/"})
      },
      (error) => {
        console.log("Failed to Logout!!!!!", error);
      }
    );

  }


  render() {
    return (
      <div className="App">
        <Router>
          <NavBar   loggedin={this.state.isloggedin} islogout={this.logout_done}/>
          <Switch>
            <Route exact path="/" component={Hello} />
            <Route exact path="/login"><Login inform_login={this.login_done} loggedin={this.state.isloggedin}></Login></Route>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgetpass" component={Forgetpass}/>
            <Route exact path="/additem" component={Additem}></Route>
            <Route exact path="/showcake/:cakeid"><ShowCakeDetails loggedin={this.state.isloggedin}></ShowCakeDetails></Route>
            <Route exact path="/search" component={SearchList} />
            <Route exact path="/cart" component={CartList} />
            <Route exact path="/orders" component={MyOrders} />
            <Route exact path="/orderplaced" component={OrderPlaced} />
            <Route exact path="/address" component={Addressdata}></Route>
            <Route path="/*" component={Error} />
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default App

