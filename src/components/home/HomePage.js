
import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios"
import { connect } from "react-redux";
import { withRouter ,Link} from "react-router-dom";
import {login} from "../login/LoginActions"
import { Container, Navbar, Nav } from "react-bootstrap";
import ListArticle from "../listArticles/ListArticle";
import ListCategories from "../listCategories/ListCategories"

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

render() {
  const secondColumnStart = Math.floor(this.state.articles.length / 2);
  return(
    <Container >
      <ListCategories></ListCategories>
      <div className="d-flex">
      <h3 className = "ml-5">Recent posts:</h3>
      </div>
      <ListArticle articles ={this.state.articles}/>
    </Container>
  );}
}
export default HomePage

