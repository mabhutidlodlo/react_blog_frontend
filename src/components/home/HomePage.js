
import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios"
import { connect } from "react-redux";
import { withRouter ,Link} from "react-router-dom";
import {login} from "../login/LoginActions"
import { Container, Navbar, Nav } from "react-bootstrap";
import ListArticle from "../listArticles/ListArticle";
import ListCategories from "../listCategories/ListCategories"
import '../css/subscribed.css'

class HomePage extends Component {

  constructor (props){
    super(props);
    this.state = {
      articles :[],

    }

  }
  componentDidMount(){
    this.fetchData();
  };

  fetchData = ()=>{
    axios.get('/blog/',)
    .then(response=>{
     this.setState({articles:response.data})
    })
  }

  handleClick= ()=>{
    this.props.history.push('/subscribed')
  }
render() {
  const secondColumnStart = Math.floor(this.state.articles.length / 2);
  return(
    <Container className="shadow">
      <ListCategories></ListCategories>
        <div className="m-3 d-flex ">
          <h3 className="recent_articles ml-2">Recent</h3>
          <button className="ml-5" type = 'button' id="subscribed_button" onClick ={this.handleClick}>Subscribed</button>
        </div>
      <ListArticle  articles ={this.state.articles}/>
    </Container>
  );}
}
export default HomePage
