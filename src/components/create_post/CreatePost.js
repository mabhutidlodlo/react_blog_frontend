import React, {Component,useState} from 'react';
import axios from "axios";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import FormData from 'form-data'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { render } from 'react-dom';
import $ from 'jquery';
import '../css/image_upload.css';
import { ToastContainer, toast } from 'react-toastify';
import {  toastOnError } from "../../utils/Utils";
import { MDBInput } from "mdbreact";
import {toats} from "react-toastify";

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  display: 'flex',
};

export default class CreatePost extends Component{
  constructor(props){

    super(props);
    this.state ={

      title:"",
      category:"",
      hint:"",
      pic:"",
      pic_name:'',
      img_path :"",
      errors:{
        title:"",
        category:"",
        hint:"",
        pic:"",
        content:""
      }
    }
  }

  componentDidMount() {

    //registers summernote 
    $('.summernote').summernote()
    //if im editing a article then i fetch data
    if(this.props.match.params.slug){
      this.getData();

    }

  }

  //gets and set the values of the article you want to edit
  getData = ()=>{
    const slug = this.props.match.params.slug 
    axios.get(`/blog/my_article/${slug}`,).
    then(response=>{
      this.setState({pic:response.data.pic});
      this.setState({pic_name:response.data.pic_name});
      this.setState({title:response.data.title});
      this.setState({category:response.data.category});
      this.setState({hint:response.data.hint});
      $('.summernote').summernote('code', response.data.content);
    }).
    catch(e=>{

      console.log(e.data);

    })
  }

  //reads inn the values you fill in
  onChange =(e)=>{
    
    const{name,value}= e.target
    this.setState({[name]:value})
  }
  //the image its a file is handled seperately
  handleImageChange = (e) => {
    
    this.setState({

      [e.target.name]: e.target.files[0],
      image_path:URL.createObjectURL(e.target.files[0]),
      pic_name:e.target.files[0].name,
    }
    )

  };

  validateForm = ()=>{
    let errors = this.state.errors;
    let valid = true
    if(this.state.title.length<=0){

      errors.title = 'title cannot be empty'
    }
    else{
      errors.title = "";
    }

    if(this.state.hint.length<=0){

      errors.hint = 'excerpt cannot be empty'
    }else{
      errors.hint = ""
    }


    if(this.state.pic_name.length <=0){

      errors.pic = 'select a valid thumbnail'
    }else{
      errors.pic_name = ""
    }

    if(this.state.category.length <=0  || this.state.category==="category"){

      errors.category = 'select a valid category'
    }
    else{
      errors.category = ""
    }

    if($('.summernote').summernote('code').length <=0 || $('.summernote').summernote('code') ==="article!"){

      errors.content = 'write a valid article'
    }
    else{
      errors.content = ""
      }
    this.setState(errors)
    Object.values(errors).forEach(
      
      val=> val.length > 0 && (valid = false)
    )
    return valid
  }

  //i created a form data to accomodate the image file
  onPostClick = ()=>{

    if (this.validateForm()){

      const slug = this.props.match.params.slug 
      let form_data = new FormData();
      form_data.append('pic', this.state.pic);
      form_data.append('title', this.state.title);
      form_data.append('category', this.state.category);
      form_data.append('pic_name', this.state.pic_name);
      form_data.append('hint', this.state.hint);
      form_data.append('content',$('.summernote').summernote('code') );
  
      slug ? 
      axios.put(`/blog/my_article/${slug}`,form_data, { headers: {
        'content-type': 'multipart/form-data'
      }}).
  
      then(response=>{
        toast.success(response)
        this.props.history.push('/dashboard')
  
      }).
      catch(error=>{
        toastOnError(error)
      })
      :
      axios.post("/blog/myPost",form_data, { headers: {
        'content-type': 'multipart/form-data'
      }}).
  
      then(response=>{
        toast.success(response)
        this.props.history.push('/dashboard')
      }).
      catch(errors=>{
        toastOnError(errors)
      })

    }
    else {
      toast.error("check if all the fields are filled!")
    }

  }


  setHeading = ()=>{

    return this.props.match.params.slug ? "Edit article:" : "Create article:"
  }
  render(){

  return (
    <div className="container ">
      
      <h3 className="mt-2">{this.setHeading()}</h3>
      <div>
      <MDBInput label="title"
        name="title"
        icon="pencil-alt"
        rows = '2'
        max_length = "100"
        onChange ={this.onChange}
        value = {this.state.title}
      />
      {this.state.errors.title >0 && 
        <span className>{this.state.error.title}</span>
        }    
    </div>

    <MDBInput label="excerpt"
        name = "hint"
        icon="pencil-alt"
        rows = '2'
        max_length = "100"
        value = {this.state.hint}
        onChange={this.onChange}
      />
      {this.state.errors.hint >0 && 
        <span className = "error">{this.state.error.hint}</span>
      }

      <div className="mb-2 mt-2">

        <select name="category" onChange={this.onChange}>

          <option>category</option>
          <option>culture</option>
          <option>food</option>
          <option>health</option>
          <option>media</option>
          <option>opinion</option>
          <option>programing</option>
          <option>sport</option>
          <option>world</option>

        </select>
        {this.state.errors.category >0 && 
        <span className="error">{this.state.errors.category}</span>
        }
      </div>

      <div class="summernote">article!</div>
      {this.state.errors.content >0 && 
        <span className="error">{this.state.errors.content}</span>
        }

      <div style={styles} className = "mt-2">
        <label className="custom-file-upload">
          <input name="pic" type="file" onChange={this.handleImageChange} />
          <i class="fas fa-upload"/>Thumbnail*
        </label>
        <div className="file-preview" >{this.state.pic_name}</div>
        {this.state.errors.pic >0 && 
        <span className= "error">{this.state.errors.pic}</span>
        }
      </div>

      <div className= "d-flex justify-content-center">
      <button type ="button" className = "btn1  pd-2" 
       onClick={this.onPostClick}
      >
        create
      </button>
      </div>
    </div>
  )}  
}