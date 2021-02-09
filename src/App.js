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
import SubscribedArticles from "./components/listArticles/SubscribedArticles"
import requireAuth from "./utils/RequireAuth";
import Layout from "./hocs/Layout"
import Root from "./Root";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
axios.defaults.baseURL = "https://iivent.herokuapp.com/";


class App extends Component {
  onLogout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div>

      <BrowserRouter>
        <Root >
          <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />

          <Layout>
            <Switch>
             <Route path="/dashboard" component={requireAuth(Dashboard)} />
              <Route path="/create_post/:slug?" component={requireAuth(CreatePost)} />
              <Route path="/home" component={HomePage} />
              <Route path="/edit_profile" component={requireAuth(EditProfile)} />
              <Route path='/category/:id' component={Category}/>
              <Route path='/subscribed' component={requireAuth(SubscribedArticles)}/>
              <Route path='/article/:slug'
              component={requireAuth(FullArticle)}/>
              <Route path='/profile/:id' component={requireAuth(Profile)}/>
              <Route path="*">Ups</Route>
              </Switch>
          </Layout>
          </Switch>
        </Root>
        </BrowserRouter>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
      </div>
    );
  }
}

export default App;
