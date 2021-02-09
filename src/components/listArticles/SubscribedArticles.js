import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink, Link} from "react-router-dom";
import { toastOnError } from '../../utils/Utils';
import axios from 'axios';
import ListArticle from "../listArticles/ListArticle";
import ListCategories from "../listCategories/ListCategories";

export default function SubscribedArticles(props){

  const [articles,setArticles] = useState([])

  const notifications = props.match.params.notifications

  useEffect(()=>{

    const getData = ()=>{

      axios.get('/blog/subscribedArticles')
      .then(response=>{
        setArticles(response.data);
      })
      .catch(e=>{
        toastOnError(e)
      })
    }
    getData()
  },
  [notifications]

  )
  const handleClick=(e)=>{

    props.history.push('/home')
  }

  return (

    <div className="container shadow pb-2">
      <ListCategories></ListCategories>
      <div className="m-3 d-flex">
          <button className="ml-2" id = "recent_button" type = 'button' onClick ={handleClick}>Recent</button>
          <h3 className = "recent_articles ml-5">subscribed</h3>
      </div>
      <ListArticle cat='cat' articles ={articles}></ListArticle>
    </div>

  );
}
