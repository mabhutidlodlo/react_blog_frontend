import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios"
import { connect } from "react-redux";
import { withRouter ,Link} from "react-router-dom";
import ListCategories from "../listCategories/ListCategories"
import ListArticle from "../listArticles/ListArticle";

const Category = (props)=>{
  const [articles, setArticles] = useState([])
  useEffect(()=>{
    const category = props.match.params.id
    const getArticles = async()=>{
      const response = await axios.get(`/blog/category/${category}`,)
      setArticles(response.data)
    };
    getArticles()
  },[props.match.params.id]);

  return(
    <div className = 'container'>
      <ListCategories/>
       <div className = "m-3 text-muted mb-2">Category/{props.match.params.id}</div>
      <ListArticle cat = "cat" articles ={articles}/>
    </div>
  )
};
export default Category
