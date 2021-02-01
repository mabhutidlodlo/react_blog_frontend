import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./components/home/HomePage";
import CreatePost from "./components/create_post/CreatePost";
import Category from "./components/category/Category";
import FullArticle from "./components/articleview/FullArticle";
import Profile from "./components/profileView/Profile";
import EditProfile from  "./components/editProfile/EditProfile";
import requireAuth from "./utils/RequireAuth";
import Layout from "./hocs/Layout"
import Root from "./Root"; 
import { ToastContainer } from "react-toastify";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
axios.defaults.baseURL = "https://iivent.herokuapp.com";


class App extends Component {
  onLogout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div>
        <Root>
          <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="" component={Login} />
          <Layout>
             <Switch>
              <Route path="/create_post/:slug?" component={CreatePost} />
              <Route path="/home" component={HomePage} />
              <Route path="/edit_profile" component={EditProfile} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path='/category/:id' component={Category}/>
              <Route path='/article/:slug' 
              component={requireAuth(FullArticle)}/>
              <Route path='/profile/:id' component={Profile}/>
              <Route path="*">Ups</Route>
          </Switch>
          </Layout>
          </Switch>
        </Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
      </div>
    );
  }
}

export default App;